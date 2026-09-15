import { defineAdminEventHandler } from '~/server/utils/auth';
import { readBody } from 'h3';
import { changeFriend} from "~/server/db/friend";
import {FriendDB} from "~/server/types/friend";

export default defineAdminEventHandler(async (event) => {
    const friend:FriendDB = await readBody(event)
    const result = await changeFriend(friend)
    return {code:200,data:result}
})
