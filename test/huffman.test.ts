import { Huffman, HuffmanEncoded, Tree } from "../src";

describe('huffman test', () => {
    it('treeFromText/encodeTree/decodeTree/', () => {
        function testHuffman1() {

            let text = 'BCAADDDCCACACAC'
            // let text = 'do or do not';

            let huffman: Tree = Huffman.treeFromText(text); // generate the tree
            console.log(huffman)

            let treeEncoded: HuffmanEncoded = huffman.encodeTree(); // will return an javascript array with tree representation
            console.log(treeEncoded)

            let treeAgain = Huffman.decodeTree(treeEncoded); // restore the tree based on array representation
            console.log(treeAgain)

            let treeJSON = JSON.stringify(treeEncoded); // get a JSON string for easy transportation
            console.log('treeJson',treeJSON)
            expect(treeJSON).toEqual('["C",[["B","D"],"A"]]')

        }
        testHuffman1()
    })

    it('treeFromText/encode/decode/', () => {
        function testHuffman2() {
            let text = 'BCAADDDCCACACAC'
            let huffman: Tree = Huffman.treeFromText(text); // first we need to create the tree to make encoding/decoding
            let encoded = huffman.encode(text); // will return the compressed version of text
            console.log(encoded, encoded.length)

            let decoded = huffman.decode(encoded); // will decode text to original version
            expect(decoded).toEqual(text)

        }
        testHuffman2()

    })
})