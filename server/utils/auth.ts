import jwt from 'jsonwebtoken';
import { defineEventHandler, type EventHandler } from 'h3';

export function verifyToken(header: string | undefined | null): boolean {
    const secret = process.env.JWT_SECRET;
    const username = process.env.ADMIN_USERNAME;
    if (!secret?.trim() || !username || !header?.startsWith('Bearer ')) return false;

    try {
        const payload = jwt.verify(header.slice(7), secret, { algorithms: ['HS256'] });
        return typeof payload === 'object'
            && payload.username === username
            && payload.role === 'admin'
            && typeof payload.exp === 'number';
    } catch {
        return false;
    }
}

// Bind authorization to the handler so every URL matched by Nitro is protected.
export function defineAdminEventHandler(handler: EventHandler) {
    return defineEventHandler(event => {
        if (!verifyToken(event.headers.get('Authorization'))) {
            return { code: 401, msg: 'Authorization Failed' };
        }
        return handler(event);
    });
}
