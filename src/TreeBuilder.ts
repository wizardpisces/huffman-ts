import { Tree } from './Tree';
import { FrequencyItem, FrequencyTable, HuffmanEncoded } from './type';

export class TreeBuilder {
  rawString: string;
  constructor(text: string) {
    this.rawString = text;
  }

  build() {
    let table = this.buildFrequencyTable();
    let item = this.combineTable(table);
    let compressedTable = this.compressCombinedTable(item);
    return Tree.decodeTree(compressedTable);
  }

  frequencySorter(a: FrequencyItem, b: FrequencyItem): number {
    return a[1] - b[1];
  }

  combineTable(table: FrequencyTable): FrequencyItem {
    while (table.length > 1) {
      let first = table.shift() as FrequencyItem;
      let second = table.shift() as FrequencyItem;
      table.unshift([[first, second], first[1] + second[1]]);
      table.sort(this.frequencySorter);
    }
    return table[0];
  }

  buildFrequencyTable(): FrequencyTable {
    let tableHash: { [key: string]: number } = {};

    this.rawString.split('').forEach(chr => {
      tableHash[chr] = tableHash[chr] ? tableHash[chr] + 1 : 1;
    });

    return Object.entries(tableHash).sort(this.frequencySorter);
  }

  compressCombinedTable(item: FrequencyItem): HuffmanEncoded {
    let value: FrequencyItem[0] = item[0];
    if (Array.isArray(value)) {
      return [
        this.compressCombinedTable(value[0]),
        this.compressCombinedTable(value[1]),
      ];
    }

    return value;
  }
}
