import { Empty, Spin, Space, Input, Row, Card, Col } from "antd";
// import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi"
import ISimplified from "../types/ISimplified"
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import INewsData from "../types/INewsData";
import INews from "../types/INews";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import defaultImage from "../assets/images/btc_icon.png";
const NEWS = "newsData"

const News = ({ simplified }: ISimplified) => {
    // const { data: newsData, isFetching, isError } = useGetCryptoNewsQuery({ cryptoCategory: "bitcoin" });
    const { data: newsData, isFetching, isError } = { data: undefined, isFetching: false, isError: true };
    const [searched, setSearched] = useState("");

    useLocalStorage(NEWS, newsData);

    if (!localStorage.getItem(NEWS) && isError) return <Empty />;
    if (isFetching) return <Spin />

    const currentCryptos = newsData || JSON.parse(localStorage.getItem(NEWS) as string);

    const filteredNews = (currentCryptos as INewsData)?.articles
        .filter((news: INews) => (
            news.title.toLowerCase().includes(searched.toLowerCase())
            ||
            news.content.toLowerCase().includes(searched.toLowerCase())
        ))

    return (
        <Space className="cryptocurrencies" direction="vertical" size={30}>
            {
                !simplified
                &&
                <Input
                    className="search-input"
                    onChange={(e) => setSearched(e.target.value)}
                    addonBefore={<SearchOutlined />}
                    style={{ maxWidth: "350px", width: "95%" }}
                    placeholder="Search Crypto..."
                />
            }
            <Row className="cryptocurrencies-container" gutter={[16, 16]}>
                {filteredNews?.slice(0, simplified ? 10 : 30).map((news: INews) => (
                    <Col xs={24} sm={12} lg={8} xl={6} xxl={4} key={news.publishedAt} style={{ minWidth: "250px" }}>
                        <a href={news.url} >
                            <Card
                                title={news.title}
                                extra={<img src={news.urlToImage || defaultImage} style={{ width: "50px" }} />}
                                hoverable
                            >
                                <p>
                                    {news.description?.length > 100
                                        ? `${news.description.slice(0, 100)}...`
                                        : news.description}
                                </p>
                                <footer>
                                    {moment(news.publishedAt).format("LL")}
                                </footer>
                            </Card>
                        </a>
                    </Col>
                ))}
            </Row>
        </Space>
    )
}

export default News