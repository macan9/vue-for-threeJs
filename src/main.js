import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 使用 mock
require('./common/mock/index.js') 

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')

