import { defineAdminEventHandler } from '~/server/utils/auth';
import { readBody } from 'h3';
import {addFriend} from "~/server/db/friend";
import {FriendNew} from "~/server/types/friend";

export default defineAdminEventHandler(async (event) => {
    const friend:FriendNew = await readBody(event)
    const result = await addFriend(friend)
    return {code:200, data:result}
})
