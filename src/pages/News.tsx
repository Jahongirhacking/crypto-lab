import { Empty, Spin, Space, Input, Card, Pagination, Select, Flex } from "antd";
// import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi"
import ISimplified from "../types/ISimplified"
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import INewsData from "../types/INewsData";
import INews from "../types/INews";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import defaultImage from "../assets/images/news_image.jpg";
import routePaths from "../routes/routePaths";
import ICryptoData from "../types/ICryptoData";
import ICoins from "../types/ICoins";

const News = ({ simplified }: ISimplified) => {
    const [category, setCategory] = useState("Cryptocurrency")
    // const { data: newsData, isFetching, isError } = useGetCryptoNewsQuery({ cryptoCategory: category });
    const { data: newsData, isFetching, isError } = { data: undefined, isFetching: false, isError: true };

    const { data: cryptoCurrencies, isFetching: isCryptoFetching, isError: isCryptoError } = localStorage.getItem(routePaths.CRYPTO_CURRENCIES)
        ? { data: JSON.parse(localStorage.getItem(routePaths.CRYPTO_CURRENCIES) as string), isFetching: false, isError: false }
        : { data: undefined, isFetching: false, isError: true };

    const [searched, setSearched] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    useLocalStorage(routePaths.NEWS, newsData);

    if (!localStorage.getItem(routePaths.NEWS) && isError) return <Empty />;
    if (isFetching) return <Spin />

    const currentCryptos = (newsData || JSON.parse(localStorage.getItem(routePaths.NEWS) as string)) as INewsData;
    const currentCryptosArticles = currentCryptos.articles.filter((article: INews) => article.content && article.description);

    const filteredNews = (currentCryptosArticles as INews[])
        .filter((news: INews) => (
            news.description &&
            (news.title.toLowerCase().includes(searched.toLowerCase())
                ||
                news.description.toLowerCase().includes(searched.toLowerCase()))
        ))

    return (
        <Space
            className={`news ${!simplified ? "not-simplified" : ""}`}
            direction="vertical"
            size={30}>
            {
                !simplified
                &&
                <Space className="news__input" size={10} style={{ width: "100%" }}>
                    <Select
                        showSearch
                        defaultValue={category}
                        style={{ width: 120 }}
                        onChange={(value: string) => setCategory(value)}
                        loading={isCryptoFetching}
                        options={[
                            { value: 'Cryptocurrency', label: 'Cryptocurrency' },
                            ...(cryptoCurrencies && !isCryptoFetching && !isCryptoError
                                ? (cryptoCurrencies as ICryptoData).data.coins.map((coin: ICoins) => ({
                                    value: coin.name,
                                    label: coin.name,
                                }))
                                : []
                            )
                        ]}
                    />
                    <Input
                        className="search-input"
                        onChange={(e) => setSearched(e.target.value)}
                        addonBefore={<SearchOutlined />}
                        placeholder="Search News..."
                    />
                </Space>
            }
            <Flex className="news-container">
                {filteredNews?.slice(pageSize * (pageNumber - 1), simplified ? 10 : pageSize * pageNumber).map((news: INews) => (
                    <div className="card-container" key={news.publishedAt}>
                        <a href={news.url} target="_blank" rel="noreferrer" >
                            <Card
                                title={news.title}
                                extra={
                                    <img
                                        src={news.urlToImage || defaultImage}
                                        style={{ width: "80px", borderRadius: "5px", margin: "5px" }}
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null;
                                            currentTarget.src = defaultImage;
                                        }}
                                    />
                                }
                                hoverable
                            >
                                <p>
                                    {news.description?.length > 200
                                        ? `${news.description.slice(0, 200)}...`
                                        : news.description}
                                </p>
                                <footer>
                                    {moment(news.publishedAt).format("LL")}
                                </footer>
                            </Card>
                        </a>
                    </div>
                ))}
            </Flex>
            {
                !simplified
                &&
                <Pagination
                    defaultCurrent={pageNumber}
                    defaultPageSize={pageSize}
                    total={currentCryptosArticles.length}
                    onChange={(num, size) => {
                        setPageNumber(num);
                        setPageSize(size);
                    }}
                />
            }
        </Space>
    )
}

export default News