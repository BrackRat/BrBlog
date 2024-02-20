export interface Article {
    id: number
    title: string
    desc: string
    cover: string
    viewCount: number
    tag: string
    createTime: number
    publishTime: number
    status: number
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
    status: number

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
    status: number
}

export interface OnlyTitle {
    id: number
    publishTime: number
    title: string
}