import React, { useState } from "react";
import { Layout, Menu, message, Card, List } from "antd";
import axios from "axios";
import AppLoader from "../AppLoader";
import { useData } from "../../context/DataContext";
import { useParams } from "react-router-dom";
import { BASE_URL, token, typeletter_id } from "../../helpers";
import FileMerger from "../FileMerger";

const { Header, Sider, Content } = Layout;

const Signed = () => {
  const [content, setContent] = useState("Select a link to see content.");
  const [loading, setLoading] = useState(false);
  const { letterDates } = useData();

  const params = useParams();
  const handleMenuClick = async ({ key }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/v4/typeletter/all-letter/`,
        { typeletter_id, template_id: params.id, letter_date: key },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContent(response.data);
    } catch (error) {
      message.error("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) <AppLoader />;

  return (
    <Layout style={{ minHeight: "100vh", marginTop: 10 }}>
      <Sider style={{ overflowY: "scroll" }} width={250}>
        <div className="logo" />
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          onClick={handleMenuClick}
        >
          {letterDates &&
            letterDates.map((el) => (
              <Menu.Item key={el.letter_date}>{el.letter_date}</Menu.Item>
            ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: 16 }}>
          {loading ? (
            <AppLoader />
          ) : (
            <div style={{ padding: 24, background: "#fff" }}>
              <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={content}
                renderItem={(item) => (
                  <List.Item>
                    <Card title={item.company_name}>
                      <p>Type Letter: {item.typeletter}</p>
                      <p>Pay: {item.pay}</p>
                      <p>Date: {item.letter_date}</p>
                      <a
                        href={`http://45.55.194.72:8003${item.pdf_file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        PDF File
                      </a>
                      <br />
                      <img
                        src={`http://45.55.194.72:8003${item.qr_code}`}
                        alt="QR Code"
                        style={{ marginTop: 10 }}
                      />
                    </Card>
                  </List.Item>
                )}
              />
              <FileMerger />
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Signed;
