<template>
  <nav>
    <router-link to="/">Home <i class="fas fa-house"></i></router-link> | 
    <router-link to="/newgame">New Game <i class="fa-solid fa-gamepad"></i></router-link>

    <!-- <router-link to="/about">About</router-link> -->
  </nav>
  <router-view></router-view>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
