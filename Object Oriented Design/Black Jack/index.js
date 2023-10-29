const Suit = {
  Club: 0,
  Diamond: 1,
  Heart: 2,
  Spade: 3,
  getSuitFromValue: (value) => {
    switch (value) {
      case 0:
        return "Club";
      case 1:
        return "Diamond";
      case 2:
        return "Heart";
      case 3:
        return "Spade";
      default:
        return null;
    }
  },
};

class Card {
  constructor(faceValue, suit) {
    this.faceValue = faceValue; // Will be number
    this.suit = suit;
  }
  value() {} // We can leave this empty, as different games have different value systems.
}

class Deck {
  constructor() {
    this.cards = [];
    this.dealtIndex = 0; // marks first undealt card
  }
  setDeckOfCards(deckOfCards) {
    this.cards = deckOfCards;
  }
  randomInt(n) {
    return Math.round(Math.random() * n);
  }
  randomIntInRange(min, max) {
    return this.randomInt(max + 1 - min) + min;
  }
  shuffle() {
    for (let i = 0; i < this.cards.length; i++) {
      let j = this.randomIntInRange(i, this.cards.length - i - 1);

      let card1 = this.cards[i];
      let card2 = this.cards[j];

      this.cards[i] = card2;
      this.cards[j] = card1;
    }
  }
  remainingCards() {
    return this.cards.length - this.dealtIndex;
  }
  dealCard() {
    if (this.remainingCards() === 0) return null;

    const card = this.cards[this.dealtIndex];
    this.dealtIndex++;
    return card;
  }
  dealHand(number) {
    if (this.remainingCards() < number) return null;

    const hand = [];
    let count = 0;
    while (count < number) {
      const card = this.dealCard();
      if (card) {
        hand[count] = card;
        count++;
      }
    }

    return hand;
  }
}

class Hand {
  constructor() {
    this.cards = [];
  }
  score() {
    let score = 0;
    for (const card of this.cards) {
      score += card.value();
    }
    return score;
  }
  addCard(card) {
    this.cards.push(card);
  }
  discardHand() {
    this.cards = [];
  }
}

class BlackJackHand extends Hand {
  // Return highest possible score under 21, or the
  // lowest possible score over 21.
  score() {
    const scores = this.possibleScores();
    let maxUnder = Number.NEGATIVE_INFINITY;
    let minOver = Number.POSITIVE_INFINITY;
    for (const score of scores) {
      if (score > 21 && score < minOver) {
        minOver = score;
      } else if (score <= 21 && score > maxUnder) {
        maxUnder = score;
      }
    }
    return maxUnder == Number.NEGATIVE_INFINITY ? minOver : maxUnder;
  }
  // return array of all possible scores (ace as both 1 and 11)
  possibleScores() {
    const scores = [];
    if (this.cards.length === 0) return scores;
    for (const card of this.cards) this.addCardToScoreList(card, scores);
    return scores;
  }
  addCardToScoreList(card, scores) {
    if (scores.length == 0) scores.push(0);

    const length = scores.length;
    for (let i = 0; i < length; i++) {
      const score = scores[i];
      scores[i] = score + card.minValue();
      if (card.minValue() !== card.maxValue())
        scores.push(score + card.maxValue());
    }
  }
  busted() {
    return this.score() > 21;
  }
  is21() {
    return this.score() === 21;
  }
  isBlackJack() {
    if (this.cards.length !== 2) return false;

    const first = this.cards[0];
    const second = this.cards[1];
    return (
      (first.isAce() && second.isFaceCard()) ||
      (second.isAce() && first.isFaceCard())
    );
  }
}

class BlackJackCard extends Card {
  constructor(faceValue, suit) {
    super(faceValue, suit);
  }
  value() {
    if (this.isAce()) {
      return 1;
    } else if (this.isFaceCard()) {
      // Face cards in BJ always worth 10.
      return 10;
    } else {
      // Number card
      return this.faceValue;
    }
  }
  minValue() {
    if (this.isAce()) return 1;
    else return this.value();
  }
  maxValue() {
    if (this.isAce()) return 11;
    else return this.value();
  }
  isAce() {
    return this.faceValue === 1;
  }
  isFaceCard() {
    return this.faceValue >= 11 && this.faceValue <= 13;
  }
}

// _________ _______  _______ _________   _______  _______  _______  _______  _______
// \__   __/(  ____ \(  ____ \\__   __/  (  ____ \(  ___  )(  ____ \(  ____ \(  ____ \
//    ) (   | (    \/| (    \/   ) (     | (    \/| (   ) || (    \/| (    \/| (    \/
//    | |   | (__    | (_____    | |     | |      | (___) || (_____ | (__    | (_____
//    | |   |  __)   (_____  )   | |     | |      |  ___  |(_____  )|  __)   (_____  )
//    | |   | (            ) |   | |     | |      | (   ) |      ) || (            ) |
//    | |   | (____/\/\____) |   | |     | (____/\| )   ( |/\____) || (____/\/\____) |
//    )_(   (_______/\_______)   )_(     (_______/|/     \|\_______)(_______/\_______)
//                             ____       _
//                             |  _ \     | |
//                             | |_) | ___| | _____      __
//                             |  _ < / _ \ |/ _ \ \ /\ / /
//                             | |_) |  __/ | (_) \ V  V /
//                             |____/ \___|_|\___/ \_/\_/
//                         ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

//                          ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

//                          ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

mocha.setup("bdd");
const { assert } = chai;

describe("Deck", () => {
  it("shuffle() changes the order of the deck", () => {
    let cards = [];
    for (let i = 1; i <= 13; i++) {
      for (let j = 0; j <= 3; j++) {
        let suit = Suit.getSuitFromValue(j);
        let card = new BlackJackCard(i, suit);
        cards.push(card);
      }
    }

    const d = new Deck();
    d.setDeckOfCards(cards);
    assert.equal(
      d.cards.map((c) => c.faceValue).join(""),
      "11112222333344445555666677778888999910101010111111111212121213131313"
    );
    d.shuffle();
    assert.equal(
      d.cards.map((c) => c.faceValue).join("") ===
        "11112222333344445555666677778888999910101010111111111212121213131313",
      false
    );
  });
  it("dealCard() returns card from deck and does not deal card that has already been dealt", () => {
    const oneOfClubs = new Card(1, "Club");
    const twoOfClubs = new Card(2, "Club");
    const threeOfClubs = new Card(3, "Club");
    const deckOfCards = [oneOfClubs, threeOfClubs, twoOfClubs];

    const d = new Deck();
    d.setDeckOfCards(deckOfCards);

    const dealtCards = [];
    dealtCards.push(d.dealCard());
    dealtCards.push(d.dealCard());
    dealtCards.push(d.dealCard());

    assert.equal(dealtCards.length, 3);
    assert.equal(dealtCards.includes(oneOfClubs), true);
    assert.equal(dealtCards.includes(twoOfClubs), true);
    assert.equal(dealtCards.includes(threeOfClubs), true);
  });
  it("dealCard() returns falsy value if deck is empty", () => {
    const oneOfClubs = new Card(1, "Club");
    const deckOfCards = [oneOfClubs];

    const d = new Deck();
    d.setDeckOfCards(deckOfCards);

    const dealtCards = [];
    dealtCards.push(d.dealCard());
    assert.equal(!!d.dealCard(), false);
  });
  it("dealHand() returns falsy value if not enough cards in deck", () => {
    const oneOfClubs = new Card(1, "Club");
    const twoOfClubs = new Card(2, "Club");
    const threeOfClubs = new Card(3, "Club");
    const deckOfCards = [oneOfClubs, threeOfClubs, twoOfClubs];

    const d = new Deck();
    d.setDeckOfCards(deckOfCards);

    assert.equal(!!d.dealHand(4), false);
  });
  it("dealHand() returns array of cards of specified length", () => {
    const oneOfClubs = new Card(1, "Club");
    const twoOfClubs = new Card(2, "Club");
    const threeOfClubs = new Card(3, "Club");
    const deckOfCards = [oneOfClubs, threeOfClubs, twoOfClubs];

    const d = new Deck();
    d.setDeckOfCards(deckOfCards);
    const hand = d.dealHand(2);
    assert.equal(hand.length, 2);
  });
});

describe("BlackJackCard", () => {
  it("value() correctly values face cards as 10", () => {
    const kingOfClubs = new BlackJackCard(11, "Club");
    const queenOfClubs = new BlackJackCard(12, "Club");
    const jackOfClubs = new BlackJackCard(13, "Club");

    assert.equal(kingOfClubs.value(), 10);
    assert.equal(queenOfClubs.value(), 10);
    assert.equal(jackOfClubs.value(), 10);
  });
});

describe("BlackJackHand", () => {
  it("score() correctly values aces as 1 or 11s", () => {
    const queenOfClubs = new BlackJackCard(12, "Club");
    const aceOfClubs = new BlackJackCard(1, "Club");

    const bjh = new BlackJackHand();

    bjh.addCard(queenOfClubs);
    assert.equal(bjh.score(), 10);
    bjh.addCard(aceOfClubs);
    assert.equal(bjh.score(), 21);

    bjh.discardHand();

    bjh.addCard(queenOfClubs);
    bjh.addCard(queenOfClubs);
    bjh.addCard(aceOfClubs);
    assert.equal(bjh.score(), 21);
  });
  it("busted() returns true if score is over 21", () => {
    const bjh = new BlackJackHand();

    bjh.addCard(new BlackJackCard(12, "Club"));
    assert.equal(bjh.busted(), false);
    bjh.addCard(new BlackJackCard(12, "Club"));
    assert.equal(bjh.busted(), false);
    bjh.addCard(new BlackJackCard(12, "Club"));
    assert.equal(bjh.busted(), true);
  });
  it("is21() returns true if score is 21", () => {
    const bjh = new BlackJackHand();

    bjh.addCard(new BlackJackCard(12, "Club"));
    assert.equal(bjh.is21(), false);
    bjh.addCard(new BlackJackCard(5, "Club"));
    bjh.addCard(new BlackJackCard(6, "Club"));
    assert.equal(bjh.is21(), true);
  });
  it("isBlackJack() returns true for black jack (a count of 21 in two cards)", () => {
    const queenOfClubs = new BlackJackCard(12, "Club");
    const aceOfClubs = new BlackJackCard(1, "Club");

    const bjh = new BlackJackHand();

    bjh.addCard(queenOfClubs);
    bjh.addCard(aceOfClubs);
    assert.equal(bjh.isBlackJack(), true);

    bjh.addCard(queenOfClubs);
    assert.equal(bjh.isBlackJack(), false);
  });
});

mocha.run();
