import {getArticle, getArticleWithContent} from "~/server/db/article";
import {verifyToken} from "~/server/middleware/auth";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id') as string;
    const idAsInt = parseInt(id, 10);
    const query = getQuery(event)

    if (query.getAll && idAsInt) {
        const token = event.headers.get('Authorization') as string
        if (verifyToken(token)) {
            return {code: 200, data: await getArticleWithContent(idAsInt, true)};
        } else {
            return {code: 401, msg: "Authorization Failed"}
        }
    }else if (id){

            return {code:200,data: await getArticleWithContent(idAsInt)};

    }else{
        return {code:404,msg: "Empty id"};
    }

});

