import {
    Row,
    Col,
    Statistic,
    Typography,
    Empty,
    Spin,
    Divider,
    Tour,
    TourProps,
    FloatButton
} from "antd";
import { Cryptocurrencies, Exchanges, News } from "./";
import { useGetStatsQuery } from "../services/cryptoApi";
import { IStats } from "../types/ICryptoData"
import millify from "millify";
import { Link } from "react-router-dom";
import routePaths from "../routes/routePaths";
import { useRef, useState } from "react";
import cryptoCard from "../assets/images/crypto-card.png";
import newsCard from "../assets/images/news-card.png";

const Homepage = () => {
    const statsRef = useRef(null);
    const coinsRef = useRef(null);
    const newsRef = useRef(null);
    const exchangesRef = useRef(null);
    const { data: cryptoData, isFetching, isError } = useGetStatsQuery({})
    const [open, setOpen] = useState<boolean>(false);

    if (isError) return <Empty className="main__page-item" />
    if (isFetching) return <Spin className="main__page-item" />

    const { totalMarketCap, total, total24hVolume, totalCoins, totalExchanges, totalMarkets } = cryptoData.data.stats as IStats;


    const steps: TourProps['steps'] = [
        {
            title: 'Statistics',
            description: 'Here is the total market and cryptocurrency statistics',
            target: () => statsRef.current,
        },
        {
            title: 'Cryptocurrencies',
            description: 'This section shows you all cryptocurrencies in the market. You can get detailed information by clicking on the crypto card',
            cover: (
                <img
                    alt="crypto image"
                    src={cryptoCard}
                    style={{ width: "200px" }}
                />
            ),
            target: () => coinsRef.current,
        },
        {
            title: 'Latest News',
            description: 'In this section, you can read the latest news about the cryptocurrency and also change the category of the news',
            cover: (
                <img
                    alt="news image"
                    src={newsCard}
                    style={{ width: "200px" }}
                />
            ),
            target: () => newsRef.current,
        },
        {
            title: "Exchanges",
            description: "In this section, you can exchange and compare crypto coins to the first (main) coin on the table. You can also add coins, change the main coin, and its quamtity",
            target: () => exchangesRef.current,
        }
    ];

    return (
        <div className="homepage-container">
            <div className="statistics-container">
                <Divider orientation="left">
                    <Typography.Title level={2} style={{ margin: 0 }}>
                        Global Crypto Stats
                    </Typography.Title>
                </Divider>

                <Row ref={statsRef} gutter={[20, 20]} style={{ textAlign: "center" }}>
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
            <Cryptocurrencies ref={coinsRef} simplified />


            <Divider orientation="left" className="home-heading">
                <Typography.Title level={2}>Latest Crypto News</Typography.Title>
                <Typography.Title level={3}>
                    <Link to={routePaths.NEWS}>Show More</Link>
                </Typography.Title>
            </Divider>
            <News ref={newsRef} simplified />

            <div ref={exchangesRef}>
                <Exchanges />
            </div>
            <FloatButton onClick={() => setOpen(true)} style={{ right: 20, bottom: 25 }} />
            <Tour open={open} steps={steps} onClose={() => setOpen(false)} />
        </div>
    )
}

export default Homepage