// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    pages: true,
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/content',
        '@pinia/nuxt',
        '@nuxt/image',
        '@formkit/auto-animate/nuxt',
        '@vueuse/motion/nuxt',
        'nuxt-icon',
    ],
    app: {
        pageTransition: {name: 'page', mode: 'out-in'},
        head:{
            script:[
                {
                    async: true,
                    src: 'https://analytics.us.umami.is/script.js',
                    'data-website-id': '6524c96d-3029-473e-bf39-2ef1b06faef8',
                },
            ],
        }
    },
    css: ["md-editor-v3/lib/style.css"],
    // devtools: {enabled: true}
})
