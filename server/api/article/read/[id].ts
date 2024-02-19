// @ts-ignore
import {addReadCount} from "~/server/db/article";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    if(id){
        return {code:200, data: await addReadCount(parseInt(id,10))};
    }else{
        return {code:404}
    }
})
