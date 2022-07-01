export class Cache {
  static get settings () {
    console.debug("get settings", this.geomory.settings)
    return this.geomory.settings ?? {}
  }

  static get cards () {
    return this.geomory.cards ?? []
  }

  static get players () {
    return this.geomory.players ?? []
  }

  // --- //

  static set settings (settings) {
    console.debug('set settings', settings)
    const tmp = this.geomory;
    console.debug("tmp", tmp)
    tmp.settings = settings;
    console.debug("tmp", tmp)
    this.geomory = tmp;
  }

  static set cards (cards) {
    const tmp = this.geomory;
    tmp.cards = cards;
    this.geomory = tmp;
  }

  static set players (players) {
    const tmp = this.geomory;
    tmp.players = players;
    this.geomory = tmp;
  }

  // --- //

  static get geomory () {
    return JSON.parse(localStorage.getItem('geomory') ?? "{}")
  }

  static set geomory (geomory) {
    localStorage.setItem('geomory', JSON.stringify(geomory ?? {}))
  }
}