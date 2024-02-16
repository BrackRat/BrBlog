// @ts-ignore
import {addReadCount} from "~/server/db/article";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    if(id){
        return addReadCount(parseInt(id,10));
    }else{
        return {code:404}
    }
})
