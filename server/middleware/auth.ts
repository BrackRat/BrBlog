import jwt from 'jsonwebtoken';
import { defineEventHandler } from 'h3';

function extractToken(authHeader: string | undefined | null): string | null {
    if (!authHeader) return null;
    const bearerPrefix = 'Bearer ';
    if (authHeader.startsWith(bearerPrefix)) {
        return authHeader.substring(bearerPrefix.length);
    }
    return null;
}

export function verifyToken(token: string | undefined | null): boolean {
    const extracted = extractToken(token);
    if (!extracted) return false;
    try {
        const decoded = jwt.verify(extracted, process.env.JWT_SECRET as string);
        return !!decoded;

    } catch (error) {
        return false;
    }
}

export default defineEventHandler(event => {
    const needAuthRoutes = [
        '/api/article/create',
        '/api/article/change',
        '/api/article/delete',
        '/api/friend/create',
        '/api/friend/change',
        '/api/friend/delete',
    ]

    const path = event.path?.split('?')[0] || '';

    if (needAuthRoutes.includes(path)) {
        const token = event.headers.get('Authorization');
        if (verifyToken(token)) {
        } else {
            return {code: 401, msg: "Authorization Failed"}
        }
    }
});