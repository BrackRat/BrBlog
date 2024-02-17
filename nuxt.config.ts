// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    pages: true,
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/content',
        '@pinia/nuxt',
        '@nuxt/image',
        '@formkit/auto-animate/nuxt',
        'nuxt-icon'
    ],
    app: {
        pageTransition: {name: 'page', mode: 'out-in'},
    },
    devtools: {enabled: true}
})
