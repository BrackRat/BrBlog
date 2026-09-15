// @vitest-environment node
import { afterAll, beforeAll, afterEach, beforeEach, expect, it, vi } from 'vitest';
import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { createApp, createRouter, toNodeListener } from 'h3';
import jwt from 'jsonwebtoken';
import createArticle from './article/create.post';
import changeArticle from './article/change.post';
import deleteArticle from './article/delete.post';
import createFriend from './friend/create.post';
import changeFriend from './friend/change.post';
import deleteFriend from './friend/delete.post';
import articles from './article/get';
import article from './article/[shortTitle]';
import friends from './friend/get';
import * as articleDB from '../db/article';
import * as friendDB from '../db/friend';

vi.mock('../db/article', () => ({
    createArticle: vi.fn(() => ({ id: 1 })), changeArticle: vi.fn(() => ({ id: 1 })),
    deleteArticle: vi.fn(() => ({ id: 1 })), getArticle: vi.fn(() => []),
    getCount: vi.fn(() => 0), getArticleWithContent: vi.fn(() => ({ title: 'article' })),
}));
vi.mock('../db/friend', () => ({
    addFriend: vi.fn(() => ({ id: 1 })), changeFriend: vi.fn(() => ({ id: 1 })),
    deleteFriend: vi.fn(() => ({ id: 1 })), getFriends: vi.fn(() => []),
}));

const writes = [
    ['/api/article/create', createArticle], ['/api/article/change', changeArticle],
    ['/api/article/delete', deleteArticle], ['/api/friend/create', createFriend],
    ['/api/friend/change', changeFriend], ['/api/friend/delete', deleteFriend],
] as const;
const app = createApp();
const router = createRouter();
for (const [path, handler] of writes) router.post(path, handler);
router.get('/api/article/get', articles);
router.get('/api/article/:shortTitle', article);
router.get('/api/friend/get', friends);
app.use(router);
const server = createServer(toNodeListener(app));
let base: string;
let token: string;

beforeAll(async () => {
    await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
    base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});
afterAll(() => new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())));
beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('JWT_SECRET', 'route-test-secret');
    vi.stubEnv('ADMIN_USERNAME', 'admin');
    token = jwt.sign({ username: 'admin', role: 'admin' }, 'route-test-secret', { expiresIn: '1h' });
});
afterEach(() => vi.unstubAllEnvs());

it.each(writes)('protects %s, including query strings and trailing slashes', async path => {
    for (const suffix of ['', '?bypass=1', '/', '/?bypass=1']) {
        const response = await fetch(base + path + suffix, {
            method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: 1 }),
        });
        expect((await response.json()).code).toBe(401);
    }
    for (const fn of [...Object.values(articleDB), ...Object.values(friendDB)]) expect(fn).not.toHaveBeenCalled();
    const response = await fetch(base + path, {
        method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: 1 }),
    });
    expect((await response.json()).code).toBe(200);
});

it.each(['/api/article/get?getall=true&page=1', '/api/article/draft?getAll=true', '/api/friend/get?getAll=true'])(
    'protects hidden content at %s', async path => {
        expect((await (await fetch(base + path)).json()).code).toBe(401);
        for (const fn of [...Object.values(articleDB), ...Object.values(friendDB)]) expect(fn).not.toHaveBeenCalled();
        expect((await (await fetch(base + path, { headers: { authorization: `Bearer ${token}` } })).json()).code).toBe(200);
    },
);

it('public reads use published-content queries', async () => {
    await fetch(base + '/api/article/get');
    await fetch(base + '/api/article/published');
    await fetch(base + '/api/friend/get');
    expect(articleDB.getArticle).toHaveBeenCalledWith(1);
    expect(articleDB.getArticleWithContent).toHaveBeenCalledWith('published');
    expect(friendDB.getFriends).toHaveBeenCalledWith();
});
