import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  UserOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Content1 from "../components/Contents/Content1";
import Content2 from "../components/Contents/Content2";
import Content3 from "../components/Contents/Content3";
import { decodedToken } from "../helpers";
import { useNavigate, useSearchParams } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(true);
  let [searchParams] = useSearchParams();

  const [selectedItem, setSelectedItem] = useState(
    searchParams.get("step_id") || "1"
  );

  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuItemClick = (key) => {
    searchParams.set("step_id", key);
    if (searchParams) {
      const newUrl = `${window.location.pathname}?step_id=${key}`;
      navigate(newUrl);
    }

    setSelectedItem(key);
  };

  const iconMenu3 = !decodedToken.is_boss ? (
    <UsergroupDeleteOutlined />
  ) : (
    <UploadOutlined />
  );
  const labelMenu3 = decodedToken.is_boss ? "Bo'limlar" : "Hisobotlar ro'yxati";

  return (
    <Layout>
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
              label: "Asosiy Panel",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "KTYADR bazasi",
            },
            {
              key: "3",
              icon: iconMenu3,
              label: labelMenu3,
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
