export interface Article {
    id: number
    title: string
    desc: string
    cover: string
    viewCount: number
    tag: string
    createTime: number
    publishTime: number
}

export interface ArticleWithContent {
    id: number
    title: string
    desc: string
    cover: string
    content: string
    viewCount: number
    tag: string
    createTime: number
    publishTime: number
}

export interface ArticleToPublish {
    title: string
    desc: string
    cover: string
    content: string
    viewCount: number | undefined
    tag: string
    createTime: number
    publishTime: number
}

export interface OnlyTitle {
    title: string
}