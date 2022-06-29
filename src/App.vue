<template>
  <div>

      <nav>
        <router-link :to="{name:'home'}">Home <i class="fas fa-house"></i></router-link> | 
        <router-link :to="{name:'newgame'}">New Game <i class="fa-solid fa-gamepad"></i></router-link>

      <!-- <router-link to="/about">About</router-link> -->
      </nav>
    <router-view></router-view>
  </div>
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

body {
  background-color: #EEEDDE;
  color: #203239;
}

.btn {
  font-size: 1.5em;
  font-weight: bold;
  border-radius: 5px;
  padding: 5px;
  border: #203239 1px solid;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}

.btn:not(.disabled):hover {
  color: #141E27;
  border: #141E27 2px solid;
  padding: 4px;
}

.btn.disabled {
  color: #aaa;
  border: #aaa 1px solid;
  background-color: rgba(0,0,0,0.05)
}

.textInputContainer input{
  font-size: 1.3em;
  background-color: transparent;
  border-bottom: 1px solid #E0DDAA;
}

.textInputContainer input:focus {
  border-bottom: 1px solid #203239;
  outline: transparent;
  transition: all 0.2s ease-in-out;
}

.selectInputContainer select{
  font-size: 1em;
  background-color: transparent;
  border-bottom: 1px solid #E0DDAA;
}

.selectInputContainer select:focus {
  border-bottom: 1px solid #203239;
  outline: transparent;
  transition: all 0.2s ease-in-out;
}



</style>
