# threejs-demo

### Compiles and hot-reloads for development
```
npm run serve
```
## 配置项记录
### 默认运行端口
``` js
module.exports = {
  devServer: {
    port: 8010,
  },
}
```
### 配置公共路径
``` js
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  publicPath: './',
```
### 安装好node-sass，sass-loader， 配置vue文件中可以解析  lang = 'scss' 
``` js
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
```
### 引入公共的 scss 文件
``` js
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/main.scss";`,
      },
    },
  },
```



