import { defineAdminEventHandler } from '~/server/utils/auth';
import { readBody } from 'h3';
// @ts-ignore
import {ArticleToPublish, ArticleWithContent} from "~/server/types/article";
import {createArticle} from "~/server/db/article";

function transformArticle(article:ArticleWithContent):ArticleToPublish{
    let temp:any = article
    if(article.id){
        delete temp.id
    }
    temp = temp as ArticleToPublish
    return temp
}

export default defineAdminEventHandler(async (event) => {
    const article:ArticleWithContent = await readBody(event)
    const tArticle = transformArticle(article)
    const result = await createArticle(tArticle)
    return {code:200,data:result}
})
