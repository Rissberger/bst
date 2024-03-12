class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val === current.val) return undefined; // Avoid duplicates
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  insertRecursively(val, node = this.root) {
    if (!node) {
      this.root = new Node(val);
      return this;
    }

    if (val < node.val) {
      if (!node.left) node.left = new Node(val);
      else this.insertRecursively(val, node.left);
    } else if (val > node.val) {
      if (!node.right) node.right = new Node(val);
      else this.insertRecursively(val, node.right);
    }
    return this; // Ignore duplicates
  }

  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      current = val < current.val ? current.left : current.right;
    }
    return undefined;
  }

  findRecursively(val, node = this.root) {
    if (!node || val === node.val) return node;
    return val < node.val ? this.findRecursively(val, node.left) : this.findRecursively(val, node.right);
  }

  dfsPreOrder() {
    const visited = [];
    const traverse = (node) => {
      visited.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return visited;
  }

  dfsInOrder() {
    const visited = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      visited.push(node.val);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return visited;
  }

  dfsPostOrder() {
    const visited = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      visited.push(node.val);
    };
    traverse(this.root);
    return visited;
  }

  bfs() {
    const queue = [this.root];
    const visited = [];
    while (queue.length) {
      const node = queue.shift();
      if (node) {
        visited.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
    return visited;
  }

  // isBalanced implementation as discussed earlier

  _getHeight(node) {
    if (node === null) return -1;

    let leftHeight = this._getHeight(node.left);
    let rightHeight = this._getHeight(node.right);

    if (leftHeight === -Infinity || rightHeight === -Infinity) return -Infinity;
    if (Math.abs(leftHeight - rightHeight) > 1) return -Infinity;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  isBalanced() {
    return this._getHeight(this.root) !== -Infinity;
  }
  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      // Tree is empty or has only one node
      return undefined;
    }

    let current = this.root;
    let parent = null;

    // Traverse to the rightmost node
    while (current.right) {
      parent = current;
      current = current.right;
    }

    // If the rightmost node has a left subtree,
    // find the rightmost node in that subtree
    if (current.left) {
      return this._findMax(current.left).val;
    }

    // If no left subtree, the parent of the rightmost node is the second highest
    return parent.val;
  }

  _findMax(node) {
    // Helper function to find the maximum node (rightmost node) in a subtree
    let current = node;
    while (current.right) {
      current = current.right;
    }
    return current;
  }
  dfsInOrderIterative() {
    const stack = [];
    const visited = [];
    let current = this.root;

    // Continue until there are unvisited nodes
    while (stack.length > 0 || current !== null) {
      // Reach the leftmost node of the current node
      while (current !== null) {
        stack.push(current); // Place pointer for node on the stack before traversing its left subtree
        current = current.left;
      }

      // Current must be null at this point
      current = stack.pop();
      visited.push(current.val); // Add the node value to the visited list
      current = current.right; // Now, let's deal with the right subtree
    }

    return visited;
  }
}

module.exports = BinarySearchTree;
