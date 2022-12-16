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
        //console.log(this.root);
        //check if value is a duplicate
        //if (this.search(this.root, value).data === value)
       
          // return console.log(`${value} already exists`);
          let searchResult = this.search(this.root, value);
          console.log(searchResult)
          if (searchResult !== null) return console.log(`${searchResult.data} already exists`)
       let insertHere = this.hiLowSearch(this.root, value)
       console.log({insertHere})
       let oldLeft = insertHere.left

       insertHere.left = new Node(value, oldLeft )
        // if (this.root.data > value && this.root.left < value) return console.log(this.root)
    }
    search(root, key) {
        if (root === null || root.data === key) return root;
        // console.log(root, key);
        if (root.data < key) 
        return this.search(root.right, key);
        return this.search(root.left, key);
    }
    hiLowSearch(root, key) {
     if (root.data > key && root.left.data < key || root.data > key && root.left.data === null) return root
    // console.log(root, key);
        console.log(`root:${root.data}, left:${root.left.data}, right:${root.right.data}, key:${key}`);
        if (root.data < key) {
        return this.hiLowSearch(root.right, key);
        } else if (root.data > key) {
        return this.hiLowSearch(root.left, key);
       }
    }
}

let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let testNode = new Tree(testArr);
prettyPrint(testNode.root)
testNode.insert(11);
//console.log(testNode)
prettyPrint(testNode.root)
