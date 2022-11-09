import Path from "path";
import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import V from "rollup-plugin-visualizer";
// import build from "./plugin";
import build from "vite-plugin-vue-scaffold-build";
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

const plugins: PluginOption[] = [
  vue(),
  // build({
  //   vuePath: "//assets.cooocc.com/libs/vue.js",
  //   buildProject: true
  // }),
  // V({
  //   filename: "dist/v.html",
  //   open: process.env?.NODE_ENV === "production"
  // }),
  Components({
    resolvers: [NaiveUiResolver()]
  })
];

export default defineConfig(({ mode }) => {
  console.log(mode);

  return {
    base: mode === "production" ? "https://static-api.witframe.com/Fanyi/v1/" : "/",
    plugins,
    envDir: "envs",
    // publicDir: mode === "production" ? "https://static-api.witframe.com/Fanyi/v1/" : "/",
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
      assetsDir: "static",
      rollupOptions: {
        output: {
          // chunkFileNames(chunkInfo) {
          //   const firstModulePath = Object.keys(chunkInfo.modules)[0];
          //   if (firstModulePath.includes("node_modules")) {
          //     return `assets/js/modules/${chunkInfo.name}-[hash].js`;
          //   }

          //   return `assets/js/apps/${chunkInfo.name}-[hash].js`;
          // },
          manualChunks: {
            "naive-ui": ["naive-ui"],
            "vuedraggable-es": ["vuedraggable-es"],
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
