// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    pages: true,
    modules: [
        '@nuxtjs/tailwindcss',
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
                    src: 'https://analytics.brackrat.com/script.js',
                    'data-website-id': '08fc9e5c-3446-455d-be05-154cd72bc5b6',
                },
            ],
        }
    },
    css: ["md-editor-v3/lib/style.css"],
    // devtools: {enabled: true}
})
