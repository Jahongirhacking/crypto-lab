import { useState } from "react";
import { Drawer, FloatButton, Layout } from "antd"
import { Navbar } from "../components";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import { CloseCircleOutlined, MenuOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../app/themeSlice";
import IStore from "../types/IStore";

const DefaultLayout = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const theme: ("Dark" | "Light") = useSelector((state: IStore) => state.theme)

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <Layout style={{
            width: '100%',
            minHeight: '100dvh',
        }} >
            <Drawer
                keyboard
                footer="Crypto Lab v.1.0"
                className="layout__aside"
                open={open}
                onClose={onClose}
                placement="left"
                closeIcon={
                    <CloseCircleOutlined style={{ color: "#fff", fontSize: "16pt" }} />
                }
            >
                <Navbar onClose={onClose} />
            </Drawer>
            <Layout>
                <Layout.Content className="main">
                    <MenuOutlined
                        onClick={showDrawer}
                        style={{
                            position: "absolute",
                            top: "18px",
                            left: "14px",
                            fontSize: "16pt",
                            zIndex: 1
                        }} />
                    <Outlet />
                    <FloatButton.Group
                        shape="circle"
                        style={{ right: 20, top: 30 }}>
                        <FloatButton
                            icon={theme === "Dark"
                                ? <SunOutlined />
                                : <MoonOutlined />
                            }
                            onClick={() => dispatch(toggleTheme())}
                        />
                        <FloatButton.BackTop />
                    </FloatButton.Group>
                    <Footer />
                </Layout.Content>
            </Layout>
        </Layout >
    )
}

export default DefaultLayout