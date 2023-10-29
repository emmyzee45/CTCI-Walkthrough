class JigsawPiece {
  constructor(row, col) {
    this._position = { row: row, col: col };
    this.up = null;
    this.down = null;
    this.left = null;
    this.right = null;
  }
}

class JigsawPuzzle {
  constructor(N) {
    // An array of JigsawPiece Objects
    this.jigsawPieces = this.genPieces(N);
    this.N = N;
  }
  genPieces(N) {
    const array = [];
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        array.push(new JigsawPiece(i, j));
      }
    }
    //Shuffle
    array.sort(() => (Math.random() < 0.5 ? 1 : -1));
    return array;
  }
  fitsWith(piece1, piece2, direction) {
    if (!piece1 || !piece2) {
      return false;
    } else if (direction === "up") {
      return (
        piece1._position.row === piece2._position.row + 1 &&
        piece1._position.col === piece2._position.col
      );
    } else if (direction === "down") {
      return (
        piece1._position.row === piece2._position.row - 1 &&
        piece1._position.col === piece2._position.col
      );
    } else if (direction === "left") {
      return (
        piece1._position.row === piece2._position.row &&
        piece1._position.col === piece2._position.col + 1
      );
    } else if (direction === "right") {
      return (
        piece1._position.row === piece2._position.row &&
        piece1._position.col === piece2._position.col - 1
      );
    } else {
      throw "error, no direction";
    }
  }
  //Makes sure each piece's 4 pointers go to correct piece
  checkPiece(piece) {
    // If piece is in top row, and it's up pointer points to something, then piece is wrong.
    if (piece._position.row === 1 && piece.up) {
      return false;
      // match otherwise
    } else if (
      piece._position.row !== 1 &&
      !this.fitsWith(piece, piece.up, "up")
    ) {
      return false;
    }

    // If piece is in bottom row, and it's bottom pointer points to something, then piece is wrong.
    if (piece._position.row === this.N && piece.down) {
      return false;
      // match otherwise
    } else if (
      piece._position.row !== this.N &&
      !this.fitsWith(piece, piece.down, "down")
    ) {
      return false;
    }

    // If piece is in first col, and it's left pointer points to something, then piece is wrong.
    if (piece._position.col === 1 && piece.left) {
      return false;
      // match otherwise
    } else if (
      piece._position.col !== 1 &&
      !this.fitsWith(piece, piece.left, "left")
    ) {
      return false;
    }

    // If piece is in last col, and it's right pointer points to something, then piece is wrong.
    if (piece._position.col === this.N && piece.right) {
      return false;
      // match otherwise
    } else if (
      piece._position.col !== this.N &&
      !this.fitsWith(piece, piece.right, "right")
    ) {
      return false;
    }

    return true;
  }
  //Checks if puzzle is complete by going to every piece and making sure it's 4 pointers go to correct piece
  checkDone() {
    for (const piece of this.jigsawPieces) {
      if (!this.checkPiece(piece)) {
        return false;
      }
    }
    return true;
  }
  //Solves puzzle
  fitPuzzle() {
    for (const piece1 of this.jigsawPieces) {
      for (const piece2 of this.jigsawPieces) {
        // Check if piece1 fits piece2 in all 4 directions
        if (this.fitsWith(piece1, piece2, "up")) {
          piece1.up = piece2;
          piece2.down = piece1;
        } else if (this.fitsWith(piece1, piece2, "down")) {
          piece1.down = piece2;
          piece2.up = piece1;
        } else if (this.fitsWith(piece1, piece2, "left")) {
          piece1.left = piece2;
          piece2.right = piece1;
        } else if (this.fitsWith(piece1, piece2, "right")) {
          piece1.right = piece2;
          piece2.left = piece1;
        }
      }
    }
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

describe("Jigsaw", () => {
  it("fitsWith(piece1, piece2, direction) correctly checks that pieces fit together by returning true or false", () => {
    const topLeftPiece = new JigsawPiece(0, 0);
    const topRightPiece = new JigsawPiece(0, 1);
    const bottomLeftPiece = new JigsawPiece(1, 0);
    const bottomRightPiece = new JigsawPiece(1, 1);

    const jp = new JigsawPuzzle();

    assert.equal(jp.fitsWith(topLeftPiece, topRightPiece, "right"), true);
    assert.equal(jp.fitsWith(topLeftPiece, bottomLeftPiece, "down"), true);

    assert.equal(jp.fitsWith(topRightPiece, topLeftPiece, "left"), true);
    assert.equal(jp.fitsWith(topRightPiece, bottomRightPiece, "down"), true);

    assert.equal(jp.fitsWith(bottomLeftPiece, topLeftPiece, "up"), true);
    assert.equal(jp.fitsWith(bottomLeftPiece, bottomRightPiece, "right"), true);

    assert.equal(jp.fitsWith(bottomRightPiece, topRightPiece, "up"), true);
    assert.equal(jp.fitsWith(bottomRightPiece, bottomLeftPiece, "left"), true);

    assert.equal(jp.fitsWith(bottomRightPiece, bottomLeftPiece, "up"), false);
  });
});

mocha.run();
