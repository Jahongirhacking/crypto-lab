import ICoins from "./ICoins";
import IStats from "./IStats";

export default interface ICryptoData {
  data: {
    stats: IStats;
    coins: ICoins[];
  };
  status: string;
}
