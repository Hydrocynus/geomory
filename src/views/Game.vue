<script setup>
  import { PlayerChamber } from '@/classes/PlayerChamber'
  import { computed } from '@vue/reactivity'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const players = JSON.parse(route.params.players || "[]")
  const chamber = ref(new PlayerChamber())
  chamber.value.addPlayer(...players)

  const activePlayer = computed(() => chamber.value.getActivePlayer())
</script>

<template>
  <div>
    <span>Active Player: {{ activePlayer?.name }}</span>
    <br>
    <br>
    <button @click="chamber.nextPlayer">next</button>
  </div>
</template>

<style>
  
</style>