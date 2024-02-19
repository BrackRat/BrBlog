import { config } from "md-editor-v3";

export default defineNuxtPlugin(async () => {
    config({
        editorConfig: {
            renderDelay: 300,
        },
        markdownItConfig: md => {
            md.set({
                html: true,
                linkify: true,
            });
        },
    });
});