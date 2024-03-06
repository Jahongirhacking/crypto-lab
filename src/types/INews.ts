export default interface INews {
  author: string;
  title: string;
  content: string;
  description: string;
  publishedAt: string;
  url: string;
  urlToImage: string;
  source: {
    id: string;
    name: string;
  };
}
