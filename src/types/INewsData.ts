import INews from "./INews";

export default interface INewsData {
  articles: INews[];
  status: string;
  totalResults: number;
}
