// @ts-ignore
import {getHome} from "~/server/db/article";

export default defineEventHandler(async (event) => {
    return getHome()
})
