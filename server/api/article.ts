// @ts-ignore
import {getArticle} from "~/server/db/article";

export default defineEventHandler(async (event) => {
    return getArticle();
})
