const { defineConfig } = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    port: 8010,
  },
  // 配置公共路径
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  publicPath: './',
  // 配置vue文件中可以解析  lang = 'scss' 
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  // 引入公共的  scss 文件
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/main.scss";`,
      },
    },
  },
  
  
};
