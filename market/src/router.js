import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "@/views/Login";

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/', // 访问路径
      redirect: '/login'  // 重定向到指定地址
      // redirect: {
      //   name :'home'
      // } // 重定向到路线的名称
    },
    {
      path: '/login', // 访问路径
      name: 'login',
      component: Login // 视图组件
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/home/user',
          name: 'user',
          meta: { requiresAuth: true },

          component: () => import('./views/module/Account/User.vue')
        },
        {
          path: '/home/addUser',
          name: 'addUser',
          meta: { requiresAuth: true },

          component: () => import('./views/module/Account/AddUser.vue')
        },
        {
          path: 'changePassword', // 相对路径
          name: 'changePassword',
          meta: { requiresAuth: true },

          component: () => import('./views/module/Account/ChangePassword.vue')
        },
        {
          path: '/home/product',
          name: 'product',
          meta: { requiresAuth: true },

          component: () => import('./views/module/Product/Product.vue')
        },
        {
          path: '/home/addProduct',
          name: 'addProduct',
          meta: { requiresAuth: true },

          component: () => import('./views/module/Product/AddProduct.vue')
        },
        {
          path: '/home/addstock',
          name: 'addStock',
          component: () => import('./views/module/Stock/AddStock.vue')
        },
        {
          path: '/home/inventorymanage',
          name: 'inventorymanage',
          meta: { requiresAuth: true },

          component: () => import('./views/module/Stock/InventoryManage.vue')
        },
        {
          path: '/home/vipAdd',
          name: 'vipadd',
          meta: { requiresAuth: true },

          component: () => import('./views/module/Vip/VipAdd.vue')
        },   
        {
          path: '/home/vip',
          name: 'vipadd',
          component: () => import('./views/module/Vip/Vip.vue')
        },  
        {
          path: '/home/selltotal',
          name: 'selltotal',
          meta: { requiresAuth: true },

          component: () => import('./views/module/Total/SellTotal.vue')
        }, 
        {
          path: '/home/stocktotal',
          name: 'stocktotal',
          meta: { requiresAuth: true },

          component: () => import('./views/module/Total/StockTotal.vue')
        }, 
      ]
    }
  ]
})


// 配置守卫
// to  : Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来向后走
// next()   确定向后执行(放行)
// next('/login')   拦截,手动指定出口
router.beforeEach((to, from, next) => {
  // next('/')
  // if(to.name==='login'){ // 名称验证,不通用
  //   next()
  // }
  // debugger
  if (to.meta.requiresAuth) { // 需要验证
    // 获取登录通行证
    const token = localStorage.getItem('token')
    // 如果有验证信息,就放行
    if (token) {
      next();// 放行
    } else {// 打回到登录页面
      next('/login');// 放行
    }

  } else {
    // 不需要验证,直接放行
    next()
  }
})


export default router
