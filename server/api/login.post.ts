import crypto from 'crypto';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {username, password} = body

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    console.log(hashedPassword)

    if(username === process.env.ADMIN_USERNAME && hashedPassword === process.env.ADMIN_HASHED_PASSWORD){
        return {msg:"OK"}
    }else{
        return {msg:"wrong username or password"}
    }
})
