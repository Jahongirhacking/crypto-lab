import { useState } from "react";
import { Drawer, Layout } from "antd"
import { Navbar } from "../components";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import { CloseCircleOutlined, MenuOutlined } from "@ant-design/icons";

const DefaultLayout = () => {
    const [open, setOpen] = useState(false);

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
                    <Layout.Footer>
                        <Footer />
                    </Layout.Footer>
                </Layout.Content>
            </Layout>
        </Layout >
    )
}

export default DefaultLayout