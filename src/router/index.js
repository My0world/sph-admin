//引入Vue|Vue-router
import Vue from 'vue'
import Router from 'vue-router'

//使用路由插件
Vue.use(Router)

/* Layout */
//骨架
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

//路由的配置
//常量路由：就是不管用户是什么角色，都可以看见的路由
//所有角色都能看见登录、404、首页
export const constantRoutes = [
  // 404
  { path: '*', redirect: '/404', hidden: true },
  //登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  //404
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  //首页页面
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      },
    ]
  },
  //商品页面
  {
    name: 'Product',
    path: '/product',
    redirect: '/product/tradeMark',
    component: Layout,
    meta: { title: '商品管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'tradeMark',
        name: 'TradeMark',
        component: () => import('@/views/product/TradeMark/TradeMark'),
        meta: { title: '品牌管理' }
      },
      {
        path: 'attr',
        name: 'Attr',
        component: () => import('@/views/product/Attr/Attr'),
        meta: { title: '平台属性管理' }
      },
      {
        path: 'spu',
        name: 'Spu',
        component: () => import('@/views/product/Spu/Spu'),
        meta: { title: 'Spu管理' }
      },
      {
        path: 'sku',
        name: 'Sku',
        component: () => import('@/views/product/Sku/Sku'),
        meta: { title: 'Sku管理' }
      },

    ]
  },
]

// 任意路由
// 但你路由出现错误时重定向

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  //根据路由的不同可以展示不同的菜单
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
