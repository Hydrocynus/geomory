<script setup>
  import { computed } from '@vue/reactivity';


  const lS = computed(() =>localStorage.getItem("geomory"));
</script>

<template>

  <h1>Geomory</h1>
  <br>

  <img src="../assets/logo.svg"/>

  <br>
  <br>

    <router-link to="/newgame"> New Game <i class="fa-solid fa-gamepad"> </i> 
    </router-link> 

    <br>
    <br>


    <router-link to="/continuegame" v-if="ls != null"> Continue Game <i class="fa-solid fa-play"> </i>

    </router-link> 
</template>


<style>

/* https://colorhunt.co/palette/eeeddee0ddaa203239141e27 */

h1{
  color: #42b983;

}
img{
  width:225px;
}

</style>