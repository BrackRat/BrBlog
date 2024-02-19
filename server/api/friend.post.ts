import {addFriend} from "~/server/db/friend";
import {FriendNew} from "~/server/types/friend";

export default defineEventHandler(async (event) => {
    const friend:FriendNew = await readBody(event)
    const result = await addFriend(friend)
    return {result:result}
})
