export interface IStats {
  total: number;
  total24hVolume: string;
  totalCoins: number;
  totalExchanges: number;
  totalMarketCap: string;
  totalMarkets: number;
}

export interface ICoins {
  uuid: string;
  name: string;
  change: string;
  color: string;
  rank: number;
  symbol: string;
  iconUrl: string;
  price: string;
  marketCap: string;
  listedAt: number;
}

export default interface ICryptoData {
  data: {
    stats: IStats;
    coins: ICoins[];
  };
  status: string;
}
