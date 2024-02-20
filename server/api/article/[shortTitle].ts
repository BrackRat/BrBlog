import { getArticleWithContent} from "~/server/db/article";
import {verifyToken} from "~/server/middleware/auth";

export default defineEventHandler(async (event) => {
    const shortTitle = getRouterParam(event, 'shortTitle') as string;
    const query = getQuery(event)

    if (query.getAll && shortTitle) {
        const token = event.headers.get('Authorization') as string
        if (verifyToken(token)) {
            return {code: 200, data: await getArticleWithContent(shortTitle, true)};
        } else {
            return {code: 401, msg: "Authorization Failed"}
        }
    }else if (shortTitle){

            return {code:200,data: await getArticleWithContent(shortTitle)};

    }else{
        return {code:404,msg: "Empty id"};
    }

});

