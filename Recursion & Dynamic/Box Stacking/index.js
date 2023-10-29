/* 
You are given n boxes. The boxes can only be stacked on each other if a box is 
larger than the box above it in width, height, and depth. Calculate the height of 
the tallest possible stack. 
*/

function boxStacking(boxes) {
  /* Problem says lower boxes must be greater than higher boxes in all dimensions. Let's
  sort in any dimension so we never have to look backwards in list. I will choose height. */
  boxes.sort((a, b) => b.height - a.height);

  let maxHeight = 0;
  const stackMap = {}; //stackMap [i] represents the tallest stack with box i

  // Treat each box as bottom
  for (let i = 0; i < boxes.length; i++) {
    const height = helper(boxes, i, stackMap);
    maxHeight = Math.max(height, maxHeight);
  }

  return maxHeight;
}

function helper(boxes, bottomIndex, stackMap) {
  if (stackMap[bottomIndex] > 0) {
    return stackMap[bottomIndex];
  }

  const bottomBox = boxes[bottomIndex];
  let maxHeight = 0;

  for (let i = bottomIndex + 1; i < boxes.length; i++) {
    if (boxes[i].canBeAbove(bottomBox)) {
      const height = helper(boxes, i, stackMap);
      maxHeight = Math.max(height, maxHeight);
    }
  }

  maxHeight += bottomBox.height;
  stackMap[bottomIndex] = maxHeight;
  return maxHeight;
}

// function boxStacking(boxes) {
//   // Sort boxes descending in any dimension, here we choose height
//   boxes.sort((a, b) => b.height - a.height);

//   let maxHeight = 0;
//   for (let i = 0; i < boxes.length; i++) {
//     const height = helper(boxes, i);
//     maxHeight = Math.max(height, maxHeight);
//   }

//   return maxHeight;
// }

// function helper(boxes, bottomIndex) {
//   const bottomBox = boxes[bottomIndex];
//   let maxHeight = 0;

//   for (let i = bottomIndex + 1; i < boxes.length; i++) {
//     if (boxes[i].canBeAbove(bottomBox)) {
//       const height = helper(boxes, i);
//       maxHeight = Math.max(height, maxHeight);
//     }
//   }

//   maxHeight += bottomBox.height;
//   return maxHeight;
// }

class Box {
  constructor(h, w, d) {
    this.height = h;
    this.width = w;
    this.depth = d;
  }
  canBeUnder(b) {
    if (
      this.width > b.width &&
      this.height > b.height &&
      this.depth > b.depth
    ) {
      return true;
    }
    return false;
  }
  canBeAbove(b) {
    if (b === this.null) {
      return true;
    }
    if (
      this.width < b.width &&
      this.height < b.height &&
      this.depth < b.depth
    ) {
      return true;
    }
    return false;
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

describe("Box Stacking", () => {
  it("can stack one box", () => {
    const box1a = new Box(1, 1, 1);
    const box1b = new Box(100, 1, 1);
    assert.equal(boxStacking([box1a]), 1);
    assert.equal(boxStacking([box1b]), 100);
  });

  it("can stack two boxes", () => {
    const box1c = new Box(1, 1, 1);
    const box2c = new Box(2, 2, 2);
    assert.equal(boxStacking([box1c, box2c]), 3);
  });

  it("can stack three boxes", () => {
    const box1e = new Box(1, 1, 1);
    const box2e = new Box(2, 2, 2);
    const box3e = new Box(3, 3, 3);
    assert.equal(boxStacking([box2e, box3e, box1e]), 6);
  });

  it("unable to stack three boxes, one tall, one wide, one deep", () => {
    const box1f = new Box(1, 3, 1);
    const box2f = new Box(3, 1, 1);
    const box3f = new Box(1, 1, 3);
    assert.equal(boxStacking([box1f, box2f, box3f]), 3);
  });
});

mocha.run();
