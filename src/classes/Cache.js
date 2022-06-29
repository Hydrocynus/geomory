import { CardStack } from "./CardStack"
import { PlayerChamber } from "./PlayerChamber"

export class Cache {
  static get settings () {
    console.debug("get settings", this.geomory.settings)
    return this.geomory.settings ?? {}
  }

  static get cardStack () {
    return this.geomory.cardStack ?? new CardStack()
  }

  static get playerChamber () {
    return this.geomory.playerChamber ?? new PlayerChamber()
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

  static set cardStack (cardStack) {
    const tmp = this.geomory;
    tmp.cardStack = cardStack;
    this.geomory = tmp;
  }

  static set playerChamber (playerChamber) {
    const tmp = this.geomory;
    tmp.playerChamber = playerChamber;
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