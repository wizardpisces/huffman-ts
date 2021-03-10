export type FrequencyItem = [string | [FrequencyItem, FrequencyItem], number]
export type FrequencyTable = FrequencyItem[]

export type CompressedFrequencyItem = [string | CompressedFrequencyItem, string | CompressedFrequencyItem]
export type HuffmanEncoded = CompressedFrequencyItem | string
