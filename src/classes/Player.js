export class Player {
  static maxID = 0;

  constructor(name) {
    this.name = name;
    this.score = 0;
    this.id = Player.maxID++;
    this.activeIn = 0;
  }
}