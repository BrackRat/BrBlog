import {defineStore} from 'pinia'

export const useBlogStore = defineStore('blog', {
    state: () => ({
        token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJyYWNrUmF0Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA4NDI0MjM1LCJleHAiOjE3MDg0Mjc4MzV9.QpLunO1ZWyZHo7EvJBOOSnLBUHwZc5t9ODOMC7aci3c"
    }),
    getters: {
        // doubleCount: (state) => state.count * 2,
    },
    actions: {

    },
})