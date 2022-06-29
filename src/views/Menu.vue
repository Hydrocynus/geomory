<script setup>
  import { ref } from 'vue'

  const data = ref([0,1,2,3,6,5])
</script>

<template>

    <router-link to="/newgame"> New Game <i class="fa-solid fa-gamepad"> </i> 
    </router-link> 

    <br>
    <br>

    <router-link to="/continuegame"> Continue Game <i class="fa-solid fa-play"> </i>

    </router-link> 
</template>

<style>

</style>