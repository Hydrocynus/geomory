<script setup>
  import { ref } from 'vue'
  import { Player } from '@/classes/Player'
  import { PlayerChamber } from '@/classes/PlayerChamber'

  const chamber = ref(new PlayerChamber())
  const cardCnt = ref(0)

  function addPlayer() {
    if (chamber.value.players.length < 10) {
      const player = new Player('')
      chamber.value.addPlayer(player)
      console.debug(player, chamber.players)
    }
  }

  function removePlayer(player) {
    chamber.value.removePlayer(player)
    console.debug(player, chamber.players)
  }

</script>

<template>
  <h3>Cards:</h3>
  <input v-model="cardCnt" placeholder="Card Count" />

  <h3>Players: {{ chamber.players.length }} / 10</h3>
  <button @click="addPlayer()"><i class="fa-solid fa-user-plus"></i></button>
  <div v-for="player in chamber.players">
    <input v-model="player.name" placeholder="Playername"/>
    <button @click="removePlayer(player)"><i class="fa-solid fa-user-minus"></i></button>
  </div>

  <br />
  <router-link :cardCnt="cardCnt" :chamber="chamber" to="/game">
    <button><i class="fa-solid fa-location-arrow"></i></button>
  </router-link>
</template>

<style>

</style>