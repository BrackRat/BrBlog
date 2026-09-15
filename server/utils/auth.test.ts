// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import jwt from 'jsonwebtoken';
import { verifyToken } from './auth';

const secret = 'maintenance-test-secret-only';
const payload = { username: 'admin', role: 'admin' };
const bearer = (claims = payload, key = secret, options: jwt.SignOptions = {}) =>
    `Bearer ${jwt.sign(claims, key, { expiresIn: '1h', ...options })}`;

beforeEach(() => {
    vi.stubEnv('JWT_SECRET', secret);
    vi.stubEnv('ADMIN_USERNAME', 'admin');
});
afterEach(() => vi.unstubAllEnvs());

describe('administrator token verification', () => {
    it('accepts a real signed administrator token', () => expect(verifyToken(bearer())).toBe(true));
    it.each([undefined, null, '', 'invalid', 'Bearer ', 'Bearer invalid'])('rejects malformed token %s', header => {
        expect(verifyToken(header)).toBe(false);
    });
    it('rejects forged and expired tokens and other algorithms', () => {
        expect(verifyToken(bearer(payload, 'forged'))).toBe(false);
        expect(verifyToken(bearer(payload, secret, { expiresIn: -1 }))).toBe(false);
        expect(verifyToken(bearer(payload, secret, { algorithm: 'HS384' }))).toBe(false);
    });
    it('requires the configured administrator, admin role, and expiry', () => {
        expect(verifyToken(bearer({ username: 'other', role: 'admin' }))).toBe(false);
        expect(verifyToken(bearer({ username: 'admin', role: 'reader' }))).toBe(false);
        expect(verifyToken(`Bearer ${jwt.sign(payload, secret)}`)).toBe(false);
    });
    it.each(['', '   ', undefined])('fails closed without a configured secret (%s)', value => {
        vi.stubEnv('JWT_SECRET', value);
        expect(verifyToken(bearer())).toBe(false);
        expect(verifyToken(bearer(payload, 'fallback-secret-for-dev'))).toBe(false);
    });
    it('fails closed without a configured administrator', () => {
        vi.stubEnv('ADMIN_USERNAME', '');
        expect(verifyToken(bearer())).toBe(false);
    });
});
