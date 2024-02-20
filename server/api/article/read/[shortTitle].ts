// @ts-ignore
import {addReadCount} from "~/server/db/article";

export default defineEventHandler(async (event) => {
    const shortTitle = getRouterParam(event, 'shortTitle');
    if(shortTitle){
        return {code:200, data: await addReadCount(shortTitle)};
    }else{
        return {code:404}
    }
})
