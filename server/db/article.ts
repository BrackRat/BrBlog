import {prisma} from "~/server/db/index";
import {Article, ArticleToPublish} from "~/server/types/article";
import {Prisma} from "@prisma/client";

export const createArticle = (articleData: ArticleToPublish) => {
    return prisma.article.create({
        data: articleData
    })
}

export const changeArticle = (article: Article) => {
    return prisma.article.update({
        where: {id: article.id},
        data: {...article},
    });
}

export const getArticle = (page: number, getall: boolean = false, pageSize:number = 3) => {
    const skip: number = (page - 1) * pageSize;

    let query: Prisma.ArticleFindManyArgs = {
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
            status: true
        }
    };

    if (!getall) {
        query.where = {
            status: 0
        };
    }
    return prisma.article.findMany(query);
}


export const getArticleWithContent = (id: number) => {
    return prisma.article.findUnique({
        where: {
            id: id,
            status: 0
        }
    });
}


export const addReadCount = async (id: number) => {
    try {
        const article = await prisma.article.findUnique({
            where: {
                id: id,
                status: 0,
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
            return '文章不存在';
        }
    } catch (error) {
        throw error;
    }
}

export const getHome = () => {
    const amount: number = 4;

    return prisma.article.findMany({
        where: {
            status: 0
        },
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