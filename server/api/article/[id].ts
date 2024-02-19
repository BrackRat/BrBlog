import {getArticleWithContent} from "~/server/db/article";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    if (id) {
        const idAsInt = parseInt(id, 10);
        return {code:200,data: await getArticleWithContent(idAsInt)};
    }
});

