import { Empty, Spin, Space, Input, Card, Pagination, Select, Flex, Typography, Divider } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi"
import ISimplified from "../types/ISimplified"
import { LegacyRef, forwardRef, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import INewsData from "../types/INewsData";
import { INews } from "../types/INewsData";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import defaultImage from "../assets/images/news_image.jpg";
import routePaths from "../routes/routePaths";
import ICryptoData, { ICoins } from "../types/ICryptoData";
import { useGetCryptosQuery } from "../services/cryptoApi";

const News = forwardRef(({ simplified }: ISimplified, ref: LegacyRef<HTMLDivElement> | undefined = undefined) => {
    const [category, setCategory] = useState("Cryptocurrency")
    const [searched, setSearched] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    const { data: newsData, isFetching, isError } = useGetCryptoNewsQuery({ cryptoCategory: category });
    // const { data: newsData, isFetching, isError } = { data: undefined, isFetching: false, isError: false };

    const { data: cryptoCurrencies, isFetching: isCryptoFetching, isError: isCryptoError } = useGetCryptosQuery({ count: pageSize * 2, offset: 0 })


    useLocalStorage(routePaths.NEWS, newsData);

    if (!localStorage.getItem(routePaths.NEWS) && isError) return <Empty className="main__page-item" />;
    if (isFetching) return <Spin className="main__page-item" />

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
                        style={{ width: "150px" }}
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
                {filteredNews?.slice(pageSize * (pageNumber - 1), simplified ? 10 : pageSize * pageNumber)
                    .map((news: INews, index: number) => (
                        <div className="card-container" key={news.publishedAt}>
                            <a href={news.url} target="_blank" rel="noreferrer" >
                                <Card
                                    ref={index === 0 ? ref : null}
                                    hoverable
                                >
                                    <div className="news__header">
                                        <Typography.Title level={3}>{news.title}</Typography.Title>
                                        <img
                                            src={news.image || defaultImage}
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = defaultImage;
                                            }}
                                        />
                                    </div>
                                    <Divider style={{ margin: "15px 0" }} />
                                    <p>
                                        {news.description?.length > 200
                                            ? `${news.description.slice(0, 200)}...`
                                            : news.description}
                                    </p>
                                    <Divider style={{ margin: "15px 0" }} />
                                    <footer className="news-date">
                                        <p>
                                            {news.source.name}
                                        </p>
                                        <span>
                                            {moment(news.publishedAt).fromNow()}
                                        </span>
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
})

export default News