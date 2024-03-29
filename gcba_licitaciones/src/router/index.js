import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }, 
  {
    path: '/addpliego',
    name: 'Pliego',
    component: () => import('../views/Pliego.vue'),
    meta: {protectedRoute : true}
  },
  {
    path: '/listpliego',
    name: 'ListPliego',
    component: () => import('../views/ListPliego.vue'),
    meta: {protectedRoute : true}
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/Test.vue')
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: () => import('../views/Statistic.vue'),
    meta: {protectedRoute : true}
  },
  {
    path: '/crudselects',
    name: 'Altas',
    component: () => import('../views/CrudSelects.vue'),
    meta: {protectedRoute : true}
  },
  {
    path: '/crudselectService',
    name: 'Altas Servicios',
    component: () => import('../views/CrudSelectService.vue'),
    meta: {protectedRoute : true}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LogIn.vue'),
    meta: {hideForAuth : true}
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {hideForAuth : true}

  },
  {
    path: '/vistaTest',
    name: 'Vista',
    component: () => import('../views/Vista-test')
  },
  {
    path: '/listservice',
    name: 'ListService',
    component: () => import('../views/ListPliegoServicios.vue'),
    meta: {protectedRoute : true}
  },
  {
    path: '/addpliegoservice',
    name: 'Pliego Service',
    component: () => import('../views/PliegoService.vue'),
    meta: {protectedRoute : true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.protectedRoute){
    if(store.getters['auth/authUser']){
      next()
    }
    else{
      next('/login')
    }
  }
  else if(to.meta.hideForAuth){
    if(store.getters['auth/authUser']){
      next('/')
    }
    else{
      next()
    }
  }
  else {
    next()
  }
})

export default router
