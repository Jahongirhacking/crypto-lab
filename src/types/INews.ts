export default interface INews {
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
