import {getFriends} from "~/server/db/friend";

export default defineEventHandler(async (event) => {
    return {code:200, data: await getFriends()}
})
