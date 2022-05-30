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
    path: '/graph',
    name: 'graph',
    component: () => import('../views/Graph.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
