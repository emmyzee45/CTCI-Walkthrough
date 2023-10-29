/* 
Detect cycle in directed graph
*/

class CustomDirectedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  addEdge(v1, v2) {
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      this.adjacencyList[v1].push(v2);
    }
  }
  // Returns true if cycle detected, false otherwise
  helper(vertex, colors) {
    // Mark vertex as "visiting"
    colors[vertex] = "gray";

    for (const neighborVertex of this.adjacencyList[vertex]) {
      // Gray nodes should not be able to visit other gray nodes! Cycle detected.
      if (colors[neighborVertex] === "gray") return true;

      if (
        colors[neighborVertex] === "white" &&
        this.helper(neighborVertex, colors)
      ) {
        return true;
      }
    }

    // Mark vertex as "visited"
    colors[vertex] = "black";
    return false;
  }
  detectCycle() {
    const colors = {};

    for (const vertex in this.adjacencyList) {
      colors[vertex] = "white";
    }

    for (const vertex in this.adjacencyList) {
      if (colors[vertex] === "white") {
        if (this.helper(vertex, colors)) {
          return true;
        }
      }
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

describe("Detect cycle in directed graph", () => {
  it("correctly returns false", () => {
    const cdg = new CustomDirectedGraph();

    cdg.addVertex("0");
    cdg.addVertex("1");
    cdg.addVertex("2");

    cdg.addEdge("0", "1");
    cdg.addEdge("0", "2");
    cdg.addEdge("1", "2");

    assert.equal(cdg.detectCycle(), false);
  });
  it("correctly returns true", () => {
    const cdg = new CustomDirectedGraph();

    cdg.addVertex("0");
    cdg.addVertex("1");
    cdg.addVertex("2");
    cdg.addVertex("3");

    cdg.addEdge("0", "1");
    cdg.addEdge("0", "2");
    cdg.addEdge("1", "2");
    cdg.addEdge("2", "0");
    cdg.addEdge("2", "3");
    cdg.addEdge("3", "3");

    assert.equal(cdg.detectCycle(), true);
  });
});

mocha.run();
