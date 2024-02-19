import { defineNuxtModule, addComponent, addPlugin, createResolver } from "@nuxt/kit";

export default defineNuxtModule({
    setup(options, nuxt) {
        const { resolve } = createResolver(import.meta.url);

        // 注入 css
        nuxt.options.css.unshift("md-editor-v3/lib/style.css");

        // 注入 vue 组件
        ["MdEditor", "MdPreview", "MdCatalog"].forEach(comp => {
            addComponent({
                name: comp,
                export: comp,
                filePath: "md-editor-v3",
            });
        });

        // 注入插件
        addPlugin({
            mode: "client",
            src: resolve("./runtime/plugin"),
        });
    },
});