/** @type {import('tailwindcss').Config} */
export default {
    content: [],
    theme: {
        screens: {
            xs: '480px',
            ...defaultTheme.screens,
        },
        extend: {
            fontFamily: {
                'frank-ruhl-libre': ['Frank Ruhl Libre', 'sans-serif'],
                'Lora': ['Lora', 'sans-serif'],
                'noto-serif': ["Noto Serif SC", "serif"]
            },
            colors: {
                'primary': '#C24E13',
                'secondary': '#E8DCCD',
                'content': '#BBA893',
            },
        },

    },
    plugins: [],

}

