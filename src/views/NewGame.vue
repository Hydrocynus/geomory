<script setup>
  import { ref } from 'vue'
  import { Player } from '@/classes/Player'
  import { PlayerChamber } from '@/classes/PlayerChamber'
  import router from '@/router';
import { computed } from '@vue/reactivity';

  const chamber = ref(new PlayerChamber())
  const cardCnt = ref(4)
  const maxPlayers = 10
  const setPlayers = computed(() => chamber.value.players.filter(player => player.name.length > 0))

  // const api = ""
  // const data = await (await fetch(api)).json()
  const data = [
    {id: 0, matches: 5, city: "Dortmund", url: "..."},
    {id: 1, matches: 2, city: "Essen", url: "..."},
    {id: 2, matches: 1, city: "Essen", url: "..."},
    {id: 3, matches: 4, city: "Dortmund", url: "..."},
    {id: 4, matches: 3, city: "Dortmund", url: "..."},
    {id: 5, matches: 0, city: "Dortmund", url: "..."},
    {id: 6, matches: 9, city: "Mülheim an der Ruhr", url: "..."},
    {id: 7, matches: 8, city: "Mülheim an der Ruhr", url: "..."},
    {id: 8, matches: 7, city: "Mülheim an der Ruhr", url: "..."},
    {id: 9, matches: 6, city: "Mülheim an der Ruhr", url: "..."},
    {id: 10, matches: 11, city: "Bochum", url: "..."},
    {id: 11, matches: 10, city: "Bochum", url: "..."},
  ]

  const cityFilter = ref('')
  const cards = computed(() => {
    const filtered = data.filter(c => !cityFilter.value || c.city === cityFilter.value)
    while (filtered.length > cardCnt.value) {
      const removed = filtered.pop()
      const pairIndex = filtered.findIndex(c => c.matches === removed.id)
      filtered.splice(pairIndex, 1)
    }
    return filtered
  })

  const cities = computed(() => data.map(c => c.city).filter((c, i, a) => a.indexOf(c) === i))

  function addPlayer() {
    if (chamber.value.players.length < maxPlayers) {
      const player = new Player('')
      chamber.value.addPlayer(player)
      focusLastInput()
    }
  }

  function removePlayer(player) {
    chamber.value.removePlayer(player)
    focusLastInput()
  }

  function focusLastInput() {
    setTimeout(() => document.querySelector(".playerInputContainer:last-of-type input")?.focus(), 0)
  }

  function submit() {
    if (setPlayers.value.length < 2) return
    const params = {
      players: JSON.stringify(setPlayers.value),
      cards: JSON.stringify(cards.value),
    }
    router.push({name: "game", params: params})
  }

  function inputPressed(event) {
    if (event.key.toLowerCase() === 'enter') {
      if (setPlayers.value.length < chamber.value.players.length) focusLastInput()
      else addPlayer()
    }
  }

  addPlayer()
  addPlayer()
  setTimeout(() => document.querySelector(".playerInputContainer:first-of-type input")?.focus(), 0)

</script>

<template>

  <div class="gridContainer">
    <div class="gridItem">
      <div class="cardPick">
        <h2>Cards: {{ cardCnt }}</h2>
        <input type="range" min="4" max="50" step="2" v-model.number="cardCnt" placeholder="Card Count" />
      </div>
      <div class="cityPick selectInputContainer">
        <label for="cityFilter">City: </label>
        <select tabindex="0" id="cityFilter" v-model="cityFilter">
          <option value="" selected>ALL</option>
          <option v-for="city in cities" :value="city">{{ city }}</option>
        </select>
      </div>
      <div class="playerPick">
        <h3 id="notEnoughPlayersMSG" v-if="chamber.players.length < 2">You gotta have at least two players</h3>
        <h2>Players: {{ chamber.players.length }} / {{ maxPlayers }}</h2>
        <div class="playerInputContainer textInputContainer" v-for="player in chamber.players">
            <input tabindex="1"  v-model.trim="player.name" placeholder="Playername" @keypress="inputPressed"/>
            <button class="btn" @click="removePlayer(player)"><i class="fa-solid fa-user-minus"></i></button>
        </div>
      </div>
      <div class="bottomButtons">
        <button class="btn" @click="addPlayer()">Add Player <i class="fa-solid fa-user-plus"></i></button>
        <button :class="{btn: true, disabled: setPlayers.length < 2}" @click="submit()">Start Game <i class="fa-solid fa-location-arrow"></i></button>
      </div>
        </div>
  </div>
</template>

<style>

/* https://colorhunt.co/palette/eeeddee0ddaa203239141e27 */

.gridContainer {
  grid-template-columns: 25% auto 25%;
  display: grid;
  align-items: center;
  justify-content: center;
} 

.gridItem {
  grid-column-start: 2;
}

.cardPick {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.cardPick h2 {
  margin: 0;
  padding: 0;
  font-size: 1.5em;
  font-weight: bold;
}

.cardPick input {
  width: 100%;
}

.cityPick {
  font-size: 1.3em;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  margin: 10px 0;
}

.cityPick label {
  margin-right: 10px;
}

.playerPick #notEnoughPlayersMSG {
  color: red;
  font-size: 1.2em;
  font-weight: bolder;
  margin-bottom: 10px;
}

.playerInputContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  margin-bottom: 10px;
  gap: 20px;
}

.bottomButtons {
  display: grid;
  justify-items: stretch;
  justify-content: stretch;
  margin-top: 20px;
  gap: 10px;
}



</style>