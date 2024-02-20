import {getFriends} from "~/server/db/friend";
import {verifyToken} from "~/server/middleware/auth";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    if (query.getAll) {
        const token = event.headers.get('Authorization') as string
        if (verifyToken(token)) {
            return {code: 200, data: await getFriends(true)};
        } else {
            return {code: 401, msg: "Authorization Failed"}
        }
    }
    return {code: 200, data: await getFriends()}
})
