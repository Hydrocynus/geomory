<template>
  <nav>
    <router-link :to="{name:'home'}">Home <i class="fas fa-house"></i></router-link> | 

    <!-- <router-link to="/about">About</router-link> -->
  </nav>
  <router-view></router-view>
</template>

<style>
@import './assets/base.css';

* {
  margin: 0;
  padding: 0;
  border: 0;
  background-color: unset;
  color: unset;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: unset;
    text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
