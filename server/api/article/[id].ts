import {getArticleWithContent} from "~/server/db/article";

export default defineEventHandler((event) => {
    const id = getRouterParam(event, 'id');
    if (id) {
        const idAsInt = parseInt(id, 10);
        return getArticleWithContent(idAsInt);
    }
});

