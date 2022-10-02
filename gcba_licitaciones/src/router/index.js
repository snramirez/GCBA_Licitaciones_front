import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    component: () => import('../views/Pliego.vue')
  },
  {
    path: '/listpliego',
    name: 'ListPliego',
    component: () => import('../views/ListPliego.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/Test.vue')
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: () => import('../views/Statistic.vue')
  },
  {
    path: '/crudselects',
    name: 'Altas',
    component: () => import('../views/CrudSelects.vue')
  },
  {
    path: '/vistaTes',
    name: 'Vista',
    component: () => import('../views/Vista-test')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
