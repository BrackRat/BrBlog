import { defineAdminEventHandler } from '~/server/utils/auth';
import { readBody } from 'h3';
import {deleteFriend} from "~/server/db/friend";

export default defineAdminEventHandler(async (event) => {
    const {id} = await readBody(event)
    const result = await deleteFriend(id)
    return {code:200,data: result}
})