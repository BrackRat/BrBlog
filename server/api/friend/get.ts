import {getFriends} from "~/server/db/friend";

export default defineEventHandler(async (event) => {
    return getFriends()
})
