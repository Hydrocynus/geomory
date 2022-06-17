export class PlayerChamber {


  constructor() {
    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(player) {
    this.players = this.players.filter(p => p.id !== player.id);
  }

  getActivePlayer() {
    return this.players.find(player => player.active === 1);
  }
}

