import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async event => {
    const { username, password } = await readBody(event) ?? {};
    if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
        return { code: 400, msg: 'missing username or password' };
    }

    const secret = process.env.JWT_SECRET;
    if (!secret?.trim() || !process.env.ADMIN_USERNAME || !process.env.ADMIN_HASHED_PASSWORD) {
        return { code: 503, msg: 'Authentication is not configured' };
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    if (username !== process.env.ADMIN_USERNAME || hashedPassword !== process.env.ADMIN_HASHED_PASSWORD) {
        return { code: 401, msg: 'wrong username or password' };
    }

    const token = jwt.sign({ username, role: 'admin' }, secret, { algorithm: 'HS256', expiresIn: '1h' });
    return { code: 200, token };
});
