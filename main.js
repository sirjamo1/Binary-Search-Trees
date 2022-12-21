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
        // find parent nod
        let parentOfNode = this.searchForParent(this.root, value);
        // if node to delete has NO CHILDREN assign it's parent left/right to null
        if (nodeToDelete.left === null && nodeToDelete.right === null) {
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
    searchBottomLeftTree(root = this.root) {
        if (!root.left?.data) return root;
        return this.searchBottomLeftTree(root.left);
    }
    find(value) {
        let nodeFound = this.search(this.root, value);
        return nodeFound !== null ? nodeFound : `${value} doesn't exist`;
    }
    levelOrder() {
        let root = this.root;
        //new array
        const breadthFirstArr = [];
        if (!root) {
            return breadthFirstArr;
        }
        //add root to queue
        const queue = [root];
        // if queue has length
        while (queue.length) {
            // take(remove) first item from queue, assign it to current node
            const node = queue.shift();
            //if node has left (not null) add it to end of queue
            if (node.left) {
                queue.push(node.left);
            }
            // repeat step for right
            if (node.right) {
                queue.push(node.right);
            }
            // add the current node value to the new array
            breadthFirstArr.push(node.data);
        }
        // when finished return array
        return breadthFirstArr;
    }
    inOrder(root = this.root, inOrderArray = []) {
        if (!root) return;
        //left node has value, run it through
        if (root.left) {
            this.inOrder(root.left, inOrderArray);
        }
        // push node value to array
        if (root.data) {
            inOrderArray.push(root.data);
        }
        // right node has value, run it through
        if (root.right) {
            this.inOrder(root.right, inOrderArray);
        }
        return inOrderArray;
    }
    preOrder(root = this.root, preOrderArray = []) {
        if (!root) return;
        
        // push node value to array
        if (root.data) {
            preOrderArray.push(root.data);
        }
        // left node has value, run it through
        if (root.left) {
            this.preOrder(root.left, preOrderArray);
        }
        // right node has value, run it through
        if (root.right) {
            this.preOrder(root.right, preOrderArray);
        }
        return preOrderArray;
    }
    postOrder(root = this.root, postOrderArray = []) {
        if (!root) return;
        // right node has value, run it through
        if (root.right) {
            this.postOrder(root.right, postOrderArray);
        }
        // push node value to array
        if (root.data) {
            postOrderArray.push(root.data);
        }
        // left node has value run it through
        if (root.left) {
            this.postOrder(root.left, postOrderArray);
        }
        return postOrderArray;
    }
    height(input = this.root) {
        // if input is a number find it's node else use input (node)
        let node = Number(input) ? this.find(input) : input;
        // return -1 if null
        if (node === null) return -1;
        // rerun left/right
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        // largest of left/right + 1
        return Math.max(leftHeight, rightHeight) + 1;
    }
    minHeight(node = this.root) {
        //finds the row after were all nodes have two children !== null
        //same as the above, but replace Math.max() with Math.min() to get the smaller of left/right
        if (node === null) return -1;
        const leftHeight = this.minHeight(node.left);
        const rightHeight = this.minHeight(node.right);
        return Math.min(leftHeight, rightHeight) + 1;
    }
    isBalanced() {
        // the min height is >= then the max height - 1
        return this.minHeight() >= this.height() - 1;
    }
    depth(key) {
        //total height - node height = node depth
        let totalHeight = this.height();
        let nodeHeight = this.height(key);
        if (nodeHeight > totalHeight || key == null) return `${key} not found`;
        return totalHeight - nodeHeight;
    }
    rebalance() {
        // order tree into ascending array, rebuild tree
        let orderedArray = this.inOrderArray;
        return (this.root = this.buildTree(
            orderedArray,
            orderedArray[0],
            orderedArray.length - 1
        ));
    }
}
const createRandomNumberArray = (numberOfNodes, min, max) => {
    let nodes = numberOfNodes ? numberOfNodes : 20;
    let minValue = min ? min : 0;
    let maxValue = max ? max : 999;
    if (minValue >= maxValue) {
        maxValue = minValue + 1;
    }
    if (nodes > maxValue - minValue) {
        nodes = maxValue - minValue;
    }
    let array = [];
    for (let i = 0; i < nodes; i += 1) {
        let duplicate = false;
        let newData = Math.round(
            Math.random() * (maxValue - minValue) + minValue
        );
        for (let j = 0; j < array.length; j += 1) {
            if (newData === array[j]) {
                i -= 1;
                duplicate = true;
            }
        }
        if (duplicate === false) {
            array[i] = newData;
        }
    }
    return array;
};

//console.log(createRandomNumberArray(10, 0, 10));

// let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 8888];
// let testNode = new Tree(testArr);
let testNode = new Tree(createRandomNumberArray(10, 0, 200))
prettyPrint(testNode.root)
console.log(testNode.isBalanced())
console.log(testNode.levelOrder());
console.log(testNode.inOrder())
console.log(testNode.preOrder());
console.log(testNode.postOrder());
testNode.insert(188)
// prettyPrint(testNode.root);
// testNode.insert(6);
// console.log("after addition");
// prettyPrint(testNode.root);
// testNode.deleteNode(6345);
// console.log("after delete");
// prettyPrint(testNode.root);
// //console.log(testNode.find(9));
// console.log(testNode.levelOrder());

console.log(testNode.inOrder());
// console.log(testNode.preOrder());
// console.log(testNode.postOrder());
// console.log(testNode.height(8));
// console.log(testNode.height(4));
// console.log(testNode.minHeight());
// console.log(testNode.isBalanced());
// console.log(testNode.depth(0));
// testNode.rebalance();
// prettyPrint(testNode.root);
