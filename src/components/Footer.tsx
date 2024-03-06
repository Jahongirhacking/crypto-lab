import { Space } from "antd"
import routePaths from "../routes/routePaths"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="layout__footer">
            <p>© Crypto Lab since 2024</p>
            <p>
                by <a href="https://jahongirhacking.netlify.app/">
                    Jahongir Hayitov
                </a>
            </p>
            <Space size={10}>
                <Link to={routePaths.HOME}>Home</Link>
                <Link to={routePaths.CRYPTO_CURRENCIES}>Cryptocurrances</Link>
                <Link to={routePaths.EXCHANGES}>Exchanges</Link>
                <Link to={routePaths.NEWS}>News</Link>
            </Space>
        </footer>
    )
}

export default Footer