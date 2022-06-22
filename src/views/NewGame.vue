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
      console.debug(player, chamber.players)
    }
  }

  function removePlayer(player) {
    chamber.value.removePlayer(player)
    console.debug(player, chamber.players)
  }


  function submit() {
    chamber.value.players = chamber.value.players.filter(player => player.name.length > 0)

    if (chamber.value.players.length < maxPlayers) {
      document.getElementById("notEnoughPlayersMSG").style.display = "block"
      return
    }

    router.push({path: "/game" ,cardCnt: cardCnt, chamber: chamber})

  }

</script>

<template>

  <h2 id="notEnoughPlayersMSG" style="display: none">You gotta have at least a single player, bro</h2>

  <h3>Cards: {{ cardCnt }}</h3>
  <input type="range" min="4" max="50" step="2" v-model.number="cardCnt" placeholder="Card Count" />

  <h3>Players: {{ chamber.players.length }} / {{ maxPlayers }}</h3>
  <button @click="addPlayer()">Add Player <i class="fa-solid fa-user-plus"></i></button>
  <div class="playerDisplayDiv" v-for="player in chamber.players">
    <input v-model.trim="player.name" placeholder="Playername"/>
    <button @click="removePlayer(player)"><i class="fa-solid fa-user-minus"></i></button>
  </div>

  <br />
    <button @click="submit()">Start Game <i class="fa-solid fa-location-arrow"></i></button>
</template>

<style>

</style>