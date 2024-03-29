import {prisma} from "~/server/db/index";
import {Article, ArticleToPublish} from "~/server/types/article";

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

export const deleteArticle = (id: number) => {
    return prisma.article.delete({where: {id: id}})
}

export const getArticle = (page: number, getall: boolean = false, pageSize: number = 10) => {
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
            status: true,
            shortTitle:true
        }
    };

    if (!getall) {
        query.where = {
            status: 0
        };
    }
    return prisma.article.findMany(query);
}

export const getCount = (getAll: boolean = false) => {
    if (getAll) {
        return prisma.article.count({});
    } else {
        return prisma.article.count({where: {status: 0}});
    }
}

export const getArticleWithContent = (shortTitle: string, getAll: boolean = false) => {
    if (getAll) {
        return prisma.article.findUnique({
            where: {
                shortTitle: shortTitle,
            }
        });
    } else {
        return prisma.article.findUnique({
            where: {
                shortTitle: shortTitle,
                status: 0
            }
        });
    }
}


export const addReadCount = async (shortTitle: string) => {
    try {
        const article = await prisma.article.findUnique({
            where: {
                shortTitle: shortTitle,
                status: 0,
            }
        });
        if (article) {
            const updatedArticle = await prisma.article.update({
                where: {
                    shortTitle: shortTitle
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
            shortTitle:true,
            title: true,
            publishTime: true
        }
    });
}