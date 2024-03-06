interface Icons {
  name: string;
  type: string;
  url: string;
}

interface ISupply {
  confirmed: boolean;
  supplyAt: number;
  max: string;
  total: string;
  circulating: string;
}

export interface ICoinDetails {
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  websiteUrl: string;
  links: Icons[];
  supply: ISupply;
  numberOfMarkets: number;
  numberOfExchanges: number;
  "24hVolume": string;
  marketCap: string;
  fullyDilutedMarketCap: string;
  price: string;
  btcPrice: string;
  priceAt: number;
  change: string;
  rank: number;
  sparkline: (string | null)[];
  allTimeHigh: {
    price: string;
    timestamp: number;
  };
  coinrankingUrl: string;
  tier: number;
  lowVolume: boolean;
  listedAt: number;
  hasContent: boolean;
  tags: string[];
}

export default interface IDetails {
  status: "success" | "fail";
  data: {
    coin: ICoinDetails;
  };
}
