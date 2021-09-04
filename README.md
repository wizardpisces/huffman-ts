# Huffman ts

Huffman ts is an implementation of Huffman Algorithm in Typescript. It provides
full compatibility with Huffman algorithm reference.

Typescript version of [huffman_js](https://github1s.com/wilkerlucio/huffman_js)

[Demo](https://wizardpisces.github.io/playground/huffman)

## Basic Usage

```
npm install --save huffman-ts
```

```ts
import {Huffman} from 'huffman-ts'

let text = 'BCAADDDCCACACAC'
let huffman = Huffman.treeFromText(text); // first we need to create the tree to make encoding/decoding
let encoded = huffman.encode(text); // will return the compressed version of text
console.log(encoded, encoded.length)

let decoded = huffman.decode(encoded); // will decode text to original version
// decoded: 'BCAADDDCCACACAC'

```

```ts
import {Huffman} from 'huffman-ts'

let text = 'BCAADDDCCACACAC'
let huffman = Huffman.treeFromText(text); // generate the tree
let treeEncoded = huffman.encodeTree(); // will return an javascript array with tree representation
let treeJSON = JSON.stringify(treeEncoded); // get a JSON string for easy transportation
// treeJSON: `["C",[["B","D"],"A"]]`

let treeAgain = Huffman.decodeTree(treeEncoded); // restore
```
## Test

```
npm run test
```

## Other

[more Readme](https://github1s.com/wilkerlucio/huffman_js)
