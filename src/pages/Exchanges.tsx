import { Avatar, Button, Col, Divider, Empty, InputNumber, Select, Space, Spin, Table, TableProps, Typography, message } from "antd"
import { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import ICryptoData, { ICoins } from "../types/ICryptoData";
import { DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import IStore from "../types/IStore";
import checkLocalStorage from "../utils/checkLocalStorage";
import updateLocalStorage from "../utils/updateLocalStorage";

interface IDataSource {
    key: string;
    name: string;
    rank: number;
    symbol: string;
    iconUrl: string;
    price: string;
    quantity: number;
}

const Exchanges = () => {
    const [mainCoinQuantity, setMainCoinQuantity] = useState(checkLocalStorage("mainCoinQuantity", 1));
    const [mainCoinSymbol, setMainCoinSymbol] = useState(checkLocalStorage("mainCoinSymbol", "BTC"));
    const [tableData, setTableData] = useState(checkLocalStorage("tableData", ["ETH", "DOGE", "TON"]));
    const theme = useSelector((state: IStore) => state.theme);

    useEffect(() => {
        updateLocalStorage("mainCoinQuantity", mainCoinQuantity);
        updateLocalStorage("mainCoinSymbol", mainCoinSymbol);
        updateLocalStorage("tableData", tableData);
    }, [mainCoinQuantity, mainCoinSymbol, tableData])

    const [newRowCoin, setNewRowCoin] = useState("");
    const [messageApi, contextHolder] = message.useMessage()

    const { data, isFetching, isError } = useGetCryptosQuery({ count: 50, offset: 0 })

    if (isError) return <Empty className="main__page-item" />
    if (isFetching) return <Spin className="main__page-item" />

    const coins: ICoins[] = (data as ICryptoData).data.coins.filter((coin: ICoins) => coin.symbol !== mainCoinSymbol);

    const mainCoin: ICoins = (data as ICryptoData).data.coins.find((coin: ICoins) => coin.symbol === mainCoinSymbol) as ICoins
    const filteredCoins: ICoins[] = coins.filter((coin: ICoins) => tableData.includes(coin.symbol));

    const onNameChange = (symbol: string, prevName: string) => {
        const prevSymbol = coins.find((coin: ICoins) => coin.name === prevName)?.symbol;
        if (!prevSymbol) return setMainCoinSymbol(symbol);
        const nexTableData = [...tableData];
        if (prevSymbol) nexTableData[nexTableData.indexOf(prevSymbol)] = symbol;
        setTableData(nexTableData);
    }

    const handleAddCoin = () => {
        if (newRowCoin) {
            setTableData([...tableData, newRowCoin]);
            messageApi.success(`${newRowCoin} is on the Table now!`)
        }
        setNewRowCoin("");
    }

    const handleDeleteCoin = (symbol: string) => {
        setTableData([...tableData].filter(sym => sym !== symbol))
    }

    const dataSource: IDataSource[] = [
        {
            key: "main",
            rank: mainCoin.rank,
            name: mainCoin.name,
            symbol: mainCoin.name,
            iconUrl: mainCoin.iconUrl,
            price: mainCoin.price,
            quantity: mainCoinQuantity,
        },
        ...(
            filteredCoins.map((coin: ICoins) => ({
                key: coin.uuid,
                rank: coin.rank,
                iconUrl: coin.iconUrl,
                name: coin.name,
                price: coin.price,
                symbol: coin.symbol,
                quantity: mainCoinQuantity * Number(mainCoin?.price) / Number(coin.price)
            }))
        )
    ]

    const columns: TableProps<IDataSource>["columns"] = [
        {
            title: "#Rank",
            dataIndex: "rank",
            key: "rank",
        },
        {
            title: "Icon Name Price",
            render: (record: IDataSource) => (
                <Space size={5} direction="vertical" style={{ textAlign: "center" }}>
                    <Avatar src={`${record.iconUrl}`} style={{ width: "30px" }} />
                    <Select defaultValue={record.name} options={
                        coins.map((coin: ICoins) => ({
                            label: coin.name,
                            value: coin.symbol
                        }))}
                        onChange={(symbol) => onNameChange(symbol, record.name)}
                    />
                    <span>${Number(record.price).toFixed(4)}</span>
                </Space>
            ),
            responsive: ['xs']
        },
        {
            title: "Icon",
            dataIndex: "iconUrl",
            key: "iconUrl",
            render: (url) => <Avatar src={`${url}`} style={{ width: "30px" }} />,
            responsive: ['sm']
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (name) => (
                <Select defaultValue={name} options={
                    coins.map((coin: ICoins) => ({
                        label: coin.name,
                        value: coin.symbol
                    }))}
                    onChange={(symbol) => onNameChange(symbol, name)}
                />
            ),
            responsive: ["sm"]
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => `$${Number(price).toFixed(4)}`,
            responsive: ['sm']
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            render: (q: number, record: IDataSource) => record.key === "main"
                ? <InputNumber
                    defaultValue={Number(q.toFixed(2))}
                    min={1}
                    onChange={(val) => val && setMainCoinQuantity(val)}
                />
                : `~${q.toFixed(2)}`
        },
        {
            title: "Delete",
            dataIndex: "symbol",
            key: "delete",
            render: (symbol: string, record: IDataSource) => record.key !== "main"
                && <DeleteOutlined onClick={() => handleDeleteCoin(symbol)} style={{ color: "red", fontSize: "13pt" }} />
        }
    ];

    return (
        <>
            {contextHolder}
            <Col className="coin-exchanges-container" style={{ width: "100%" }}>
                <Divider orientation="center">
                    <Typography.Title level={2} style={{ margin: 0 }}>
                        Coin Exchanges
                    </Typography.Title>
                </Divider>
                <Space.Compact>
                    <Button type="primary" icon={<PlusCircleFilled />} onClick={handleAddCoin}>Add Coin</Button>
                    <Select
                        value={newRowCoin || undefined}
                        placeholder={"Select Coin"}
                        options={coins.filter((coin: ICoins) => !tableData.includes(coin.symbol))
                            .map((coin: ICoins) => ({ label: coin.name, value: coin.symbol }))}
                        onChange={setNewRowCoin}
                        style={{ minWidth: "150px" }}
                    />
                </Space.Compact>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    style={{ overflowX: "auto" }}
                    className={`table-row-${theme.toLowerCase()}`}
                />
                <Typography.Title level={3}>Total Price: ${(Number(mainCoin.price) * mainCoinQuantity).toFixed(2)}</Typography.Title>
            </Col>
        </>
    )
}

export default Exchanges