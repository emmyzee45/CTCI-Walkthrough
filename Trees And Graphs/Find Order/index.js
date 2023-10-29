/* 
You are given an array of projects and an array of dependencies. In the array of 
dependencies, dependency [0, 1] indicates that to build project 1, you have to first 
build project 0.
Return a build order that will allow the projects to be built, as an array. 
If there are many valid answers, return any of them. 
If there is no valid build order, return an empty array.

EXAMPLE
Input
Projects: [0, 1, 2, 3, 4, 5],
Dependencies: [[5, 2],[5, 0],[4, 0],[4, 1],[2, 3], [3, 1]]

Output: [4,5,0,2,3,1], [5,4,2,3,1,0], etc
*/

function createDirectedGraph(projects, dependencies) {
  const adjacencyList = {};
  for (const project of projects) adjacencyList[project] = [];
  for (const [project1, project2] of dependencies) {
    adjacencyList[project1].push(project2);
  }

  return adjacencyList;
}

function helper(graph, vertex, visited, output) {
  visited[vertex] = "gray";

  for (const neighborVertex of graph[vertex]) {
    if (
      visited[neighborVertex] === "gray" ||
      (visited[neighborVertex] === "white" &&
        helper(graph, neighborVertex, visited, output))
    ) {
      return true;
    }
  }

  visited[vertex] = "black";
  output.push(vertex);
}

function findOrder(projects, dependencies) {
  const adjacencyList = createDirectedGraph(projects, dependencies);
  const colors = {};
  const topologicalSortedOrder = [];

  for (const project of projects) {
    colors[project] = "white";
  }

  for (const project of projects) {
    if (
      colors[project] === "white" &&
      helper(adjacencyList, project, colors, topologicalSortedOrder)
    )
      return [];
  }

  return topologicalSortedOrder.reverse();
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

describe("Find Order", () => {
  it("returns correct topological sort", () => {
    const res = findOrder(
      ["0", "1", "2", "3", "4", "5"],
      [
        ["5", "2"],
        ["5", "0"],
        ["4", "0"],
        ["4", "1"],
        ["2", "3"],
        ["3", "1"],
      ]
    );

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

    assert.equal(possibleResults.includes(res.join("")), true);
  });

  it("returns empty array if topological sort not possible", () => {
    assert.equal(findOrder([0], [[0, 0]]).length, 0);

    assert.equal(
      findOrder(
        [0, 1, 2],
        [
          [0, 1],
          [2, 1],
          [2, 2],
        ]
      ).length,
      0
    );

    assert.equal(
      findOrder(
        [0, 1, 2, 3],
        [
          [0, 1],
          [0, 2],
          [1, 2],
          [2, 0],
          [2, 3],
          [3, 3],
        ]
      ).length,
      0
    );
  });
});

mocha.run();
