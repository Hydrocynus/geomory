<script setup>
  import { ref } from 'vue'
  import { Player } from '@/classes/Player'
  import { PlayerChamber } from '@/classes/PlayerChamber'
  import { Geo } from '@/classes/Geo'
  import router from '@/router';
  import { computed } from '@vue/reactivity';
  import { Cache } from '@/classes/Cache';

  const chamber = ref(new PlayerChamber())
  const cardCnt = ref(4)
  const maxPlayers = 10
  const setPlayers = computed(() => chamber.value.players.filter(player => player.name.length > 0))

  if (Cache.players !== []) {
    chamber.value = new PlayerChamber
    chamber.value.addPlayer(...Cache.players.map(p => {
      const player = new Player(p.name)
      p.score !== undefined    ? player.score    = p.score    : null
      p.id !== undefined       ? player.id       = p.id       : null
      p.activeIn !== undefined ? player.activeIn = p.activeIn : null
      p.score !== undefined    ? player.score    = p.score    : null
      return player
    }))
  }

  const data = Geo.location
  cardCnt.value = data.length

  const cityFilter = ref('')
  const cards = computed(() => {
    const filtered = data.filter(c => !cityFilter.value || c.city === cityFilter.value)
    while (filtered.length > cardCnt.value) {
      const removed = filtered.shuffle().pop()
      const pairIndex = filtered.findIndex(c => c.matches === removed.id)
      console.debug(pairIndex)
      filtered.splice(pairIndex, 1)
    }
    return filtered.shuffle()
  })

  const cities = computed(() => data.map(c => c.city).filter((c, i, a) => a.indexOf(c) === i))

  function addPlayer() {
    if (chamber.value.players.length < maxPlayers) {
      const player = new Player('')
      chamber.value.addPlayer(player)
      focusLastInput()
    }
    if (cardCnt.value < chamber.value.players.length *2) cardCnt.value = chamber.value.players.length *2
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

    Cache.settings = {
      cardCnt: cardCnt.value,
      cityFilter: cityFilter.value,
    }
    Cache.players = setPlayers.value
    Cache.cards = cards.value

    router.push({name: "game", params: params})
  }

  function inputPressed(event) {
    if (event.key.toLowerCase() === 'enter') {
      if (setPlayers.value.length < chamber.value.players.length) focusLastInput()
      else addPlayer()
    }
  }

  while (chamber.value.players.length < 2) addPlayer()
  setTimeout(() => document.querySelector(".playerInputContainer:first-of-type input")?.focus(), 0)

  const settings = Cache.settings
  cardCnt.value = settings?.cardCnt ?? cardCnt.value
  cityFilter.value = settings?.cityFilter ?? cityFilter.value

</script>

<template>

  <div class="gridContainer">
    <div class="gridItem">
      <h1>New Game</h1>
      <div class="cardPick">
        <h2>Cards: {{ cardCnt }}</h2>
        <input type="range" :min="chamber.players.length *2" :max="data.length" step="2" v-model.number="cardCnt" placeholder="Card Count" />
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
  height: 100vh;
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
  margin-bottom: 10px;
  padding: 0;
  font-size: 1.5em;
  font-weight: bold;
}

.cardPick input {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  accent-color: #203239;
}

.cardPick input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 50px;
  height: 50px;
  border: 0;
  background: url('../assets/logo.svg') no-repeat;
  cursor: pointer;
  box-shadow: none;
}


.cardPick input::-moz-range-thumb {
  width: 50px;
  height: 50px;
  border: 0;
  background: url('../assets/logo.svg') no-repeat;
  cursor: pointer;
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