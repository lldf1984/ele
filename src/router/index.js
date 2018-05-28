import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Detail from '@/components/detail'
import Home from '@/components/home'
import Ratings from '@/components/ratings'
import Goods from '@/components/goods'
import Seller from '@/components/seller'
import Login from '@/components/login'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      component: Index,
      redirect: '/index/home',
      meta: {
        isLogin: true
      }
    },
    {
      name: '首页',
      path: '/index',
      component: Index,
      redirect: '/index/home',
      meta: {
        isLogin: true
      },
      children: [
        {
          name: '首页',
          path: 'home',
          component: Home,
          redirect: '/index/home/goods',
          meta: {
            isLogin: true
          },
          children: [
            {
              name: 'goods',
              path: 'goods',
              component: Goods,
              meta: {
                isLogin: true
              }
            },
            {
              name: 'ratings',
              path: 'ratings',
              component: Ratings,
              meta: {
                isLogin: true
              }
            },
            {
              name: 'seller',
              path: 'seller',
              component: Seller,
              meta: {
                isLogin: true
              }
            }
          ]
        },
        {
          name: '商品详情',
          path: '/index/detail',
          component: Detail
        }
      ]
    },
    {
      name: '登录',
      path: '/login',
      component: Login
    }
  ],
  linkActiveClass: 'active'
})
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    sessionStorage.getItem('user') === null
      ? next('/login')
      : next()
  } else {
    next()
  }
})
export default router
