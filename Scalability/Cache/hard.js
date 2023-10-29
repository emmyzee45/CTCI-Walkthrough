class CacheNode {
  constructor(q, res) {
    this.prev = null;
    this.next = null;
    this.results = res;
    this.query = q;
  }
}

class LRUCache {
  constructor(capacity) {
    this.cache = {}; // {string: node}
    this.capacity = capacity;
    this.size = 0;
    this.head = null;
    this.tail = null;
  }
  moveToFront(input) {
    // Our code is dynamic and works if our input is a string OR a node.
    if (input instanceof CacheNode) {
      if (input === this.head) return;

      this.removeFromLinkedList(input);
      input.next = this.head;

      if (this.head) this.head.prev = input;

      this.head = input;
      this.size++;

      if (!this.tail) this.tail = input;
    } else {
      const node = this.cache[input];
      this.moveToFront(node);
    }
  }
  removeFromLinkedList(node) {
    if (!node) return;

    if (node.next || node.prev) this.size--;

    const prev = node.prev;
    if (prev) prev.next = node.next;

    const next = node.next;
    if (next) next.prev = prev;

    if (node === this.head) this.head = next;

    if (node === this.tail) this.tail = prev;

    node.next = null;
    node.prev = null;
  }
  // Gets results from cache, and updates linked list
  get(query) {
    // query: string
    if (query in this.cache) {
      const node = this.cache[query];

      // Update cache with freshest query
      this.moveToFront(node);
      return node.results;
    }
    return -1;
  }
  put(query, results) {
    if (query in this.cache) {
      const node = map[query];
      node.results = results;

      // Update cache with freshest query
      this.moveToFront(node);
      return;
    }

    const node = new CacheNode(query, results);
    this.moveToFront(node);
    this.cache[query] = node;

    if (this.size > this.capacity) {
      // Remove node from map
      delete this.cache[this.tail.query];

      // Remove node from LL. Most out of date queries will be towards end of LL
      this.removeFromLinkedList(this.tail);
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

describe("LRU Cache", () => {
  it("works", () => {
    const lRUCache = new LRUCache(2);

    lRUCache.put(1, 1); // cache is {1=1}
    lRUCache.put(2, 2); // cache is {1=1, 2=2}

    assert.equal(lRUCache.get(1), 1);
    lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
    assert.equal(lRUCache.get(2), -1); // (not found)

    lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
    assert.equal(lRUCache.get(1), -1);
    assert.equal(lRUCache.get(3), 3);
    assert.equal(lRUCache.get(4), 4);
  });
});

mocha.run();
