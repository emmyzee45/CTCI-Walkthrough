const Direction = {
  left: "left",
  right: "right",
  up: "up",
  down: "down",
};

const Color = {
  White: "White",
  Black: "Black",
};

class Game {
  constructor() {
    this.ROWS = 10;
    this.COLUMNS = 10;
    this.board = new Board(ROWS, COLUMNS);
    this.players = new Player[2]();
    this.players[0] = new Player(Color.Black);
    this.players[1] = new Player(Color.White);
  }
  getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }
  getBoard() {
    return this.board;
  }
}

class Board {
  constructor(rows, columns) {
    this.board = []; // Board will be represented by Matrix
    this.blackCount = 0;
    this.whiteCount = 0;

    for (let i = 1; i <= rows; i++) {
      this.board.push([]);
    }
    for (const row of this.board) {
      for (let i = 1; i <= columns; i++) {
        row.push(null);
      }
    }
  }
  initialize() {
    /* initial board has a grid like the following in the center:
     *     BW
     *     WB
     */
    const evenRowLength = this.board.length % 2 === 0;
    const middleRow = evenRowLength
      ? this.board.length / 2 - 1
      : Math.floor(this.board.length / 2);

    const evenColumnLength = this.board[0].length % 2 === 0;
    const middleColumn = evenColumnLength
      ? this.board[0].length / 2 - 1
      : Math.floor(this.board[0].length / 2);

    this.board[middleRow][middleColumn] = new Piece(Color.Black);
    this.board[middleRow + 1][middleColumn] = new Piece(Color.White);
    this.board[middleRow + 1][middleColumn + 1] = new Piece(Color.Black);
    this.board[middleRow][middleColumn + 1] = new Piece(Color.White);
    this.blackCount = 2;
    this.whiteCount = 2;
  }
  placeColor(row, column, color) {
    if (this.board[row][column] instanceof Piece) {
      return false;
    }

    /* attempt to flip each of the four directions */
    const results = [];
    results[0] = this.flipSection(row - 1, column, color, Direction.up);
    results[1] = this.flipSection(row + 1, column, color, Direction.down);
    results[2] = this.flipSection(row, column + 1, color, Direction.right);
    results[3] = this.flipSection(row, column - 1, color, Direction.left);

    /* compute how many pieces were flipped */
    let flipped = 0;
    for (const result of results) {
      if (result > 0) {
        flipped += result;
      }
    }

    /* if nothing was flipped, then it's an invalid move */
    if (flipped < 0) {
      return false;
    }

    /* flip the piece, and update the score */
    this.board[row][column] = new Piece(color);
    this.updateScore(color, flipped + 1);
    return true;
  }
  flipSection(row, column, color, d) {
    /* Compute the delta for the row and the column. At all times, only the row or the column
     * will have a delta, since we're only moving in one direction at a time.
     */
    let r = 0;
    let c = 0;
    switch (d) {
      case Direction.up:
        r = -1;
        break;
      case Direction.down:
        r = 1;
        break;
      case Direction.left:
        c = -1;
        break;
      case Direction.right:
        c = 1;
        break;
    }

    /* If out of bounds, or nothing to flip, return an error (-1) */
    if (
      row < 0 ||
      row >= this.board.length ||
      column < 0 ||
      column >= this.board[row].length ||
      this.board[row][column] == null
    ) {
      return -1;
    }

    /* Found same color - return nothing flipped */
    if (this.board[row][column].getColor() === color) {
      return 0;
    }

    /* Recursively flip the remainder of the row. If -1 is returned, then we know we hit the boundary
     * of the row (or a null piece) before we found our own color, so there's nothing to flip. Return
     * the error code.
     */
    const flipped = this.flipSection(row + r, column + c, color, d);
    if (flipped < 0) {
      return -1;
    }

    /* flip our own color */
    this.board[row][column].flip();
    return flipped + 1;
  }
  getScoreForColor(c) {
    if (c == Color.Black) {
      return this.blackCount;
    } else {
      return this.whiteCount;
    }
  }
  updateScore(newColor, newPieces) {
    /* If we added x pieces of a color, then we actually removed x - 1 pieces of the other
     * color. The -1 is because one of the new pieces was the just-placed one.
     */
    if (newColor === Color.Black) {
      this.whiteCount -= newPieces - 1;
      this.blackCount += newPieces;
    } else {
      this.blackCount -= newPieces - 1;
      this.whiteCount += newPieces;
    }
  }
}

class Piece {
  constructor(c) {
    this.color = c;
  }
  flip() {
    if (this.color == Color.Black) {
      this.color = Color.White;
    } else {
      this.color = Color.Black;
    }
  }
  getColor() {
    return this.color;
  }
}

class Player {
  constructor(c) {
    this.color = c;
  }
  getScore() {
    return Game.getInstance().getBoard().getScoreForColor(color);
  }
  playPiece(row, column) {
    return Game.getInstance().getBoard().placeColor(row, column, color);
  }
  getColor() {
    return this.color;
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

describe("Othello", () => {
  it("Board has correct starting position for first 4 pieces", () => {
    const b = new Board(8, 8);
    b.initialize();

    assert.equal(b.board[3][3].color, Color.Black);
    assert.equal(b.board[3][4].color, Color.White);
    assert.equal(b.board[4][3].color, Color.White);
    assert.equal(b.board[4][4].color, Color.Black);
  });

  it("Board has correct pieces at correct positions after two moves made", () => {
    const b = new Board(8, 8);
    b.initialize();

    b.placeColor(5, 3, Color.Black);
    b.placeColor(3, 2, Color.White);

    assert.equal(b.board[3][2].color, Color.White);
    assert.equal(b.board[3][3].color, Color.White);
    assert.equal(b.board[3][4].color, Color.White);

    assert.equal(b.board[4][3].color, Color.Black);
    assert.equal(b.board[4][4].color, Color.Black);

    assert.equal(b.board[5][3].color, Color.Black);
  });
});

mocha.run();
