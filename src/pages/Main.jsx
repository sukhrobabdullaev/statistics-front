import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Helmet } from "react-helmet";
import Content1 from "../components/Contents/Content1";
import Content2 from "../components/Contents/Content2";
import Content3 from "../components/Contents/Content3";
const { Header, Sider, Content } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedItem, setSelectedItem] = useState("1");

  const handleMenuItemClick = (key) => {
    setSelectedItem(key);
  };
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin Panel</title>
        <link rel="canonical" href="http://hsat.uz/adminPanel" />
      </Helmet>
      <Sider trigger={null} collapsible collapsed={!collapsed} className="pt-3">
        <Menu
          mode="inline"
          className=""
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedItem]}
          onClick={({ key }) => handleMenuItemClick(key)}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Hujjatlar",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "documents",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "something",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "75vh",
            background: colorBgContainer,
          }}
        >
          {selectedItem === "1" && <Content1 />}
          {selectedItem === "2" && <Content2 />}
          {selectedItem === "3" && <Content3 />}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Main;
