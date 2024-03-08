import { Row, Col, Statistic, Typography, Empty, Spin, Divider } from "antd";
import { Cryptocurrencies, Exchanges, News } from "./";
import { useGetStatsQuery } from "../services/cryptoApi";
import IStats from "../types/IStats";
import millify from "millify";
import { Link } from "react-router-dom";
import routePaths from "../routes/routePaths";

const Homepage = () => {
    const { data: cryptoData, isFetching, isError } = useGetStatsQuery({})

    if (isError) return <Empty className="main__page-item" />
    if (isFetching) return <Spin className="main__page-item" />

    const { totalMarketCap, total, total24hVolume, totalCoins, totalExchanges, totalMarkets } = cryptoData.data.stats as IStats;

    return (
        <div className="homepage-container">
            <div className="statistics-container">
                <Divider orientation="left">
                    <Typography.Title level={2}>
                        Global Crypto Stats
                    </Typography.Title>
                </Divider>

                <Row gutter={[20, 20]} style={{ textAlign: "center" }}>
                    <Col xs={24} sm={12} lg={8} >
                        <Statistic title="Total Cryptocurrencies" value={total} />
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Statistic title="Total Exchanges" value={millify(totalExchanges)} />
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Statistic title="Total Market Cap" value={millify(Number(totalMarketCap))} />
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Statistic title="Total 24h Volume" value={millify(Number(total24hVolume))} />
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Statistic title="Total Markets" value={millify(totalMarkets)} />
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Statistic title="Total Coins" value={millify(totalCoins)} />
                    </Col>
                </Row>
            </div>

            <Divider orientation="left" className="home-heading">
                <Typography.Title level={2}>Top 10 Cryptos In The World</Typography.Title>
                <Typography.Title level={3}>
                    <Link to={routePaths.CRYPTO_CURRENCIES}>Show More</Link>
                </Typography.Title>
            </Divider>
            <Cryptocurrencies simplified />

            <Divider orientation="left" className="home-heading">
                <Typography.Title level={2}>Latest Crypto News</Typography.Title>
                <Typography.Title level={3}>
                    <Link to={routePaths.NEWS}>Show More</Link>
                </Typography.Title>
            </Divider>
            <News simplified />
            <Exchanges />
        </div>
    )
}

export default Homepage