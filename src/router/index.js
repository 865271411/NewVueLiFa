import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/User/User.vue'

import Vip from '../components/vip/vip.vue'


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/viewUser.html',
          component: Users
        },
        {
          path: '/vip',
          component: Vip
        }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
// to 将要访问的路径
// from 代表从哪个路径跳转而来
// next 是一个函数，表示放行
// next() 放行 next('/login') 强制跳转

//  如果用户访问的登录页，直接放行
// if (to.path === '/login') return next()
// 从sessionStorage 中获取到 保存的token值
// const tokenStr = window.sessionStorage.getItem('token')
// 没有token,强制跳转到登录页
// if (!tokenStr) return next('/login')
// next()
// })

export default router
