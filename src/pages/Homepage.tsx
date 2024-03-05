import { Row, Col, Statistic, Typography } from "antd";
import { Cryptocurrencies, News } from "./";

const Homepage = () => {
    return (
        <div className="homepage-container">
            <Typography.Title level={2}>
                Global Crypto Stats
            </Typography.Title>
            <div className="statistics-container">
                <Row>
                    <Col span={12}>
                        <Statistic title="Total Cryptocurrencies" value={5} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Exchanges" value={5} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Market Cap" value={5} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total 24h Volume" value={5} />
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Markets" value={5} />
                    </Col>
                </Row>
                <Cryptocurrencies simplified />
                <News simplified />
            </div>
        </div>
    )
}

export default Homepage