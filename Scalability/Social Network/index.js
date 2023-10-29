function findPathBiBFS(people, source, destination) {
  // people: {int: person}, source: num, destination: num
  // BFSData holds the data we need for a BFS, such as visited and toVisit
  const sourceData = new BFSData(people[source]);
  const destData = new BFSData(people[destination]);

  // Visit all friends of source and destination, one level at a time.
  while (!sourceData.isFinished() && !destData.isFinished()) {
    // Search out from source.
    let collision = searchLevel(people, sourceData, destData);
    if (collision) return mergePaths(sourceData, destData, collision.getID());

    // Search out from destination.
    collision = searchLevel(people, destData, sourceData);
    if (collision) return mergePaths(sourceData, destData, collision.getID());
  }

  //We have visited all friends of source and destination. No valid path found
  return null;
}

class BFSData {
  constructor(root) {
    // root will be a Person object
    this.sourcePath = new PathNode(root, null);
    this.toVisit = new Queue();
    this.visited = {}; // {id: Class PathNode}

    this.toVisit.add(this.sourcePath);
    this.visited[root.getID()] = this.sourcePath;
  }
  isFinished() {
    return this.toVisit.isEmpty();
  }
}

// Stores current path in our search by storing each Person and the previousNode.
class PathNode {
  constructor(p, previous) {
    this.person = p;
    this.previousNode = previous;
  }
  getPerson() {
    return this.person;
  }
  collapse(startsWithRoot) {
    // This method is only activated if current PathNode is the collision
    const path = new LinkedList();
    let node = this;
    while (node) {
      if (startsWithRoot) {
        // Have collision be start of LL. Path will be Collision --> Destination
        path.add(node.person);
      } else {
        // Have collision be end of LL. Path will be Source --> Collision
        path.unshift(node.person);
      }
      node = node.previousNode;
    }
    return path;
  }
}

/* Search one level and return collision, if any. */
function searchLevel(people, primary, secondary) {
  /* We only want to search one level at a time. Count how many nodes are currently in the primary's
  level and only do that many nodes. */
  const count = primary.toVisit.size();
  for (let i = 0; i < count; i++) {
    const pathNode = primary.toVisit.remove();
    const person = pathNode.getPerson();
    const personId = person.getID();

    /* Collision has occured, return collision as Class Person */
    if (personId in secondary.visited) return person;

    // Add friends to visit to primary
    const friends = person.getFriends();
    for (const friendId of friends) {
      if (friendId in primary.visited === false) {
        const friend = people[friendId];
        const next = new PathNode(friend, pathNode);
        primary.visited[friendId] = next;
        primary.toVisit.add(next);
      }
    }
  }

  // Return falsy value to show no collision has yet occured
  return null;
}

function mergePaths(sourceBFS, destBFS, collision) {
  // contains path: source -> collision
  const pathOne = sourceBFS.visited[collision].collapse(false);

  // contains path: collision -> dest
  const pathTwo = destBFS.visited[collision].collapse(true);

  pathTwo.shift(); // remove collision since pathOne already has it
  pathOne.addAll(pathTwo);
  return pathOne;
}

class Person {
  constructor(id) {
    this.personID = id;
    this.friends = [];
  }
  getInfo() {
    return this.info;
  }
  setInfo(info) {
    this.info = info;
  }
  getFriends() {
    return this.friends;
  }
  getID() {
    return this.personID;
  }
  addFriend(id) {
    this.friends.push(id);
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

describe("Social Network", () => {
  const nPeople = 11;
  const people = {}; // {int: class Person}
  for (let i = 0; i < nPeople; i++) {
    const p = new Person(i);
    people[i] = p;
  }

  const edges = [
    [1, 4],
    [1, 2],
    [1, 3],
    [3, 2],
    [4, 6],
    [3, 7],
    [6, 9],
    [9, 10],
    [5, 10],
    [2, 5],
    [3, 7],
  ];

  for (const edge of edges) {
    const source = people[edge[0]];
    source.addFriend(edge[1]);

    const destination = people[edge[1]];
    destination.addFriend(edge[0]);
  }

  const i = 1;
  const j = 10;
  const path1 = fetchLLVals(findPathBiBFS(people, i, j)).map((p) => p.personID);

  it("returns valid path", () => {
    assert.equal(path1.join(""), "12510");
    // [1, 2, 5, 10]
  });
  it("returns falsy value if no valid path", () => {
    assert.equal(!!findPathBiBFS(people, 0, 5), false);
  });
});

mocha.run();
