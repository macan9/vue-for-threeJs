import { createRouter, createWebHashHistory } from 'vue-router'



import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/blogMain',
        name: 'blogMain',
        component: () => import('@/views/blogSystem/BlogMain.vue')
      },
      {
        path: '/userEdit',
        name: 'userEdit',
        component: () => import('@/views/userManage/UserEdit.vue')
      },{
        path: '/userTable',
        name: 'userTable',
        component: () => import('@/views/userManage/UserTable.vue')
      },{
        path: '/leafletMap',
        name: 'leafletMap',
        component: () => import('@/views/leafletMap/LeafletMap.vue')
      },{
        path: '/threeGuiBase',
        name: 'threeGuiBase',
        component: () => import('@/views/three/ThreeGuiBase.vue')
      },{
        path: '/threePlanet',
        name: 'threePlanet',
        component: () => import('@/views/three/ThreePlanet.vue')
      }
    ]
  },
  {
    path: '/useView',
    name: 'useView',
    component: () => import(/* webpackChunkName: "about" */ '@/views/UseView.vue')
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
  const loginStatus = localStorage.getItem('loginStatus');
  // console.log('router beforeEach',from,to,loginStatus)
  if (to.name!='login'&&!loginStatus) {
    console.log('用户未登录')
    // 如果访问需要身份验证的页面，而用户未登录，则重定向到登录页面
    next({ name: 'login' })
  }else{
    next()
  }
})

export default router
