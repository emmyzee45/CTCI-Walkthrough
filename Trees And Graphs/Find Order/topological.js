/* 
Implement Topological sort for our custom Directed Graph
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
  helper(vertex, visited, output) {
    visited[vertex] = true;

    for (const adjacentVertex of this.adjacencyList[vertex]) {
      if (!(adjacentVertex in visited)) {
        this.helper(adjacentVertex, visited, output);
      }
    }
    output.push(vertex);
  }
  topologicalSort() {
    const output = [];
    const visited = {};

    for (const vertex in this.adjacencyList) {
      if (!(vertex in visited)) {
        this.helper(vertex, visited, output);
      }
    }

    return output.reverse();
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

describe("Topological Sort", () => {
  it("returns correct topological sort", () => {
    const cdg = new CustomDirectedGraph();

    cdg.addVertex("0");
    cdg.addVertex("1");
    cdg.addVertex("2");
    cdg.addVertex("3");
    cdg.addVertex("4");
    cdg.addVertex("5");

    cdg.addEdge("5", "2");
    cdg.addEdge("5", "0");
    cdg.addEdge("4", "0");
    cdg.addEdge("4", "1");
    cdg.addEdge("2", "3");
    cdg.addEdge("3", "1");

    const possibleResults = [
      "450231",
      "452031",
      "452301",
      "452310",
      "523401",
      "523410",
      "524031",
      "524301",
      "524310",
      "540231",
      "542031",
      "542301",
      "542310",
    ];

    const res = cdg.topologicalSort();
    assert.equal(possibleResults.includes(res.join("")), true);
  });
});

mocha.run();
