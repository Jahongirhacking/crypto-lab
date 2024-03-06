import { Avatar, Menu, Typography, Flex, Space } from "antd"
import logoImage from "../assets/images/crypto_logo.png"
import { Link } from "react-router-dom"
import routePaths from "../routes/routePaths"

interface IProps {
    onClose: () => void;
}

const Navbar = ({ onClose }: IProps) => {
    return (
        <Space className="nav-container" direction="vertical" size={30}>
            <Flex gap={10} className="logo-container" >
                <Avatar src={logoImage} size="large" shape="square" />
                <Typography.Title level={3}>
                    <Link to="/" style={{ color: "#fff", fontSize: "14pt" }}>
                        CryptoLab
                    </Link>
                </Typography.Title>
            </Flex>
            <Menu theme="dark" className="nav__menu">
                <Menu.Item key="Home">
                    <Link to={routePaths.HOME} onClick={onClose}>
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="Cryptocurrencies">
                    <Link to={routePaths.CRYPTO_CURRENCIES} onClick={onClose}>
                        Cryptocurrencies
                    </Link>
                </Menu.Item>
                <Menu.Item key="Exchanges">
                    <Link to={routePaths.EXCHANGES} onClick={onClose}>
                        Exchanges
                    </Link>
                </Menu.Item>
                <Menu.Item key="News">
                    <Link to={routePaths.NEWS} onClick={onClose}>
                        News
                    </Link>
                </Menu.Item>
            </Menu>
        </Space>
    )
}

export default Navbar