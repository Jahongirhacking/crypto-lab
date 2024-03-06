import ISimplified from "../types/ISimplified"
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Card, Empty, Input, Spin, Row, Col, Typography, Space, Pagination } from "antd";
import ICoins from "../types/ICoins";
import { Link } from "react-router-dom";
import millify from "millify";
import { ArrowDownOutlined, ArrowUpOutlined, SearchOutlined } from "@ant-design/icons";
import ICryptoData from "../types/ICryptoData";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import routePaths from "../routes/routePaths";

const Cryptocurrencies = ({ simplified }: ISimplified) => {
    const [searched, setSearched] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    const { data: cryptoCurrencies, isFetching, isError } = useGetCryptosQuery({ count: simplified ? 10 : pageSize, offset: pageSize * (pageNumber - 1) });
    // const { data: cryptoCurrencies, isFetching, isError } = { data: undefined, isFetching: false, isError: true };

    useLocalStorage(routePaths.CRYPTO_CURRENCIES, cryptoCurrencies);

    if (!localStorage.getItem(routePaths.CRYPTO_CURRENCIES) && isError) return <Empty className="main__page-item" />;
    if (isFetching) return <Spin className="main__page-item" />;

    const currentCryptos = cryptoCurrencies
        || JSON.parse(localStorage.getItem(routePaths.CRYPTO_CURRENCIES) as string);

    const filteredCryptos = (currentCryptos as ICryptoData)?.data?.coins
        .filter((crypto: ICoins) => crypto.name.toLowerCase().includes(searched.toLowerCase()))

    return (
        <Space
            className={`cryptocurrencies ${!simplified ? "not-simplified" : ""}`}
            direction="vertical"
            size={30}>
            {
                !simplified
                &&
                <Input
                    className="search-input"
                    onChange={(e) => setSearched(e.target.value)}
                    addonBefore={<SearchOutlined />}
                    placeholder="Search Crypto..."
                />
            }
            <Row className="cryptocurrencies-container" gutter={[16, 16]}>
                {filteredCryptos?.map((crypto: ICoins) => (
                    <Col
                        className="card-container"
                        xs={24} sm={12} lg={8} xl={6} xxl={4}
                        key={crypto.uuid}
                        style={{ minWidth: "250px", maxWidth: "320px" }}>
                        <Link to={`./${crypto.uuid}`}>
                            <Card
                                title={<Typography.Text style={{ color: crypto.color }}>{crypto.rank}. {crypto.name}</Typography.Text>}
                                extra={<img src={crypto.iconUrl} style={{ width: "30px" }} />}
                                hoverable
                            >
                                <p>
                                    Price
                                    <Typography.Text strong style={{ marginLeft: "15px" }}>${millify(Number(crypto.price))}</Typography.Text>
                                </p>
                                <p>
                                    Market Cap
                                    <Typography.Text strong style={{ marginLeft: "15px" }}>${millify(Number(crypto.marketCap))}</Typography.Text>
                                </p>
                                <p>
                                    Daily Change
                                    <Typography.Text
                                        strong
                                        type={Number(crypto.change) > 0 ? "success" : "danger"}
                                        style={{ marginLeft: "15px" }}
                                    >
                                        {Number(crypto.change) >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                        <span style={{ marginLeft: "5px" }}>{crypto.change}%</span>
                                    </Typography.Text>
                                </p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            {
                !simplified
                &&
                <Pagination
                    defaultCurrent={pageNumber}
                    defaultPageSize={pageSize}
                    total={(currentCryptos as ICryptoData).data.stats.totalCoins}
                    onChange={(num, size) => {
                        setPageNumber(num);
                        setPageSize(size);
                    }}
                />
            }
        </Space>
    )
}

export default Cryptocurrencies