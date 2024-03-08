export default interface INewsData {
  articles: INews[];
  status: string;
  totalResults: number;
}

export interface INews {
  author: string;
  title: string;
  content: string;
  description: string;
  publishedAt: string;
  url: string;
  image: string;
  source: {
    id: string;
    name: string;
  };
}
