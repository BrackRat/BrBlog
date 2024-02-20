import {deleteFriend} from "~/server/db/friend";

export default defineEventHandler(async (event) => {
    const {id} = await readBody(event)
    const result = await deleteFriend(id)
    return {code:200,data: result}
})