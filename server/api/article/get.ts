// @ts-ignore
import {getArticle, getCount} from "~/server/db/article";
import {verifyToken} from "~/server/middleware/auth";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    // 管理员可以获取隐藏 article
    if (query.getall) {
        const token = event.headers.get('Authorization') as string
        if (verifyToken(token)) {
            const page: number = query.page as number
            return {code: 200, data: {total: await getCount(true) ,articles:await getArticle(page, true, 20)}};
        } else {
            return {code: 401, msg: "Authorization Failed"}
        }
    }
    if (query.page && query.page as number >= 1) {
        const page: number = query.page as number
        return {code: 200, data: await getArticle(page)};
    } else {
        // 返回第一页
        return {code: 200, data: await getArticle(1)};
    }
})
