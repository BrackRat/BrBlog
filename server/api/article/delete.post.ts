import {deleteArticle} from "~/server/db/article";

export default defineEventHandler(async (event) => {
    const {id} = await readBody(event)
    const result = await deleteArticle(id)
    return {code:200,data: result}
})
