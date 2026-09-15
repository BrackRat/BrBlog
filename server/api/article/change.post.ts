import { defineAdminEventHandler } from '~/server/utils/auth';
import { readBody } from 'h3';
import {Article} from "~/server/types/article";
import {changeArticle} from "~/server/db/article";

export default defineAdminEventHandler(async (event) => {
    const article:Article = await readBody(event)
    const result = await changeArticle(article)
    return {code:200,data: result}
})
