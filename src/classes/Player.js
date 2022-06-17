export class Player {
  static maxID = 0;
  static players = [];

  constructor(name) {
    this.name = name;
    this.score = 0;
    this.id = Player.maxID++;
    this.active = 0;
    Player.players.push(this);
  }

  static getActivePlayer() {
    return Player.players.find(player => player.active === 1);
  }
}