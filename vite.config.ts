import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import V from "rollup-plugin-visualizer";
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

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

  return {
    plugins,
    envDir: "envs",
    resolve: {
      alias: {

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
            "vue-router": ["vue-router"]
          }
        }
      }
    }
  }
})
