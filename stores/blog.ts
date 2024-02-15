import {defineStore} from 'pinia'
import type {Article, ArticleToPublish} from "~/server/types/article";
import httpRequest from "~/service";

export const useBlogStore = defineStore('blog', {
    state: () => ({
        count: 0,
        name: 'Eduardo',
        articleCache: []
    }),
    getters: {
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        getUnixTimeStamp(): number {
            // 获取当前时间的 Unix 时间戳（精确到秒）
            return Math.floor(Date.now() / 1000);
        },
        async articlePublishTest() {
            const article: ArticleToPublish = {
                title: "string",
                desc: "string",
                cover: "string",
                content: "string",
                tag: "string",
                viewCount: 0,
                createTime: this.getUnixTimeStamp(),
                publishTime: this.getUnixTimeStamp(),
            }
            // @ts-ignore
            await useFetch("/api/article", {
                method: 'POST',
                body: article
            })
        },
        async getArticle() {
            try {
                const response = await useFetch("/api/article", {
                    method: 'GET',
                });

                // if (response.status !== 200) {
                //     throw new Error('Failed to fetch articles');
                // }

                const result = response.data.result;
                this.articleCache = result;
                console.log(result)
            } catch (error) {
                console.error('Error fetching articles:', error);
                // Handle error
            }
        }
    },
})