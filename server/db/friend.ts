import {prisma} from "~/server/db/index";
import {FriendNew} from "~/server/types/friend";

export const addFriend = (friend:FriendNew) => {
    return prisma.friend.create({
        data:friend
    })
}

export const getFriends = () => {
    return prisma.friend.findMany({

    })
}