import {prisma} from "~/server/db/index";
import {ArticleToPublish} from "~/server/types/article";

export const createArticle = (articleData:ArticleToPublish) => {
    return prisma.article.create({
        data:articleData
    })
}

export const getArticle = (limit: number = 20) => {
    return prisma.article.findMany({
        orderBy: {
            publishTime: 'desc'
        },
        take: limit,
        select: {
            id: true,
            title: true,
            desc: true,
            cover: true,
            viewCount: true,
            tag: true,
            createTime: true,
            publishTime: true,
        }
    });
}

export const getArticleWithContent = (id: number) => {
    return prisma.article.findUnique({
        where: {
            id: id
        }
    });
}

