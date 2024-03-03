import { useEffect } from "react"
import ISimplified from "../types/ISimplified"
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Empty, Spin } from "antd";

const Cryptocurrencies = ({ simplified }: ISimplified) => {
    const count = simplified ? 10 : 100;
    const { data, isFetching, isError } = useGetCryptosQuery(count);


    useEffect(() => {
        console.log(data);
    }, [data, isFetching])

    if (isError) return <Empty />;
    if (isFetching) return <Spin />;

    return (
        <div className="cryptocurrencies-container">
            Cryptocurrencies
        </div>
    )
}

export default Cryptocurrencies