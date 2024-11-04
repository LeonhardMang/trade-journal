import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/Orders.vue')
    },
    {
      path: '/trades',
      name: 'trades',
      component: () => import('../views/Trades.vue')
    },
    {
      path: '/opentrades',
      name: 'opentrades',
      component: () => import('../views/OpenTrades.vue')
    }
  ]
})

export default router
