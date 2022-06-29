export class CardStack {

  constructor () {
    this.cards = [];
  }

  add (...cards) {
    for (let card of cards) {
      this.cards.push(card);
    }
  }

  remove (...cards) {
    this.cards = this.cards.filter(c => !cards.includes(c));
  }

  getVisibleCards () {
    return this.cards.filter(c => c.visible);
  }

  getHiddenCards () {
    return this.cards.filter(c => !c.visible);
  }

  getMatchedCards () {
    return this.cards.filter(c => c.matched);
  }

  getUnmatchedCards () {
    return this.cards.filter(c => !c.matched);
  }

  hideAll () {
    this.cards.forEach(c => c.visible = false);
  }

  view (card) {
    let scoreUp = false
    const visibles = this.getVisibleCards()
    if (visibles.length >= 2) {
      if (visibles[0].id === visibles[1].matches) {
        scoreUp = true
        visibles.forEach(c => c.matched = true)
      }
      this.hideAll()
    }
    card.visible = true
    return scoreUp
  }
}