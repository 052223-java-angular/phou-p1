export interface IAsset {
  symbol: string,
  name: string,
  images: string[],
  currentPrice: number,
  marketCap: number,
  totalVolume: number
}