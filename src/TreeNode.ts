
/**
 * Huffman tree node type:
 * 1. [not Leaf node] have left, right child, do not have value
 * 2. [Leaf node] do not have left and right,  have value 
 */

import { HuffmanEncoded } from "./type"

export class TreeNode { // Hu left and right node will be Leaf
    left: TreeNode | null = null
    right:TreeNode | null = null
    value: string | null = null
    constructor() {

    }
    isLeaf() {
        return this.left === null && this.right === null
    }

    encode(): HuffmanEncoded {
        if (this.value) {
            return this.value
        }
        return [(<TreeNode>this.left).encode(), (<TreeNode>this.right).encode()]
    }
}