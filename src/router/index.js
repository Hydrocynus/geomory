import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../views/Menu.vue'
import NewGame from '../views/NewGame.vue'
import Game from '../views/Game.vue'

const routes = [
  { path: '/', component: Menu },
  { path: '/newgame', component: NewGame },
  { path: '/game', component: Game },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
