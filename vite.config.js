import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/blockchain/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@lottie': path.resolve(__dirname, 'src/assets/lottie'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@style': path.resolve(__dirname, 'src/assets/style'),
      '@router': path.resolve(__dirname, 'src/router'),
    },
  },
  css: {
    postcss: {
      plugins: [
        require('postcss-pxtorem')({
          rootValue: 16, // 数字|函数）表示根元素字体大小或根据input参数返回根元素字体大小
          viewportWidth: 1024, // 设计稿的视口宽度
          unitPrecision: 5, // 单位转换后保留的精度
          propList: ['*'], // 能转化为vw的属性列表
          mediaQuery: true, // 媒体查询里的单位是否需要转换单位
        }),
      ],
    },
    preprocessorOptions: {
      less: {
        additionalData: "@import '@style/index';",
      },
    },
  },
  plugins: [vue()],
  build: {
    outDir: './blockchain',
    minify: 'terser',
  },
  server: {
    cors: true,
    open: true,
  },
});
