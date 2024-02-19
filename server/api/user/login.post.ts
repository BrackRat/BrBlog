import crypto from 'crypto';
// @ts-ignore
import jwt from 'jsonwebtoken';

// 生成 JWT
function generateToken(username: string, role: string) {
    return jwt.sign({username: username, role: role}, process.env.JWT_TOKEN, {expiresIn: '1h'});
}


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {username, password} = body

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    if (username === process.env.ADMIN_USERNAME && hashedPassword === process.env.ADMIN_HASHED_PASSWORD) {
        const token = generateToken(username, 'admin')
        return {token}
    } else {
        return {msg: "wrong username or password"}
    }
})

