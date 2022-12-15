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
    constructor(data = null, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}
class Tree {
    constructor(arr) {
        arr.sort((a, b) => {
            return a - b;
        });
        let duplicateFreeArr = [];
        for (let i = 0; i < arr.length; i += 1) {
            if (arr[i] !== arr[i - 1]) {
                duplicateFreeArr.push(arr[i]);
            }
        }
        this.root = this.buildTree(
            duplicateFreeArr,
            0,
            duplicateFreeArr.length - 1
        );
        prettyPrint(this.root);
    }
    buildTree(duplicateFreeArr, start, end) {
        if (start > end) return null;

        let midArr = parseInt((start + end) / 2);
        let root = new Node(duplicateFreeArr[midArr]);

        root.left = this.buildTree(duplicateFreeArr, start, midArr - 1);
        root.right = this.buildTree(duplicateFreeArr, midArr + 1, end);
        return root;
    }
}

let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let testNode = new Tree(testArr);
