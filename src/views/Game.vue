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
    stack.value.view(card) ? activePlayer.value.addScore() : null
  }

  function next() {
    stack.value.hideAll()
    chamber.value.nextPlayer()
  }

</script>

<template>
  <div>
    <span>Active Player: {{ activePlayer?.name }}</span>
    <br>
    <div id="board">
      <div class="card" v-for="card in cards" @click="view(card)">
        {{ card.city }} ({{ card.id }}:{{ card.matches }}) {{ card.visible ? 'visible' : 'hidden' }}; {{ card.matched ? 'matched' : 'unmatched' }}
      </div>
    </div>
    <br>
    <button @click="next">next</button>
  </div>
</template>

<style>
  
</style>