export class Card {
  static maxID = 0;

  constructor (url, city, matches, id) {
    this.id = id ?? Card.maxID +1;
    Card.maxID = Math.max(Card.maxID, this.id);
    this.matches = matches;
    this.url = url;
    this.city = city;
    this.visible = false;
    this.matched = false;
  }
}