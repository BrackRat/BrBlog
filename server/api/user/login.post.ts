import crypto from 'crypto';
// @ts-ignore
import jwt from 'jsonwebtoken';

// 生成 JWT
function generateToken(username: string, role: string) {
    return jwt.sign({username: username, role: role}, process.env.JWT_SECRET, {expiresIn: '1h'});
}


export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {username, password} = body

    if (!username || !password) {
        return {code:400, msg: "missing username or password"}
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    if (username === process.env.ADMIN_USERNAME && hashedPassword === process.env.ADMIN_HASHED_PASSWORD) {
        const token = generateToken(username, 'admin')
        return {code:200,token:token}
    } else {
        return {code:401,msg: "wrong username or password"}
    }
})

