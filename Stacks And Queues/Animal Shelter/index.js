/* 
An animal shelter for dogs and cats operates on a "first in, first out" 
basis, based on arrival time. People can either adopt the "oldest" of all animals at
the shelter, the "oldest" dog, or the "oldest" cat. They cannot adopt a specific 
animal. Create the data structures to implement this system.
*/

class AnimalQueue {
  constructor() {
    this.dogs = new Queue();
    this.cats = new Queue();
    this.order = 0;
  }
  enqueue(animal) {
    animal.setOrder(this.order);
    this.order++;

    if (animal instanceof Dog) {
      this.dogs.add(animal);
    } else if (animal instanceof Cat) {
      this.cats.add(animal);
    }
  }
  dequeueDogs() {
    return this.dogs.remove();
  }
  dequeueCats() {
    return this.cats.remove();
  }
  dequeueAny() {
    if (this.dogs.size() === 0) {
      return this.dequeueCats();
    } else if (this.cats.size() === 0) {
      return this.dequeueDogs();
    }

    const dog = this.dogs.peek();
    const cat = this.cats.peek();

    if (dog.arrivedEarlierThan(cat)) {
      return this.dequeueDogs();
    } else {
      return this.dequeueCats();
    }
  }
}

class Animal {
  constructor(name) {
    this.name = name;
  }
  setOrder(order) {
    this.order = order;
  }
  getOrder() {
    return this.order;
  }
  arrivedEarlierThan(animal) {
    return this.order < animal.getOrder();
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
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

describe("Animal Shelter", () => {
  it("dequeueDogs works", async () => {
    const aq = new AnimalQueue();
    const woofers = new Dog("Woofers");
    const woofers2 = new Dog("Woofers the Younger");

    aq.enqueue(woofers);
    aq.enqueue(woofers2);

    assert.equal(aq.dequeueDogs(), woofers);
    assert.equal(aq.dequeueDogs(), woofers2);
  });

  it("dequeueCats works", async () => {
    const aq = new AnimalQueue();
    const fluffers = new Cat("Fluffers");
    const fluffers2 = new Cat("Fluffers the Younger");

    aq.enqueue(fluffers);
    aq.enqueue(fluffers2);

    assert.equal(aq.dequeueCats(), fluffers);
    assert.equal(aq.dequeueCats(), fluffers2);
  });

  it("dequeueAny works", async () => {
    const aq = new AnimalQueue();
    const fluffers = new Cat("Fluffers");
    const woofers = new Dog("Woofers");

    aq.enqueue(fluffers);
    aq.enqueue(woofers);
    assert.equal(aq.dequeueAny(), fluffers);
    assert.equal(aq.dequeueAny(), woofers);

    aq.enqueue(woofers);
    aq.enqueue(fluffers);
    assert.equal(aq.dequeueAny(), woofers);
    assert.equal(aq.dequeueAny(), fluffers);
  });
});

mocha.run();
