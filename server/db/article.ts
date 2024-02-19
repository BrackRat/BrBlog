import {prisma} from "~/server/db/index";
import {ArticleToPublish} from "~/server/types/article";

export const createArticle = (articleData:ArticleToPublish) => {
    return prisma.article.create({
        data:articleData
    })
}

export const getArticle = (page: number) => {
    const pageSize:number = 3;
    const skip:number = (page - 1) * pageSize;

    return prisma.article.findMany({
        orderBy: {
            publishTime: 'desc'
        },
        take: pageSize,
        skip: skip,
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


export const addReadCount = async (id: number) => {
    try {
        const article = await prisma.article.findUnique({
            where: {
                id: id
            }
        });
        if (article) {
            const updatedArticle = await prisma.article.update({
                where: {
                    id: id
                },
                data: {
                    viewCount: article.viewCount + 1 // 增加阅读计数
                }
            });
            return 'ok';
        } else {
            throw new Error('文章不存在');
        }
    } catch (error) {
        throw error;
    }
}

export const getHome = () => {
    const amount:number = 4;

    return prisma.article.findMany({
        orderBy: {
            publishTime: 'desc'
        },
        take: amount,
        select: {
            id: true,
            title: true,
        }
    });
}