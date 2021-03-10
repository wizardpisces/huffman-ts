import { TreeNode } from './TreeNode';
import { HuffmanEncoded } from './type';

/**
 * Pad a string, used to pad bits into a full byte
 */
function lpad(str: string = '', len: number = 8) {
  return '0'.repeat(len - str.length) + str;
}

export class Tree {
  root: TreeNode;
  leafCache: { [key: string]: string } = {};
  constructor(root: TreeNode) {
    this.root = root || new TreeNode();
  }

  stringToBitString(encoded: string) {
    if (!encoded) {
      return '';
    }

    let pieces = encoded.split(''),
      pad = parseInt(pieces.pop() as string),
      bitString = '';

    bitString = pieces.map(ch => lpad(ch.charCodeAt(0).toString(2))).join('');

    return bitString.substr(0, bitString.length - pad);
  }

  bitStringToString(bitString: string) {
    let padByte = 8 - (bitString.length % 8),
      encoded = '';
    bitString = bitString + '0'.repeat(padByte);

    for (let i = 0; i < bitString.length; i += 8) {
      encoded += String.fromCharCode(parseInt(bitString.substr(i, 8), 2));
    }

    encoded += padByte.toString();

    return encoded;
  }

  encode(text: string): string {
    let bitString = this.encodeBitString(text);
    return this.bitStringToString(bitString);
  }

  decode(encoded: string): string {
    if (!encoded) {
      return '';
    }

    let decoded = '',
      bitString = this.stringToBitString(encoded),
      node: TreeNode = this.root;

    bitString.split('').forEach(direction => {
      let d: keyof TreeNode = direction === '0' ? 'left' : 'right';
      node = node[d] as TreeNode;

      if (node.isLeaf()) {
        decoded += node.value;
        node = this.root;
      }
    });

    return decoded;
  }

  encodeBitString(text: string): string {
    return text
      .split('')
      .map(ch => this.bitValue(ch))
      .join('');
  }

  bitValue(ch: string) {
    if (!this.leafCache[ch]) {
      /**
       *  only run at first time call which will generate all ch related code
       */
      this.generateLeafCache();
    }
    return this.leafCache[ch];
  }

  generateLeafCache(node: TreeNode = this.root, path: string = '') {
    if (node.isLeaf()) {
      this.leafCache[node.value as string] = path;
    } else {
      this.generateLeafCache(node.left as TreeNode, path + '0');
      this.generateLeafCache(node.right as TreeNode, path + '1');
    }
  }

  encodeTree(): HuffmanEncoded {
    return this.root.encode();
  }

  static decodeTree(data: HuffmanEncoded) {
    return new Tree(Tree.parseNode(data));
  }

  static parseNode(data: HuffmanEncoded): TreeNode {
    let node = new TreeNode();

    if (Array.isArray(data)) {
      node.left = Tree.parseNode(data[0]);
      node.right = Tree.parseNode(data[1]);
    } else {
      node.value = data;
    }

    return node;
  }
}
