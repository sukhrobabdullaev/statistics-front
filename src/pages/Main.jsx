import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Content1 from "../components/Contents/Content1";
import Content2 from "../components/Contents/Content2";
import Content3 from "../components/Contents/Content3";
import { decodedToken } from "../helpers";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Add,
  MailLockRounded,
  SignalCellular0Bar,
  SignLanguageOutlined,
} from "@mui/icons-material";
import Content4 from "../components/Contents/Content4";
import Content5 from "../components/Contents/Content5";
import "./Main.css";
import Content6 from "../components/Contents/Content6";
import Content7 from "../components/Contents/Content7";

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
  // Check if decodedToken is available before accessing its properties
  const isBoss = decodedToken ? decodedToken.is_boss : false;

  const iconMenu3 = !isBoss ? <UsergroupDeleteOutlined /> : <UploadOutlined />;
  const labelMenu3 =
    isBoss && !decodedToken.is_superuser ? "Bo'limlar" : "Hisobotlar ro'yxati";

  const iconMenu4 = !isBoss && <Add />;
  const labelMenu4 = !isBoss && "Hisobot yaratish";

  const iconMenu5 = !isBoss && <SignLanguageOutlined />;
  const labelMenu5 = !isBoss && "Baholash";

  const iconMenu6 = !isBoss && <MailLockRounded />;
  const labelMenu6 = !isBoss && "Pochtaga yuborish";

  const iconMenu7 = !isBoss && <SignalCellular0Bar />;
  const labelMenu7 = !isBoss && "Imzolangan xatlar";

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={!collapsed} className="pt-3">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="custom-bg"
          selectedKeys={[selectedItem]}
          onClick={({ key }) => handleMenuItemClick(key)}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Asosiy Panel",
            },
            {
              key: "3",
              icon: iconMenu3,
              label: labelMenu3,
            },
            !isBoss && {
              key: "4",
              icon: iconMenu4,
              label: labelMenu4,
            },
            !isBoss && {
              key: "5",
              icon: iconMenu5,
              label: labelMenu5,
            },
            !isBoss && {
              key: "6",
              icon: iconMenu6,
              label: labelMenu6,
            },
            !isBoss && {
              key: "7",
              icon: iconMenu7,
              label: labelMenu7,
            },
          ].filter(Boolean)}
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
          {selectedItem === "4" && <Content4 />}
          {selectedItem === "5" && <Content5 />}
          {selectedItem === "6" && <Content6 />}
          {selectedItem === "7" && <Content7 />}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Main;
