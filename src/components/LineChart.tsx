import { Row, Col, Typography } from "antd";
import IHistoryData, { IHistory } from "../types/IHistoryData"
import { Line } from "react-chartjs-2";
import moment from "moment";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface IProps {
    coinHistory: IHistoryData;
    currentPrice: string;
    coinName: string;
}


const LineChart = ({ coinHistory, currentPrice, coinName }: IProps) => {
    const history = coinHistory.data.history;
    const coinPrice = history.map((t: IHistory) => t.price).reverse();
    const coinTimestamp = (history.map((t: IHistory) => moment(Number(t.timestamp) * 1000).format("LL"))).reverse();

    console.log(history);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `${coinName} Price`,
            },
        },
    };

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in US Dollars',
                data: coinPrice,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.4,
            },
        ],
    };

    return (
        <>
            <Row className="chart-header">
                <Typography.Title level={2} className="chart-title">{coinName} Price Chart </Typography.Title>
                <Col className="price-container">
                    <Typography.Title level={5} className="price-change">Change:
                        <Typography.Text style={{
                            color: Number(coinHistory.data.change) < 0 ? "red" : "green",
                            marginLeft: "5px"
                        }}>
                            {Number(coinHistory.data.change) < 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />} {coinHistory?.data?.change}%
                        </Typography.Text>
                    </Typography.Title>
                    <Typography.Title level={5} className="current-price">
                        Current {coinName} Price: <Typography.Text strong>${currentPrice}</Typography.Text>
                    </Typography.Title>
                </Col>
            </Row>
            <Line
                data={data}
                options={options}
            />
        </>
    );
}

export default LineChart