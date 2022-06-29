<script setup>
  import { ref } from 'vue'
  import { Player } from '@/classes/Player'
  import { PlayerChamber } from '@/classes/PlayerChamber'
  import router from '@/router';
import { computed } from '@vue/reactivity';

  const chamber = ref(new PlayerChamber())
  const cardCnt = ref(4)
  const maxPlayers = 10
  const setPlayers = computed(() => chamber.value.players.filter(player => player.name.length > 0))

  // const api = ""
  // const data = await (await fetch(api)).json()
  const data = [
    {id: 0, matches: 5, city: "Dortmund", url: "..."},
    {id: 1, matches: 2, city: "Essen", url: "..."},
    {id: 2, matches: 1, city: "Essen", url: "..."},
    {id: 3, matches: 4, city: "Dortmund", url: "..."},
    {id: 4, matches: 3, city: "Dortmund", url: "..."},
    {id: 5, matches: 0, city: "Dortmund", url: "..."},
    {id: 6, matches: 9, city: "Mülheim an der Ruhr", url: "..."},
    {id: 7, matches: 8, city: "Mülheim an der Ruhr", url: "..."},
    {id: 8, matches: 7, city: "Mülheim an der Ruhr", url: "..."},
    {id: 9, matches: 6, city: "Mülheim an der Ruhr", url: "..."},
    {id: 10, matches: 11, city: "Bochum", url: "..."},
    {id: 11, matches: 10, city: "Bochum", url: "..."},
  ]

  const cityFilter = ref('')
  const cards = computed(() => {
    const filtered = data.filter(c => !cityFilter.value || c.city === cityFilter.value)
    while (filtered.length > cardCnt.value) {
      const removed = filtered.pop()
      const pairIndex = filtered.findIndex(c => c.matches === removed.id)
      filtered.splice(pairIndex, 1)
    }
    return filtered
  })

  const cities = computed(() => data.map(c => c.city).filter((c, i, a) => a.indexOf(c) === i))

  function addPlayer() {
    if (chamber.value.players.length < maxPlayers) {
      const player = new Player('')
      chamber.value.addPlayer(player)
      focusLastInput()
    }
  }

  function removePlayer(player) {
    chamber.value.removePlayer(player)
    focusLastInput()
  }

  function focusLastInput() {
    setTimeout(() => document.querySelector(".playerDisplayDiv:last-of-type input")?.focus(), 0)
  }

  function submit() {
    const params = {
      players: JSON.stringify(setPlayers.value),
      cards: JSON.stringify(cards.value),
    }
    router.push({name: "game", params: params})
  }

  function inputPressed(event) {
    if (event.key.toLowerCase() === 'enter') {
      if (setPlayers.value.length < chamber.value.players.length) focusLastInput()
      else addPlayer()
    }
  }

  addPlayer()
  addPlayer()
  setTimeout(() => document.querySelector(".playerDisplayDiv:first-of-type input")?.focus(), 0)

</script>

<template>

  <h2 id="notEnoughPlayersMSG" v-if="chamber.players.length < 2">You gotta have at least two players, bro</h2>

  <h3>Cards: {{ cardCnt }}</h3>
  <input type="range" min="4" max="50" step="2" v-model.number="cardCnt" placeholder="Card Count" />
  <br>
  <label for="cityFilter">Filter: </label>
  <select id="cityFilter" v-model="cityFilter">
    <option value="" selected>ALL</option>
    <option v-for="city in cities" :value="city">{{ city }}</option>
  </select>
  <br>
  <br>
  <h3>Players: {{ chamber.players.length }} / {{ maxPlayers }}</h3>
  <div class="playerDisplayDiv" v-for="player in chamber.players">
    <input v-model.trim="player.name" placeholder="Playername" @keypress="inputPressed"/>
    <button @click="removePlayer(player)"><i class="fa-solid fa-user-minus"></i></button>
  </div>
  <button @click="addPlayer()">Add Player <i class="fa-solid fa-user-plus"></i></button>

  <br>
  <br>
    <button @click="submit()">Start Game <i class="fa-solid fa-location-arrow"></i></button>
</template>

<style>

</style>