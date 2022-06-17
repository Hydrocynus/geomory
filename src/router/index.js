import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../views/Menu.vue'
import NewGame from '../views/NewGame.vue'

const routes = [
  { path: '/', component: Menu },
  { path: '/newgame', component: NewGame },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
