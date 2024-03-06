import { Space, Typography } from "antd"
import routePaths from "../routes/routePaths"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="layout__footer">
            <Typography.Text keyboard style={{ color: "#fff", fontSize: "12pt" }}>© Crypto Lab</Typography.Text>
            <p>
                by <a href="https://jahongirhacking.netlify.app/">
                    Jahongir Hayitov
                </a>
            </p>
            <Space size={10} style={{ flexWrap: "wrap", padding: "10px" }}>
                <Link to={routePaths.HOME}>Home</Link>
                <Link to={routePaths.CRYPTO_CURRENCIES}>Cryptocurrances</Link>
                <Link to={routePaths.EXCHANGES}>Exchanges</Link>
                <Link to={routePaths.NEWS}>News</Link>
            </Space>
        </footer>
    )
}

export default Footer