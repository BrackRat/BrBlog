import { changeFriend} from "~/server/db/friend";
import {FriendDB} from "~/server/types/friend";

export default defineEventHandler(async (event) => {
    const friend:FriendDB = await readBody(event)
    const result = await changeFriend(friend)
    return {code:200,data:result}
})
