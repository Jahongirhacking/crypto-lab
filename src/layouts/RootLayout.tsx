import { Outlet } from "react-router"
import {
    ConfigProvider,
    theme
} from "antd";
import { useSelector } from "react-redux";
import IStore from "../types/IStore";

const { defaultAlgorithm, darkAlgorithm } = theme;

const RootLayout = () => {
    const themeColor = useSelector((state: IStore) => state.theme);
    return (
        <ConfigProvider theme={{
            algorithm: themeColor === "Dark" ? darkAlgorithm : defaultAlgorithm,
        }}>
            <Outlet />
        </ConfigProvider>
    )
}

export default RootLayout