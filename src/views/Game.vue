<script setup>
  import { Cache } from '@/classes/Cache';
import { Card } from '@/classes/Card';
  import { CardStack } from '@/classes/CardStack';
  import { Player } from '@/classes/Player'
  import { PlayerChamber } from '@/classes/PlayerChamber'
  import router from '@/router';
  import { computed } from '@vue/reactivity'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const players = JSON.parse(route.params.players || "null") || Cache.players
  const chamber = ref(new PlayerChamber())
  chamber.value.addPlayer(...players.map(p => {
    const player = new Player(p.name)
    p.score !== undefined    ? player.score    = p.score    : null
    p.id !== undefined       ? player.id       = p.id       : null
    p.activeIn !== undefined ? player.activeIn = p.activeIn : null
    p.score !== undefined    ? player.score    = p.score    : null
    return player
  }))
  const activePlayer = computed(() => chamber.value.getActivePlayer())
  const sortedPlayerList = computed(() => JSON.parse(JSON.stringify(chamber.value.players))
                                          .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0))

  const cards = JSON.parse(route.params.cards || "null") || Cache.cards
  const stack = ref(new CardStack())
  stack.value.add(...cards.map(c => new Card(c.url, c.city, c.matches, c.id)))
  setTimeout(() => {
    if (stack.value.cards.length <= 0) router.push({name: "newgame"})
  },0)

  function computeCardBackground (url) {
    return `background: url("${url}")`
  }

  function view(card) {
    if (stack.value.getVisibleCards().length >= 2) return
    card = stack.value.getCardById(card.id)
    stack.value.view(card) ? activePlayer.value.addScore() : null
  }

  function next() {
    if (stack.value.getVisibleCards().length < 2) return
    stack.value.hideAll()
    chamber.value.nextPlayer()
  }

  function reset() {
    stack.value.getMatchedCards().forEach(c => c.matched = false)
    chamber.value.players.forEach(p => p.score = 0)
  }

  const isNextAvailable = computed(() => stack.value.getVisibleCards().length >= 2)

  const gameover = computed(() => stack.value.getUnmatchedCards().length <= 0 && stack.value.cards.length > 0)
  const winners = computed(() => {
    const maxScore = Math.max(...chamber.value.players.map(p => p.score))
    return chamber.value.players.filter(p => p.score === maxScore)
  })
  const losers = computed(() => chamber.value.players.filter(p => !winners.value.includes(p)))
</script>

<template>
  <div id="wrapper">
    <div id="header">
      <div id="buttons">
        <router-link :to="{name:'home'}" id="home" class="btn"><i class="fa-solid fa-house"></i> Home</router-link>
        <button id="nextPlayer" :class="{disabled: !isNextAvailable, btn: true}" @click="next"><i class="fa-solid fa-arrow-right"></i> Next</button>
        <!-- <button id="reset" class="btn" @click="reset"><i class="fa-solid fa-rotate-left"></i> Reset</button> -->
      </div>
      <table id="players">
        <th colspan="3"><h2>Scoreboard</h2></th>
        <tr :class="{player: true, active: activePlayer?.id === player.id}" v-for="player in sortedPlayerList">
          <td class="active"><i class="fa-solid fa-chess-pawn"></i><span v-if="player.activeIn > 0">{{ player.activeIn }}</span></td>
          <td class="name">{{ player.name }}</td>
          <td class="score">Score: {{ player.score }}</td>
        </tr>
      </table>
    </div>
    <div id="board">
      <div :class="{card: true, visible: card.visible, matched: card.matched}" v-for="card in stack.cards" @click="view(card)" :style="computeCardBackground(card.url)">
        ({{ card.id }}:{{ card.matches }})
      </div>
      <div id="gameover" v-if="gameover">
        <h2>Game Over</h2>
        <h3 v-if="winners.length <= 0">No one wins! 🤨</h3>
        <h3 v-else-if="winners.length > 1">Tie! 😬</h3>
        <h3 v-else>{{ winners[0].name }} wins! 🥳</h3>
        <p v-if="winners.length > 1">{{ winners.map(p => p.name).join(" and ") }} are tied.</p>
        <p v-if="losers.length > 0">{{ losers.map(p => p.name).join(" and ") }} lose<span v-if="losers.length == 1">s</span>.</p>
      </div>
    </div>
  </div>
</template>

<style>

  /* header */

  #header {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    color: #203239;
  }

  #buttons {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
  }

  #buttons .btn {
    font-size: 1em;
    margin: 2.5px;
    padding: 2.5px;
    height: 2em;
  }

  #players {
    font-size: 1rem;
  }

  #players tr.active .name, tr.active td.active {
    color: #42b983 !important;
  }

  #players td.active {
    color: silver;
    font-size: 1.3em;
    text-align: center;
    width: 2em;
  }

  #players td.active span {
    font-size: .5em;
    vertical-align: middle;
    color: white;
    border-radius: 50%;
    background-color: silver;
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    margin-bottom: .5em;
  }

  #players tr:not(.active) td.active .svg-inline--fa {
    display: none;
  }

  #players .name {
    text-align: right;
  }

  #players .score {
    text-align: left;
    padding-right: 1em;
  }

  #players .score::before {
    content: "|";
    margin: 0 .25em;
  }

  /* board */

  #board {
    display: grid;
    grid-template-columns: repeat(auto-fit, 175px);
    grid-gap: 10px;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.15);
    padding: 15px 0;
    margin: 0 10px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.15);

    /* make scrollable */
    overflow-y: auto;
    overflow-x: hidden;
    max-height: calc(100vh - 125px);
  }


  #board .card {
    border: 2px solid var(--color-border);
    aspect-ratio: 1;
    color: rgba(0, 0, 0, 0.05);
    font-weight: bold;
    background-size: cover !important;
    border-radius: 5px;
    cursor: pointer;
  }

  #board .card:not(.visible) {
    background: url("@/assets/cardback.svg") !important;
  }

  #board .card.matched {
    visibility: hidden;
  }

  #gameover {

  }

  #gameover span.multi:not(:last-child)::after {
    content: " and ";
  }
</style>