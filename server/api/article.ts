// @ts-ignore
import {getArticle} from "~/server/db/article";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    if(query.page && query.page as number >= 1){
        const page:number = query.page as number
        return getArticle(page);
    }else{
        // 返回第一页
        return getArticle(1);
    }
})
