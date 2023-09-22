import { createRouter, createWebHashHistory } from 'vue-router'
import { useStore } from 'vuex'


import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'blogMain',
        name: 'blogMain',
        component: () => import('@/views/blogSystem/BlogMain.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/homePage/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginPages.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  // 全局前置守卫，会在每个路由导航之前调用
  const store = useStore()
  const loginStatus = store.state.loginStatus
  console.log('router beforeEach',from,to,loginStatus)
  if (to.name!='login'&&!loginStatus) {
    console.log('用户未登录')
    // 如果访问需要身份验证的页面，而用户未登录，则重定向到登录页面
    next({ name: 'login' })
  } else{
    next()
  }
})

export default router
