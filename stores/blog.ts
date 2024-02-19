import {defineStore} from 'pinia'

export const useBlogStore = defineStore('blog', {
    state: () => ({
        token:""
    }),
    getters: {
        // doubleCount: (state) => state.count * 2,
    },
    actions: {

    },
})