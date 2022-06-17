import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../views/Menu.vue'

const routes = [
  { path: '/', component: Menu },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
