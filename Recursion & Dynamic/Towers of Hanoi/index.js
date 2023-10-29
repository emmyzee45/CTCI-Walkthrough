/* 
Write code that implements and solves the Tower of Hanoi
*/

class Tower {
  constructor(i) {
    this.disks = new Stack(); // Stack of Integers
    this.index = i;
  }
  add(d) {
    if (!this.disks.isEmpty() && this.disks.peek() <= d) {
      //We cannot put a larger disk over a smaller disk
      throw "Error placing disk " + d;
    } else {
      this.disks.push(d);
    }
  }
  moveTopTo(tower) {
    const top = this.disks.pop();
    tower.add(top);
  }
  moveDisks(n, destinationTower, bufferTower) {
    if (n > 0) {
      this.moveDisks(n - 1, bufferTower, destinationTower);
      console.log(
        `Move Disk ${this.disks.peek()} from Tower ${this.index} to Tower ${
          destinationTower.index
        }`
      );
      this.moveTopTo(destinationTower);
      bufferTower.moveDisks(n - 1, destinationTower, this);
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

describe("Towers of Hanoi", () => {
  it("No errors thrown", () => {
    // throw "We have a problem houston"
    const n = 3;
    const towers = [];

    // Create 3 towers
    for (let i = 0; i < 3; i++) {
      towers[i] = new Tower(i);
    }

    // Create 3 disks and put them on Tower 0
    for (let i = n - 1; i >= 0; i--) {
      towers[0].add(i);
    }

    // Begin process of moving disks from Tower 0 to Tower 2
    towers[0].moveDisks(3, towers[2], towers[1]);
  });
});

mocha.run();
