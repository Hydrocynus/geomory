<script setup>
  import { computed } from '@vue/reactivity';
  import { ref } from 'vue'

  const props = defineProps({ chamber: Array, cardCnt: Number })
  // const activePlayer = computed(() => props.chamber.find(c => c.active))

  console.debug(props, props.chamber, props.cardCnt)
</script>

<template>
  <div>
    <span>Active Player: {{ activePlayer }}</span>
  </div>
</template>

<style>
  
</style>