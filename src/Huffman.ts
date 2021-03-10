/**
 * Author: @wizardpisces 
 * Contact: 1275839779@qq.com
 * Date: 2021-3-8
 * typescript version of https://github1s.com/wilkerlucio/huffman_js
 */

import { Tree } from "./Tree"
import { TreeBuilder } from "./TreeBuilder"
import { HuffmanEncoded } from "./type"


export class Huffman {
    public static treeFromText(text: string) {
        let builder = new TreeBuilder(text)
        return builder.build()
    }

    public static decodeTree(data: HuffmanEncoded) {
        return Tree.decodeTree(data)
    }
}