const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

class Node {
    //data/left/right is null unless overwritten by values
    constructor(data = null, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}
class Tree {
    constructor(arr) {
        //sort array ascending
        arr.sort((a, b) => {
            return a - b;
        });
        //remove duplicates
        let duplicateFreeArr = [];
        for (let i = 0; i < arr.length; i += 1) {
            if (arr[i] !== arr[i - 1]) {
                duplicateFreeArr.push(arr[i]);
            }
        }
        //run buildTree with duplicate free array, 0 (start) and array length - 1 (end)
        this.root = this.buildTree(
            duplicateFreeArr,
            0,
            duplicateFreeArr.length - 1
        );
        //console.logs the (readable) result
        // prettyPrint(this.root);
    }
    buildTree(arr, start, end) {
        //if start > end return null (works way back up the call stack)
        if (start > end) return null;
        //find middle index
        let midArr = parseInt((start + end) / 2);
        // assign root with arr middle index value
        let root = new Node(arr[midArr]);
        // rerun function for left using same arr/start but end will be arr[midArr - 1] (assigning it to current root.left)
        root.left = this.buildTree(arr, start, midArr - 1);
        // rerun function for right using same arr/end but start will be arr[midArr + 1] (assigning it to current root.right)
        root.right = this.buildTree(arr, midArr + 1, end);
        return root;
    }
    insert(value) {
        // look for node to append to
        let nodeToAppendTo = this.searchForNode(this.root, value);
        // append new node to left/right depending on values
        if (nodeToAppendTo.data > value)
            return (nodeToAppendTo.left = new Node(value));
        if (nodeToAppendTo.data < value)
            return (nodeToAppendTo.right = new Node(value));
    }
    search(root, key) {
    
        if (root === null || root.data === key) return root;
        if (root.data < key) return this.search(root.right, key);
        return this.search(root.left, key);
    }
    searchForNode(root, key) {
        // if key already exists console.log message
        if (root.data === key) return console.log(`${key} already exists`);
        // if the node value is smaller then key and it's right is empty or node value is larger and it's left is empty return that node
        if (
            (root.data < key && root.right === null) ||
            (root.data > key && root.left === null)
        )
            return root;

        if (root.data > key)
            // root larger search left
            return this.searchForNode(root.left, key);
        // root smaller search right
        return this.searchForNode(root.right, key);
    }
    deleteNode(value) {
        //check if it exists
        let nodeToDelete = this.search(this.root, value);
        if (nodeToDelete === null) return console.log("No such value");

        console.log(nodeToDelete);
        // find parent nod
        let parentOfNode = this.searchForParent(this.root, value);
        console.log(parentOfNode);
        // if node to delete has NO CHILDREN assign it's parent left/right to null
        if (nodeToDelete.left === null && nodeToDelete.right === null) {
            console.log("here");
            if (parentOfNode.left?.data === value) {
                return (parentOfNode.left = null);
            }
            if (parentOfNode.right?.data === value)
                return (parentOfNode.right = null);
        }
        // if node to delete has ONE CHILD
        if (parentOfNode.right?.data === nodeToDelete.data) {
            if (nodeToDelete.left === null)
                return (parentOfNode.right = nodeToDelete.right);
            if (nodeToDelete.right === null)
                return (parentOfNode.right = nodeToDelete.left);
        }
        if (parentOfNode.left?.data === nodeToDelete.data) {
            if (nodeToDelete.left === null)
                return (parentOfNode.left = nodeToDelete.right);
            if (nodeToDelete.right === null)
                return (parentOfNode.left = nodeToDelete.left);
        }
        // if node to delete has TWO CHILDREN
        let nodeWithMoreValue = nodeToDelete.right;
        if (nodeWithMoreValue.left === null) {
            nodeToDelete.data = nodeWithMoreValue.data;
            nodeToDelete.right = nodeWithMoreValue.right;
            return;
        }
        let bottomLeftOfTree = this.searchBottomLeftTree(nodeWithMoreValue);
        nodeWithMoreValue.left = bottomLeftOfTree.right;
        nodeToDelete.data = bottomLeftOfTree.data;
    }
    searchForParent(root, key) {
        if (root.data === key) return key;
        if (root.right?.data === key || root.left?.data === key) return root;
        // console.log(root.data)
        if (root.data > key) return this.searchForParent(root.left, key);
        return this.searchForParent(root.right, key);
    }
    searchBottomLeftTree(root) {
        if (!root.left?.data) return root;
        return this.searchBottomLeftTree(root.left);
    }
    find(value) {
      let nodeFound = this.search(this.root, value)
      return nodeFound !== null ? nodeFound : `${value} doesn't exist`
        
    }
}

let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 8888];
let testNode = new Tree(testArr);
prettyPrint(testNode.root);
testNode.insert(6);
console.log("after addition");
prettyPrint(testNode.root);
testNode.deleteNode(6345);
prettyPrint(testNode.root);
console.log(testNode.find(9))
