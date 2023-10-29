class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

const convertArrToLL = (arr) => {
  let dummyHead = new ListNode("dummy");
  let tailOfResList = dummyHead;

  for (const data of arr) {
    const node = new ListNode(data);
    tailOfResList.next = node;
    tailOfResList = tailOfResList.next;
  }

  return dummyHead.next;
};

const fetchLLVals = (input) => {
  let curr;
  if (input instanceof LinkedList) {
    curr = input.head;
  } else {
    curr = input;
  }
  const res = [];

  while (curr) {
    res.push(curr.data);
    curr = curr.next;
  }

  return res;
};

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  unshift(data) {
    const newNode = new ListNode(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
  }
  shift() {
    if (!this.head) {
      return;
    }

    const oldHead = this.head;
    this.head = this.head.next;
    this.length -= 1;

    if (this.length === 0) {
      this.tail = null;
    }

    return oldHead.data;
  }
  pop() {
    if (!this.head) {
      return;
    }

    if (this.length === 1) {
      return this.shift();
    }

    let prev = this.head;
    let current = this.head.next;

    while (current.next) {
      prev = prev.next;
      current = current.next;
    }

    prev.next = null;
    this.tail = prev;
    this.length -= 1;

    return current;
  }
  add(value) {
    const newNode = new ListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length += 1;
  }
  addAll(linkedList) {
    this.tail.next = linkedList.head;
    this.tail = linkedList.tail;
    this.length += linkedList.length;
  }
  get(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let counter = 0;
    let current = this.head;

    while (counter < index) {
      current = current.next;
      counter += 1;
    }

    return current;
  }
  remove(index) {
    if (!this.get(index)) {
      return null;
    }

    if (index === 0) {
      return this.shift();
    }
    if (index === this.length - 1) {
      return this.pop();
    }

    const removed = this.get(index);
    const prev = this.get(index - 1);

    prev.next = removed.next;
    this.length -= 1;
    return removed;
  }
  insert(index, data) {
    if (index < 0 || index > this.length) {
      return null;
    }

    if (index === this.length) {
      this.push(data);
      return true;
    }

    if (index === 0) {
      this.unshift(data);
      return true;
    }

    const prev = this.get(index - 1);
    const temp = prev.next;
    const newNode = new ListNode(data);

    prev.next = newNode;
    newNode.next = temp;
    this.length += 1;
    return true;
  }
  clone() {
    const clone = new LinkedList();
    let current = this.head;

    while (current) {
      clone.add(current.data);
      current = current.next;
    }

    return clone;
  }
  addAll(linkedList) {
    if (!linkedList.head) return;
    if (!this.head && !this.tail && this.length === 0) {
      this.head = linkedList.head;
      this.tail = linkedList.tail;
      this.length = linkedList.length;
      return;
    }

    this.length += linkedList.length;
    const oldTail = this.tail;
    oldTail.next = linkedList.head;
    this.tail = linkedList.tail;
  }
}

class Stack {
  constructor() {
    this.stack = [];
  }
  pop() {
    return this.stack.pop();
  }
  push(val) {
    this.stack.push(val);
  }
  peek() {
    return this.stack[this.stack.length - 1];
  }
  isEmpty() {
    return this.stack.length === 0;
  }
  size() {
    return this.stack.length;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  add(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }
  remove() {
    if (!this.head) {
      return null;
    }

    const oldHead = this.head;
    if (oldHead === this.tail) {
      this.tail = null;
    }

    this.head = this.head.next;
    this.length--;
    return oldHead.value;
  }
  peek() {
    return this.head ? this.head.value : null;
  }
  size() {
    return this.length;
  }
  isEmpty() {
    return this.length === 0;
  }
}

class DirectedGraph {
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
}

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    let newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (value === current.data) {
        return;
      }
      if (value < current.data) {
        if (!current.left) {
          current.left = newNode;
          return;
        } else {
          current = current.left;
        }
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        } else {
          current = current.right;
        }
      }
    }
  }
  find(value) {
    let current = this.root;
    while (current) {
      if (value === current.data) {
        return current;
      }
      current = value < current.data ? current.left : current.right;
    }
    return false;
  }
}

function isValidBST(root) {
  if (!root) {
    return true; // Sanity check for passing test case '[]'
  }

  function helper(root, min, max) {
    if (!root) {
      return true; // We hit the end of the path
    }

    if (
      (min !== null && root.data <= min) ||
      (max !== null && root.data >= max)
    ) {
      return false; // current node's val doesn't satisfy the BST rules
    }

    // Continue to scan left and right
    return (
      helper(root.left, min, root.data) && helper(root.right, root.data, max)
    );
  }

  return helper(root, null, null);
}

function maxDepth(root) {
  if (root === undefined || root === null) {
    return 0;
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}
