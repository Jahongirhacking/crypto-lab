import { Row, Col, Statistic, Typography, Empty, Spin } from "antd";
import { Cryptocurrencies, News } from "./";
import { useGetStatsQuery } from "../services/cryptoApi";
import IStats from "../types/IStats";
import millify from "millify";
import { Link } from "react-router-dom";
import routePaths from "../routes/routePaths";

const Homepage = () => {
    const { data: cryptoData, isFetching, isError } = useGetStatsQuery({})

    if (isError) return <Empty />
    if (isFetching) return <Spin />

    const { totalMarketCap, total, total24hVolume, totalCoins, totalExchanges, totalMarkets } = cryptoData.data.stats as IStats;

    return (
        <div className="homepage-container">
            <div className="statistics-container">
                <Typography.Title level={2}>
                    Global Crypto Stats
                </Typography.Title>

                <Row>
                    <Col span={12}>
                        <Statistic title="Total Cryptocurrencies" value={total} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Exchanges" value={millify(totalExchanges)} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Market Cap" value={millify(Number(totalMarketCap))} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total 24h Volume" value={millify(Number(total24hVolume))} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Markets" value={millify(totalMarkets)} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Coins" value={millify(totalCoins)} />
                    </Col>
                </Row>
            </div>

            <div className="home-heading">
                <Typography.Title level={2}>Top 10 Cryptos In The World</Typography.Title>
                <Typography.Title level={3}>
                    <Link to={routePaths.CRYPTO_CURRENCIES}>Show More</Link>
                </Typography.Title>
            </div>
            <Cryptocurrencies simplified />

            <div className="home-heading">
                <Typography.Title level={2}>Top 10 Crypto News In The World</Typography.Title>
                <Typography.Title level={3}>
                    <Link to={routePaths.NEWS}>Show More</Link>
                </Typography.Title>
            </div>
            <News simplified />
        </div>
    )
}

export default Homepage