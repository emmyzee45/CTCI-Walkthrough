/* 
Given input strings s1 and s2, write a function to determine if s2 is a rotation of s1.
Example
"bigdog" is a rotation of "dogbig".
"bigdog" is NOT a rotation of "dog"
"bigdog" is NOT a rotation of "bigcat"
*/

function isRotation(s1, s2) {
  return s1.length === s2.length && (s1 + s1).includes(s2);
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

describe("Is Rotation", () => {
  it("isRotation('bigdog', 'dogbig') --> true", () => {
    assert.equal(isRotation("bigdog", "dogbig"), true);
  });
  it("isRotation('bigdog', 'gbigdo') --> true", () => {
    assert.equal(isRotation("bigdog", "gbigdo"), true);
  });
  it("isRotation('bigdog', 'bigcat') --> false", () => {
    assert.equal(isRotation("bigdog", "bigcat"), false);
  });
  it("isRotation('bigdog', 'dog') --> false", () => {
    assert.equal(isRotation("bigdog", "dog"), false);
  });
  it("isRotation('dog', 'bigdog') --> false", () => {
    assert.equal(isRotation("dog", "bigdog"), false);
  });
});

mocha.run();
