export interface IHistory {
  price: string;
  timestamp: number;
}

export default interface IHistoryData {
  status: "success" | "fail";
  data: {
    change: string;
    history: IHistory[];
  };
}
