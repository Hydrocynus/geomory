export class PlayerChamber {

  constructor() {
    this.players = []
  }

  addPlayer(...players) {
    for (let player of players) {
      const max = this.getMaxActiveIn()
      if (!!this.players.find(p => p.activeIn === player.activeIn)) player.activeIn = max+1
      this.players.push(player)
    }
    this.sort()
    this.removeOffset()
  }

  removePlayer(...players) {
    this.players = this.players.filter(p => !players.includes(p))
    this.sort()
  }

  sort() {
    this.players.sort((a, b) => a.activeIn - b.activeIn)
  }

  getActivePlayer() {
    return this.players.find(p => p.activeIn <= 0)
  }

  nextPlayer() {
    const max = Math.min(this.getMaxActiveIn(), this.players.length)
    const active = this.players.shift()
    // seaching next possible gap
    for (let i=1; i<=max+1; i++) {
      if (!this.players[i-1] || this.players[i-1].activeIn > i) {
        active.activeIn = i
        break
      }
    }
    this.players.push(active)
    this.sort()
    this.removeOffset()
    return active
  }

  getMaxActiveIn() {
    const max = Math.max(...this.players.map(p => p.activeIn))
    return max === -Infinity ? 0 : max
  }

  removeOffset() {
    const offset = Math.min(...this.players.map(p => p.activeIn))
    this.players.forEach(p => p.activeIn -= offset)
  }
}