import Vue from 'vue'
import VueRouter from 'vue-router'

// 1 安装插件
Vue.use(VueRouter)


const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Profile = () => import('../views/profile/Profile')
const Cart = () => import('../views/cart/Cart')
const Detail = () => import('../views/detail/Detail')

// 2 创建router

const routes = [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '购物街'
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '我的信息'
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/detail/:id',
    component: Detail
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
// 3 导出
export default router