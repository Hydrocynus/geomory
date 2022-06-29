export class Player {
  static maxID = 0;

  constructor(name) {
    this.name = name;
    this.score = 0;
    this.id = Player.maxID++;
    this.activeIn = 0;
    this.score = 0;
  }

  addScore(score = 1) {
    this.score += score;
  }
}