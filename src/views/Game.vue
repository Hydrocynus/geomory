<script setup>
  import { Card } from '@/classes/Card';
  import { CardStack } from '@/classes/CardStack';
  import { Player } from '@/classes/Player'
  import { PlayerChamber } from '@/classes/PlayerChamber'
  import { computed } from '@vue/reactivity'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const players = JSON.parse(route.params.players || "[]")
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

  const cards = JSON.parse(route.params.cards || "[]")
  const stack = ref(new CardStack())
  stack.value.add(...cards.map(c => new Card(c.url, c.city, c.matches, c.id)))

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

  const nextAvailable = computed(() => stack.value.getVisibleCards().length >= 2)
</script>

<template>
  <div>
    <h2>Players</h2>
    <div id="players">
      <div class="player" v-for="player in chamber.players">
        <span class="active" v-if="activePlayer?.id === player.id">active:</span>
        <span class="name">{{ player.name }}</span>
        <span id="score">{{ player.score }} Points</span>
      </div>
    </div>
    <div id="board">
      <div :class="{card: true, visible: card.visible, matched: card.matched}" v-for="card in stack.cards" @click="view(card)">
        {{ card.city }} ({{ card.id }}:{{ card.matches }}) {{ card.visible ? 'visible' : 'hidden' }}; {{ card.matched ? 'matched' : 'unmatched' }}
      </div>
    </div>
    <div id="buttons">
      <button :class="{disabled: !nextAvailable, btn: true}" @click="next">next</button>
      <button class="btn" @click="reset">reset</button>
    </div>
  </div>
</template>

<style>

  /* players */

  #players {
    display: grid;
    justify-content: center;
    justify-items: stretch;
    margin-bottom: 20px;
  }

  #players .player {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  #players .player > * {
    padding: 2px 5px;
    text-align: right;
  }

  #players .player .active {
    grid-column: 1;
  }

  #players .player .name {
    grid-column: 2;
  }

  #players .player .score {
    grid-column: 3;
    text-align: left;
  }

  /* board */

  #board {
    display: grid;
    grid-template-columns: repeat(auto-fit, 120px);
    grid-gap: 10px;
    margin-bottom: 20px;
  }

  #board .card {
    border: 1px solid var(--color-border);
    aspect-ratio: 1;
  }
</style>