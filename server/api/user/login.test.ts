import { describe, it, expect, vi, beforeEach } from 'vitest';

// Use vi.mock for h3 before importing handler
vi.mock('h3', () => ({
  defineEventHandler: vi.fn((handler) => handler),
  readBody: vi.fn(),
}));

import { defineEventHandler, readBody } from 'h3';
import loginHandler from './login.post';
import crypto from 'crypto';

// In case they are still not available as globals (Nuxt magic)
(global as any).defineEventHandler = defineEventHandler;
(global as any).readBody = readBody;

describe('Login API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ADMIN_USERNAME = 'admin';
    process.env.ADMIN_HASHED_PASSWORD = crypto.createHash('sha256').update('password').digest('hex');
    process.env.JWT_SECRET = 'secret';
  });

  it('should return 400 if username or password is missing', async () => {
    vi.mocked(readBody).mockResolvedValue({});
    const result = await (loginHandler as any)({});
    expect(result.code).toBe(400);
    expect(result.msg).toBe('missing username or password');
  });

  it('should return 401 if credentials are wrong', async () => {
    vi.mocked(readBody).mockResolvedValue({ username: 'admin', password: 'wrongpassword' });
    const result = await (loginHandler as any)({});
    expect(result.code).toBe(401);
    expect(result.msg).toBe('wrong username or password');
  });

  it('should return 200 and token if credentials are correct', async () => {
    vi.mocked(readBody).mockResolvedValue({ username: 'admin', password: 'password' });
    const result = await (loginHandler as any)({});
    expect(result.code).toBe(200);
    expect(result.token).toBeDefined();
  });
});
