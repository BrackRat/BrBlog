// @ts-ignore
import {ArticleToPublish} from "~/server/types/article";
import {createArticle} from "~/server/db/article";

export default defineEventHandler(async (event) => {
    const article:ArticleToPublish = await readBody(event)
    const result = await createArticle(article)
    return {result:result}
})
