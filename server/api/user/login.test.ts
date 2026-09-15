// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { readBody, type H3Event } from 'h3';
import loginHandler from './login.post';

vi.mock('h3', async importOriginal => ({
    ...await importOriginal<typeof import('h3')>(),
    readBody: vi.fn(),
}));

beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('ADMIN_USERNAME', 'admin');
    vi.stubEnv('ADMIN_HASHED_PASSWORD', crypto.createHash('sha256').update('password').digest('hex'));
    vi.stubEnv('JWT_SECRET', 'test-secret');
});
afterEach(() => vi.unstubAllEnvs());

const login = async (body: unknown) => {
    vi.mocked(readBody).mockResolvedValue(body);
    return loginHandler({} as H3Event);
};

describe('Login API', () => {
    it.each([null, undefined, {}, [], 'text', { username: 'admin', password: 42 },
        { username: {}, password: 'password' }, { username: 'admin', password: '' }])('rejects invalid input %j', async body => {
        expect((await login(body)).code).toBe(400);
    });
    it('rejects incorrect credentials', async () => {
        expect((await login({ username: 'admin', password: 'wrong' })).code).toBe(401);
    });
    it.each(['JWT_SECRET', 'ADMIN_USERNAME', 'ADMIN_HASHED_PASSWORD'])('does not issue a token without %s', async key => {
        vi.stubEnv(key, '');
        const result = await login({ username: 'admin', password: 'password' });
        expect(result.code).toBe(503);
        expect(result).not.toHaveProperty('token');
    });
    it('issues an HS256 admin token with a one-hour expiry', async () => {
        const result = await login({ username: 'admin', password: 'password' });
        expect(result.code).toBe(200);
        const payload = jwt.verify(result.token!, 'test-secret', { algorithms: ['HS256'] }) as jwt.JwtPayload;
        expect(payload).toMatchObject({ username: 'admin', role: 'admin' });
        expect(payload.exp! - payload.iat!).toBe(3600);
    });
});
