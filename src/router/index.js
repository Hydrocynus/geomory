import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../views/Menu.vue'
import NewGame from '../views/NewGame.vue'
import Game from '../views/Game.vue'

const routes = [
  { path: '/', name: "home", component: Menu },
  { path: '/newgame', name: "newgame", component: NewGame },
  { path: '/game', name: "game", component: Game, props: true },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
