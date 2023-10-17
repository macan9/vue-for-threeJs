const { defineConfig } = require('@vue/cli-service')
// import { globals_config } from '/public/config/globals_config'
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    port: 8010,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://139.196.104.120:443',  // 目标代理服务器的域名
        changeOrigin: true,  // 支持跨域
        secure: false,
        pathRewrite: {
          '^/api': '/api'  // 将请求地址中的 /api 替换为空字符
        }
      },
      // '/gitee': {
      //   target: 'https://gitee.com',  
      //   changeOrigin: true,  
      //   secure: false,
      //   pathRewrite: {
      //     '^/gitee': '' 
      //   }
      // }
    }
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
        additionalData: `@import "@/assets/styles/main.scss";`,
      },
    },
  },
  
  
};
