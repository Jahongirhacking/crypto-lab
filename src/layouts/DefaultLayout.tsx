import { Layout } from "antd"
import { Navbar } from "../components";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

const DefaultLayout = () => {
    return (
        <Layout style={{
            width: '100%',
            minHeight: '100dvh',
        }} >
            <Layout.Sider width="25%" style={{
                color: '#fff',
                backgroundColor: '#001529',
            }}>
                <Navbar />
            </Layout.Sider>
            <Layout>
                <Layout.Content className="main">
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