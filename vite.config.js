import { resolve } from "path";
import { defineConfig } from "vite";
export default defineConfig({
  root: "./examples",
  base: "./", // 确保 base 是相对路径，以保持正确的资源加载
  build: {
    minify: true,
    outDir: "../dist", // 指定构建输出目录为根目录下的 dist 文件夹
    lib: {
      entry: resolve(__dirname, "./src/TrackPlayer.js"),
      name: "TrackPlayer", //全局变量名称
      fileName: "leaflet-trackplayer",
    },
    rollupOptions: {
      external: ['leaflet'],//指定外部依赖，不会将其打包到bundle中
      output: {
        chunkFileNames: "src/[name].js", // 按需加载模块的命名规则
        assetFileNames: "leaflet.TrackPlayer[extname]", // 静态资源（包括CSS）的命名规则
        globals: {
          leaflet: 'L', // 定义leaflet的全局变量名，确保umd.js能正确访问到leaflet
        },
      },
    },
  },

  server: {
    open: true,
    host: "0.0.0.0",
  },
});
