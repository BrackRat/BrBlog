import {prisma} from "~/server/db/index";
import {FriendDB, FriendNew} from "~/server/types/friend";

export const addFriend = (friend: FriendNew) => {
    return prisma.friend.create({
        data: friend
    })
}

export const changeFriend = (friend: FriendDB) => {
    return prisma.friend.update({
        where: {id: friend.id},
        data: {...friend},
    });
}

export const deleteFriend = (id: number) => {
    return prisma.friend.delete({where: {id: id}});
}

export const getFriends = (getAll: boolean = false) => {
    if (getAll) {
        return prisma.friend.findMany({})
    } else {
        return prisma.friend.findMany({
            where: {
                status: 0
            }
        })
    }

}