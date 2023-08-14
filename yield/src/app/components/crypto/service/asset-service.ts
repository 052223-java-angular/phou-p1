import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IAsset } from '../model/IAsset';
import { IAssetBrief } from '../model/IAssetBrief';

const assets: IAsset[] = [
  {symbol: 'btc', name: "bitcoin", images: ['https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579', ''], currentPrice: 30000, marketCap: 10000000, totalVolume: 1000000000},
  {symbol: 'eth', name: "ethereum", images: ['https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"', ''], currentPrice: 30000, marketCap: 10000000, totalVolume: 1000000000},
  {symbol: 'bnb', name: "binance coin", images: ['https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850', ''], currentPrice: 30000, marketCap: 10000000, totalVolume: 1000000000},
  {symbol: 'xrp', name: "ripple", images: ['https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png?1605778731', ''], currentPrice: 30000, marketCap: 10000000, totalVolume: 1000000000},
  {symbol: 'bch', name: "bitcoin cash", images: ['https://assets.coingecko.com/coins/images/780/small/bitcoin-cash-circle.png?1594689492', ''], currentPrice: 30000, marketCap: 10000000, totalVolume: 1000000000},
  {symbol: 'ltc', name: "litcoin", images: ['https://assets.coingecko.com/coins/images/2/small/litecoin.png?1547033580', ''], currentPrice: 30000, marketCap: 10000000, totalVolume: 1000000000}
]


@Injectable()
export class AssetService {

  sortedAssets$: BehaviorSubject<IAsset[]> = new BehaviorSubject(assets);

  fetchTopAssets() : Observable<IAsset[]> {
    return of(assets)
  }

  fetchAssets() : Observable<IAssetBrief[]> {
    return of(assets);
  }

}
