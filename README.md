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

### 遇到的坑
1. 没有服务器支持下使用历史路由模式导致刷新页面报404
2. 原生的 form submit 没有阻止原始事件，导致多次提交，多次路由跳转
3. element plus icon 部分功能需要全局注册才能正常使用
4. mock 会拦截浏览器 http。如果mock配置正确，反而不会产生 http 请求
5. axios全局注册目前看来没有节约多少代码量，不如将各种 api 放在一起管理
6. 不能使用 debugger   package.json 里的 eslintConfig 配置 rules 即可解决

### 还没解决的问题
1. 无
   



