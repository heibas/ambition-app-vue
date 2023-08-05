import Vue from 'vue'
import Router from 'vue-router'
import { Lazyload } from 'vant';
import Cookies from 'js-cookie';
import VueRouter from 'vue-router';
import store from '../store/index';
Vue.use(Lazyload)
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'layouts',
    component: () => import('@/views/layouts'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: true,//缓存而仍作为组件树的一部分时
      // tabBar: true,  //是否显示底部标签栏 true 显示 false不显示
      //navBar: false, //是否显示顶部导航栏 true 显示 false不显示
      //requireAuth:true //是否需要登录才能进
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home'),
        meta: {
          title: '首页',
          keepAlive: true,
          tabBar: true,
          navBar: false,
          requireAuth: false
        }
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('@/views/category'),
        meta: {
          title: '商品分类',
          keepAlive: true,
          tabBar: true,
          navBar: true,
          requireAuth: false
        }
      },
      {
        path: '/seacher',
        name: 'seacher',
        component: () => import('@/views/seacher'),
        meta: {
          title: '搜索',
          keepAlive: false,
          tabBar: true,
          navBar: false,
          requireAuth: false
        }
      },
      {
        path: '/productList',
        name: 'productList',
        component: () => import('@/views/productList'),
        meta: {
          title: '商品列表',
          keepAlive: false,
          tabBar: true,
          navBar: true,
          requireAuth: false
        }
      },
      {
        path: '/pointsList',
        name: 'pointsList',
        component: () => import('@/views/productList'),
        meta: {
          title: '积分列表',
          keepAlive: false,
          tabBar: true,
          navBar: true,
          requireAuth: false
        }
      },
      {
        path: '/productDetails',
        name: 'productDetails',
        component: () => import('@/views/productDetails'),
        meta: {
          title: '商品详情',
          keepAlive: false,
          tabBar: false,
          navBar: true,
          requireAuth: false
        }
      },
      {
        path: '/cat',
        name: 'cat',
        component: () => import('@/views/cat'),
        meta: {
          title: '购物车',
          keepAlive: false,
          tabBar: false,
          navBar: true,
          requireAuth: true
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user'),
        meta: {
          title: '个人中心',
          keepAlive: false,
          tabBar: true,
          navBar: false,
          requireAuth: true
        }
      },
      {
        path: '/address',
        name: 'address',
        component: () => import('@/views/user/address'),
        meta: {
          title: '联系人列表',
          keepAlive: false,
          tabBar: false,
          navBar: true,
          requireAuth: true
        }
      },
      {
        path: '/newAddress',
        name: 'newAddress',
        component: () => import('@/views/user/newAddress'),
        meta: {
          title: '联系人',
          keepAlive: false,
          tabBar: false,
          navBar: true,
          requireAuth: true
        }
      },
      {
        path: '/wallet',
        name: 'wallet',
        component: () => import('@/views/user/wallet'),
        meta: {
          title: '我的钱包',
          keepAlive: false,
          tabBar: true,
          navBar: true,
          requireAuth: true
        }
      },
      {
        path: '/collect',
        name: 'collect',
        component: () => import('@/views/user/collect'),
        meta: {
          title: '我的收藏',
          keepAlive: false,
          tabBar: false,
          navBar: true,
          requireAuth: true
        }
      },
      {
        path: '/collects',
        name: 'collects',
        component: () => import('@/views/user/collect'),
        meta: {
          title: '我的足迹',
          keepAlive: false,
          tabBar: false,
          navBar: true,
          requireAuth: true
        }
      },
      {
        path: '/pass',
        name: 'pass',
        component: () => import('@/views/user/pass'),
        meta: {
          title: '修改密码',
          keepAlive: false,
          tabBar: true,
          navBar: true,
          requireAuth: true
        }
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/user/login'),
        meta: {
          title: '登录',
          keepAlive: false,
          tabBar: false,
          navBar: false,
          requireAuth: false
        }
      },
      {
        path: '/enroll',
        name: 'enroll',
        component: () => import('@/views/user/enroll'),
        meta: {
          title: '注册',
          keepAlive: false,
          tabBar: false,
          navBar: false,
          requireAuth: false
        }
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/order'),
        meta: {
          title: '订单',
          keepAlive: false,
          tabBar: true,
          navBar: true,
          requireAuth: true
        }
      },
      {
        path: '/play',
        name: 'play',
        component: () => import('@/views/play'),
        meta: {
          title: '创建订单',
          keepAlive: false,
          tabBar: false,
          navBar: true,
          requireAuth: true
        }
      },
      {
        path: '/paySuccess',
        name: 'paySuccess',
        component: () => import('@/views/play/paySuccess'),
        meta: {
          title: '支付成功',
          keepAlive: false,
          tabBar: false,
          navBar: true,
          requireAuth: true
        }
      },
      {
        path: '/lookOrder',
        name: 'lookOrder',
        component: () => import('@/views/order/lookOrder'),
        meta: {
          title: '订单详情',
          keepAlive: false,
          tabBar: false,
          navBar: true,
          requireAuth: true
        }
      },
      {
        path: '/**',
        name: 'home',
        component: () => import('@/views/home'),
        meta: {
          title: '首页',
          keepAlive: false,
          tabBar: true,
          navBar: true,
          requireAuth: false
        }
      }
    ]
  }
]
//路由跳转错误....目录
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, resolve, reject) {
  if (resolve || reject) return originalPush.call(this, location, resolve, reject)
  return originalPush.call(this, location).catch((e) => { })
}


const router = new VueRouter({
  mode: 'history',
  routes
})
//路由守护
router.beforeEach((to, from, next) => {
  let token = Cookies.get("TOKEN");
  if (to.meta.requireAuth && !token) {
    store.commit('RESET_STATE');
    next({ path: '/login' })
  } else {
    next()
  }



})

export default router;