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
        if (nodeToAppendTo.data > value) return nodeToAppendTo.left = new Node(value)
        if (nodeToAppendTo.data < value) return nodeToAppendTo.right = new Node(value)
    }
    // search(root, key) {
    //     if (root === null || root.data === key) return root;
    //     if (root.data < key) 
    //     return this.search(root.right, key);
    //     return this.search(root.left, key);
    // }
    searchForNode(root, key) {
        console.log(root, key);
        if (root.data === key) return console.log(`${key} already exists`);
        if (root.data < key && root.right === null || root.data > key && root.left === null) return root;

        if (root.data > key)
        // root larger search left
        return this.searchForNode(root.left, key);
        // root smaller search right
        return this.searchForNode(root.right, key);
        
    }
}

let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let testNode = new Tree(testArr);
prettyPrint(testNode.root);
testNode.insert(6345);
prettyPrint(testNode.root);
