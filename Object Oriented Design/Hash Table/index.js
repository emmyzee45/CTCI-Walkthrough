//Implemented as doubly linked list.
class LinkedListNode {
  constructor(k, v) {
    this.key = k;
    this.value = v;
    this.next;
    this.prev;
  }
}

class Hasher {
  constructor(capacity) {
    /* Create array of linked lists. */
    this.arr = new Array(capacity);
  }
  put(key, value) {
    let node = this.getNodeForKey(key);
    if (node) {
      const oldValue = node.value;
      node.value = value; // just update the value.
      return oldValue;
    }

    node = new LinkedListNode(key, value);
    const index = this.getIndexForKey(key);
    //Collision. Do seperate chaining, by inserting node at head of LL
    if (this.arr[index]) {
      node.next = this.arr[index];
      node.next.prev = node;
    }
    this.arr[index] = node;
    return null;
  }
  /* Remove node for key. */
  remove(key) {
    const node = this.getNodeForKey(key);
    if (!node) {
      return null;
    }

    if (node.prev) {
      node.prev.next = node.next;
    } else {
      /* Removing head - update. */
      const hashKey = this.getIndexForKey(key);
      this.arr[hashKey] = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }
    return node.value;
  }
  /* Get value for key. */
  get(key) {
    if (!key) return null;
    const node = this.getNodeForKey(key);
    return node ? node.value : null;
  }
  /* Get linked list node associated with a given key. */
  getNodeForKey(key) {
    const index = this.getIndexForKey(key);
    let current = this.arr[index];
    while (current) {
      if (current.key === key) {
        return current;
      }
      current = current.next;
    }
    return null;
  }
  /* Really stupid function to map a key to an index. */
  getIndexForKey(key) {
    let res = 0;
    for (const char of key) {
      res += char.charCodeAt(0);
    }
    return res % this.arr.length;
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

describe("Hash Table", () => {
  it("put(key, value) and get(key) work as intended", () => {
    const kevin = new Hasher(10);

    kevin.put("age", 25);
    assert.equal(kevin.get("age"), 25);
    kevin.put("age", 1055);
    kevin.put("ega", 35);
    kevin.put("city location", "San jose");

    assert.equal(kevin.get("age"), 1055);
    assert.equal(kevin.get("city location"), "San jose");
    assert.equal(!!kevin.get("this key does not exist"), false);
    assert.equal(kevin.get("ega"), 35);
  });

  it("remove(key) removes node and returns node value", () => {
    const kevin = new Hasher(10);

    kevin.put("age", 25);
    kevin.put("ega", 35);
    kevin.put("eag", 45);

    assert.equal(!!kevin.remove("abc"), false);
    assert.equal(kevin.remove("ega"), 35);
    assert.equal(!!kevin.get("ega"), false);

    assert.equal(kevin.get("age"), 25);
    assert.equal(kevin.get("eag"), 45);
  });
});

mocha.run();
