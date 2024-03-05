import ISimplified from "../types/ISimplified"
// import { useGetCryptosQuery } from "../services/cryptoApi";
import { Card, Empty, Input, Spin, Row, Col, Typography, Space } from "antd";
import ICoins from "../types/ICoins";
import { Link } from "react-router-dom";
import millify from "millify";
import { ArrowDownOutlined, ArrowUpOutlined, SearchOutlined } from "@ant-design/icons";
import ICryptoData from "../types/ICryptoData";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
const CRYPTO = "cryptocurrenciesData"

const Cryptocurrencies = ({ simplified }: ISimplified) => {
    const [searched, setSearched] = useState("");
    // const { data: cryptoCurrencies, isFetching, isError } = useGetCryptosQuery(simplified ? 10 : 100);
    const { data: cryptoCurrencies, isFetching, isError } = { data: undefined, isFetching: false, isError: true };


    useLocalStorage(CRYPTO, cryptoCurrencies);

    if (!localStorage.getItem(CRYPTO) && isError) return <Empty />;
    if (isFetching) return <Spin />;

    const currentCryptos = cryptoCurrencies || JSON.parse(localStorage.getItem(CRYPTO) as string);

    const filteredCryptos = (currentCryptos as ICryptoData)?.data?.coins
        .filter((crypto: ICoins) => crypto.name.toLowerCase().includes(searched.toLowerCase()))

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
                {filteredCryptos?.map((crypto: ICoins) => (
                    <Col xs={24} sm={12} lg={8} xl={6} xxl={4} key={crypto.uuid} style={{ minWidth: "250px" }}>
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
                                        {crypto.change}%
                                    </Typography.Text>
                                </p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Space>
    )
}

export default Cryptocurrencies