class Minesweeper {
  constructor(n, b) {
    this.board = null;
    this.init(n, b);
  }
  init(N, B) {
    // Creates board with NO mines
    this.board = this.createBoard(N);
    this.insertBombs(B);
    // Have each cell now say how many mines it is adjacent to
    this.computeCells();
  }
  createBoard(N) {
    const board = [];
    for (let row = 1; row <= N; row++) {
      board.push([]);
    }
    for (const row of board) {
      for (let col = 1; col <= N; col++) {
        row.push({ isBomb: false, reveal: false, display: null });
      }
    }
    return board;
  }
  insertBombs(B) {
    let count = 0;
    const n = this.board.length;
    let row;
    let col;
    while (count < B) {
      row = Math.floor(Math.random() * n);
      col = Math.floor(Math.random() * n);
      if (!this.board[row][col].isBomb) {
        this.board[row][col].isBomb = true;
        count++;
      }
    }
  }
  check(row, col) {
    if (this.board[row][col].isBomb) {
      console.log(`boom! ${row}, ${col} is a mine`);
      this._printBoard();
    } else {
      this.explore(row, col);
      console.log("not bad! now check your next spot");
      this.printBoard();
    }
  }
  explore(row, col) {
    if (
      this.board[row] &&
      this.board[row][col] &&
      !this.board[row][col].isBomb &&
      !this.board[row][col].reveal
    ) {
      this.board[row][col].reveal = true;
      if (this.board[row][col].display === "0") {
        this.explore(row - 1, col - 1);
        this.explore(row - 1, col);
        this.explore(row - 1, col + 1);
        this.explore(row, col - 1);
        this.explore(row, col + 1);
        this.explore(row + 1, col - 1);
        this.explore(row + 1, col);
        this.explore(row + 1, col + 1);
      }
    }
  }
  computeCells() {
    const n = this.board.length;
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        this.computeCell(row, col, n);
      }
    }
  }
  computeCell(row, col, n) {
    if (this.board[row][col].isBomb) {
      this.board[row][col].display = "B";
      return;
    }
    let count = 0;
    // up row - 1, col
    if (row !== 0) {
      count += this.board[row - 1][col].isBomb ? 1 : 0;
    }
    // down row + 1, col
    if (row !== n - 1) {
      count += this.board[row + 1][col].isBomb ? 1 : 0;
    }
    // left row, col - 1
    if (col !== 0) {
      count += this.board[row][col - 1].isBomb ? 1 : 0;
    }
    // right row, col + 1
    if (col !== n - 1) {
      count += this.board[row][col + 1].isBomb ? 1 : 0;
    }
    // upleft row - 1, col - 1
    if (col !== 0 && row !== 0) {
      count += this.board[row - 1][col - 1].isBomb ? 1 : 0;
    }
    // upright row - 1, col + 1
    if (row !== 0 && col !== n - 1) {
      count += this.board[row - 1][col + 1].isBomb ? 1 : 0;
    }
    // downleft row + 1, col - 1
    if (row !== n - 1 && col !== 0) {
      count += this.board[row + 1][col - 1].isBomb ? 1 : 0;
    }
    // downright row + 1, col + 1
    if (row !== n - 1 && col !== n - 1) {
      count += this.board[row + 1][col + 1].isBomb ? 1 : 0;
    }
    this.board[row][col].display = count.toString();
  }
  _printBoard() {
    const n = this.board.length;
    for (let i = 0; i < n; i++) {
      console.log(
        this.board[i]
          .map((cell) => {
            return cell.display;
          })
          .join("|")
      );
    }
  }
  printBoard() {
    const n = this.board.length;
    for (let i = 0; i < n; i++) {
      console.log(
        this.board[i]
          .map((cell) => {
            return cell.reveal ? cell.display : "x";
          })
          .join("|")
      );
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

describe("Minesweeper", () => {
  //Since each board randomized, and we want same board to each test, create a static board
  //to use for test cases
  it("computeCells and check work as intended", () => {
    const ms = new Minesweeper(3, 3);
    ms.board = ms.createBoard(3);

    let displayVals = ms.board.map((subArr) => {
      return subArr.map((obj) => obj.display);
    });
    let revealVals = ms.board.map((subArr) => {
      return subArr.map((obj) => obj.reveal);
    });
    assert.equal(
      revealVals.join(""),
      "false,false,falsefalse,false,falsefalse,false,false"
    );
    // [
    //   [false, false, false],
    //   [false, false, false],
    //   [false, false, false]
    // ]

    //Set one bomb, in upper left hand corner
    ms.board[0][0].isBomb = true;
    ms.computeCells();
    displayVals = ms.board.map((subArr) => {
      return subArr.map((obj) => obj.display);
    });
    assert.equal(displayVals.join(""), "B,1,01,1,00,0,0");
    // [
    //   ["B", "1", "0"],
    //   ["1", "1", "0"],
    //   ["0", "0", "0"]
    // ]

    ms.check(2, 2);
    revealVals = ms.board.map((subArr) => {
      return subArr.map((obj) => obj.reveal);
    });
    assert.equal(
      revealVals.join(""),
      "false,true,truetrue,true,truetrue,true,true"
    );
    // [
    //   [false, true, true],
    //   [true, true, true],
    //   [true, true, true]
    // ]
  });
});

mocha.run();
