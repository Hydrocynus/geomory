<script setup>
  import { Card } from '../components/Card.vue'
  import { ref } from 'vue'

  const data = ref([0,1,2,3,6,5])
</script>

<template>
  <div>
    <Card></Card>
    <span v-for="x in data"><span v-if="x % 2 === 0">{{ x }}</span></span>
  </div>
</template>

<style>

</style>