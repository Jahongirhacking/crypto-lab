import { useParams } from "react-router"
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi";
import IDetails, { ICoinDetails } from "../types/IDetailsData";
import { Card, Col, Divider, Empty, Row, Select, Spin, Typography } from "antd";
import { useState } from "react";
import millify from "millify";
import { CheckOutlined, DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, MoneyCollectOutlined, NumberOutlined, StopOutlined, ThunderboltOutlined, TrophyOutlined } from "@ant-design/icons";
import HTMLReactParser from "html-react-parser/lib/index";
import LineChart from "../components/LineChart";

const CryptoDetails = () => {
    const { id } = useParams();
    const [timePeriod, setTimePeriod] = useState("7d");

    const { data: detailsData, isFetching, isError } = useGetCryptoDetailsQuery(id);
    const { data: coinHistory, isFetching: isFetchingHistory, isError: isErrorHistory } = useGetCryptoHistoryQuery({ id, timePeriod });

    if (isError) return <Empty className="main__page-item" />
    if (isFetching) return <Spin className="main__page-item" />

    const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

    const cryptoDetails: ICoinDetails = (detailsData as IDetails).data.coin;

    const stats = [
        { title: 'Price to USD', value: `$${cryptoDetails?.price && millify(Number(cryptoDetails?.price))}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$${cryptoDetails["24hVolume"] && millify(Number(cryptoDetails["24hVolume"]))}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$${cryptoDetails?.marketCap && millify(Number(cryptoDetails?.marketCap))}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$${cryptoDetails?.allTimeHigh?.price && millify(Number(cryptoDetails?.allTimeHigh?.price))}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined style={{ color: "green" }} /> : <StopOutlined style={{ color: "red" }} />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$${cryptoDetails?.supply?.total && millify(Number(cryptoDetails?.supply?.total))}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$${cryptoDetails?.supply?.circulating && millify(Number(cryptoDetails?.supply?.circulating))}`, icon: <ExclamationCircleOutlined /> },
    ];

    return (
        <Col className="coin-details-container">
            <Col className="coin-heading-container">
                <Divider orientation="center">
                    <div style={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
                        <img src={cryptoDetails.iconUrl} style={{ width: "30px" }} />
                        <Typography.Title level={2} style={{ margin: 0 }}>
                            {cryptoDetails.name} ({cryptoDetails.symbol}) Price
                        </Typography.Title>
                    </div>
                </Divider>
                <p>
                    {cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply
                </p>
            </Col>
            <Row style={{ alignItems: "center" }}>
                <Typography.Text style={{ marginRight: "15px" }}>Select Time Range: </Typography.Text>
                <Select
                    defaultValue={timePeriod}
                    options={time.map(t => ({ label: t, value: t }))}
                    onChange={(val: string) => setTimePeriod(val)}
                    style={{ width: "100px" }}
                    title="Time Range"
                />
            </Row>
            {
                isErrorHistory ? <Empty /> : isFetchingHistory ? <Spin /> :
                    <LineChart
                        coinHistory={coinHistory}
                        coinName={cryptoDetails.name}
                        currentPrice={cryptoDetails.price}
                    />
            }
            <Col className="stats-container">
                <Col className="coin-statistics-container">
                    <Col className="stats-heading">
                        <Divider orientation="center">
                            <Typography.Title level={3} style={{ margin: 0 }}>
                                {cryptoDetails.name} Value Statistics
                            </Typography.Title>
                        </Divider>
                        <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    </Col>
                    <Col className="stats-body">
                        {
                            stats.map(({ title, value, icon }) => (
                                <Row className="coin-stats" key={title}>
                                    <Row className="coin-stats-name">
                                        {icon}
                                        <Typography.Text>{title}</Typography.Text>
                                    </Row>
                                    <Typography.Text className="coin-stats-value">{value}</Typography.Text>
                                </Row>
                            ))
                        }
                    </Col>
                </Col>
                <Col className="coin-statistics-container">
                    <Col className="stats-heading">
                        <Divider orientation="center">
                            <Typography.Title level={3} style={{ margin: 0 }}>
                                Other Stats Info
                            </Typography.Title>
                        </Divider>
                        <p>An overview showing the statistics of {cryptoDetails.name}, such as the the number of markets and exchanges, supply.</p>
                    </Col>
                    <Col className="stats-body">
                        {
                            genericStats.map(({ title, value, icon }) => (
                                <Row className="coin-stats" key={title}>
                                    <Row className="coin-stats-name">
                                        {icon}
                                        <Typography.Text>{title}</Typography.Text>
                                    </Row>
                                    <Typography.Text className="coin-stats-value">{value}</Typography.Text>
                                </Row>
                            ))
                        }
                    </Col>
                </Col>
            </Col>
            <Col className="coin-desc-link">
                <Card
                    hoverable
                    className="coin-desc"
                    title={
                        <Typography.Title level={3} className="coin-details-heading">
                            What is {cryptoDetails.name}?
                        </Typography.Title>
                    }
                >
                    <Typography.Text italic style={{ fontSize: "13pt" }}>{HTMLReactParser(cryptoDetails.description)}</Typography.Text>
                </Card>
                <Col className="coin-links">
                    <Divider orientation="center">
                        <Typography.Title level={3} className="coin-details-heading" style={{ margin: 0 }}>
                            {cryptoDetails.name} Links
                        </Typography.Title>
                    </Divider>
                    {cryptoDetails.links?.map((link) => (
                        <Row className="coin-link" key={link.name}>
                            <Typography.Title level={5} className="link-name">{link.type}</Typography.Title>
                            <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    )
}

export default CryptoDetails