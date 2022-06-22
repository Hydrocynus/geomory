<script setup>
  import { ref } from 'vue'
  import { Player } from '@/classes/Player'
  import { PlayerChamber } from '@/classes/PlayerChamber'
  import router from '@/router';

  const chamber = ref(new PlayerChamber())
  const cardCnt = ref(4)
  const maxPlayers = 10

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
    setTimeout(() => {
      document.querySelector(".playerDisplayDiv:last-of-type input")?.focus()
    }, 0)
  }

  function submit() {
    chamber.value.players = chamber.value.players.filter(player => player.name.length > 0)
    router.push({path: "/game" ,cardCnt: cardCnt, chamber: chamber})
  }

  function inputPressed(event) {
    if (event.key.toLowerCase() === 'enter') {
      addPlayer()
    }
  }

  addPlayer()

</script>

<template>

  <h2 id="notEnoughPlayersMSG" v-if="chamber.players.length <= 0">You gotta have at least a single player, bro</h2>

  <h3>Cards: {{ cardCnt }}</h3>
  <input type="range" min="4" max="50" step="2" v-model.number="cardCnt" placeholder="Card Count" />

  <h3>Players: {{ chamber.players.length }} / {{ maxPlayers }}</h3>
  <div class="playerDisplayDiv" v-for="player in chamber.players">
    <input v-model.trim="player.name" placeholder="Playername" @keypress="inputPressed"/>
    <button @click="removePlayer(player)"><i class="fa-solid fa-user-minus"></i></button>
  </div>
  <button @click="addPlayer()">Add Player <i class="fa-solid fa-user-plus"></i></button>

  <br />
    <button @click="submit()">Start Game <i class="fa-solid fa-location-arrow"></i></button>
</template>

<style>

</style>