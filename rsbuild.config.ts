import { resolve } from 'node:path';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir);
};

export default defineConfig({
  plugins: [pluginReact()],
  resolve: {
    // 配置别名
    alias: {
      '@': pathResolve('./src'),
      extensions: ['.ts', '.tsx', '.js'],
    },
  },
  dev: {
    // 开启懒编译，提升开发体验
    lazyCompilation: true,
  },
  //拆分打包策略
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
    },
  },
  //取消生成sourceMap，方便调试可以查看源码
  output: {
    sourceMap: {
      js: process.env.NODE_ENV === 'development' ? 'eval' : false,
    },
  },
  html: {
    meta: {
      viewport: 'width=device-width, initial-scale=1.0',
    },
  },
});
