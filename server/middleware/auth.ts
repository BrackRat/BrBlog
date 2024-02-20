// @ts-ignore
import jwt from 'jsonwebtoken';

function extractToken(authHeader: string): string | null {
    const bearerPrefix = 'Bearer ';
    if (authHeader.startsWith(bearerPrefix)) {
        return authHeader.substring(bearerPrefix.length);
    }
    return null;
}

export function verifyToken(token: string): boolean {
    try {
        const decoded = jwt.verify(extractToken(token), process.env.JWT_TOKEN);
        return !!decoded;

    } catch (error) {
        return false;
    }
}

export default defineEventHandler(event => {
    const needAuthRoutes = [
        '/api/article/create',
        '/api/article/change',
        '/api/friend/create',
        '/api/friend/change',
    ]

    if (needAuthRoutes.includes(event.path)) {
        const token: string = event.headers.get('Authorization') as string;
        if (verifyToken(token)) {
        } else {
            return {code: 404, msg: "Authorization Failed"}
        }
    }
});