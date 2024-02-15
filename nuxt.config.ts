// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    pages: true,
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/content',
        '@pinia/nuxt',
        '@nuxt/image'
    ],

    devtools: {enabled: true}
})
