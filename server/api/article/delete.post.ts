import { defineAdminEventHandler } from '~/server/utils/auth';
import { readBody } from 'h3';
import {deleteArticle} from "~/server/db/article";

export default defineAdminEventHandler(async (event) => {
    const {id} = await readBody(event)
    const result = await deleteArticle(id)
    return {code:200,data: result}
})
