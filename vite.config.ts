import Path from "path";
import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import V from "rollup-plugin-visualizer";
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import config from "./src/config";

export default defineConfig(({ mode }) => {
  const plugins: PluginOption[] = [
    vue(),
    // @ts-ignore
    V({
      filename: "dist/v.html",
      open: mode === "production"
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ];

  const base: string = mode === "production" ? `/source/plugin/${config.PluginId}/Views/dashboard` : "";

  return {
    plugins,
    envDir: "envs",
    base,
    resolve: {
      alias: {
        "@Api": Path.resolve(__dirname, "src/api/modules"),
        "@Service": Path.resolve(__dirname, "src/service"),
        "@Components": Path.resolve(__dirname, "src/components"),
        "@Views": Path.resolve(__dirname, "src/views"),
        "@Foundation": Path.resolve(__dirname, "src/foundation"),
        "@Store": Path.resolve(__dirname, "src/store"),
        "@Typings": Path.resolve(__dirname, "src/typings")
      }
    },
    build: {
      minify: false,
      rollupOptions: {
        output: {
          chunkFileNames(chunkInfo) {
            const firstModulePath = Object.keys(chunkInfo.modules)[0];
            if (firstModulePath.includes("node_modules")) {
              return `assets/js/modules/${chunkInfo.name}-[hash].js`;
            }

            return `assets/js/apps/${chunkInfo.name}-[hash].js`;
          },
          manualChunks: {
            "naive-ui": ["naive-ui"],
            "vant": ["vant"],
            "vue": ["vue", "plugin-vue:export-helper"],
            "vite": ["vite/modulepreload-polyfill"],
            "vue-router": ["vue-router"],
            "dayjs": ["dayjs"],
            "highlight": ["highlight.js"]
          }
        }
      }
    }
  }
})
