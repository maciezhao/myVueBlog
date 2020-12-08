import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    // redirect: '/content',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('@/views/home'),
    name: '主页'
  },
  {
    path: '/archive',
    component: () => import('@/views/archive'),

  },
  {
  path: '/category',
  component: () => import('@/views/categories'),

  },
  {
    path: '/articleDetail/:articleId/:slug',
    name: 'articleDetail',
    component: () => import('@/views/articleDetail'),
    
  },
  {
    path:'/editArticle/:articleId?',
    name: 'editArticle',
    component: () => import('@/views/editArticle'),
  },
  {
    path: '/:type/:id',
    name:'CategoryOrTag',
    component: () => import('@/views/categoryOrtagdetail'),

  },
  {
    path:'/about',
    component: () => import('@/views/about'),
  },
  {
    path: '/settings',
    component: () => import('@/views/settings'),
    meta:{
      requireAuth:true
    },
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401')
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404')
  },
  { path: '*', redirect: '/404', hidden: true },
]


const createRouter = () => new Router({
  mode: 'hash', // history mode require service support
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
