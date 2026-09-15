import { defineEventHandler, getQuery } from 'h3';
import {getFriends} from "~/server/db/friend";
import {verifyToken} from "~/server/utils/auth";

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
