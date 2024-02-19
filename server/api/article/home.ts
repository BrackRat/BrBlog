// @ts-ignore
import {getHome} from "~/server/db/article";

export default defineEventHandler(async (event) => {
    return {code:200,data:await getHome()}
})
