import React, { useState, useEffect } from "react";
import { Layout, Menu, message, Card, List, Button } from "antd";
import axios from "axios";
import AppLoader from "../AppLoader";
import { useData } from "../../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL, isTemplate, token, typeletter_id } from "../../helpers";
import FileMerger from "../FileMerger";
import {
  DateRangeOutlined,
  DateRangeSharp,
  DateRangeTwoTone,
  RemoveRedEye,
} from "@mui/icons-material";

const { Header, Sider, Content } = Layout;

const Signed = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mergedPdf, setMergedPdf] = useState(null);
  const { letterDates } = useData();
  const [letterDate, setLetterDate] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (letterDates && letterDates.length > 0) {
      fetchData(letterDates[0].letter_date);
    }
  }, [letterDates]);

  const fetchData = async (letterDate) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/v4/typeletter/all-letter/`,
        { typeletter_id, template_id: params.id, letter_date: letterDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setContent(response.data);
      }
    } catch (error) {
      message.error("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = ({ key }) => {
    fetchData(key);
    setLetterDate(key);
  };

  const handleSigned = (id) => {
    navigate(`/signed-letters/${params.id}/${id}`);
  };

  const handleDownload = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/v4/typeletter/getinn-nopay/`,
        {
          typeletter_id,
          letter_date: letterDate,
          template_id: params.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Ensure the response is a blob
        }
      );

      if (response.status == 200) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", "inn_numbers_nopay.xlsx"); // Set the desired file name
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout style={{ minHeight: "100vh", marginTop: 10 }}>
      <Sider style={{ overflowY: "scroll" }} width={200}>
        <h3 className="mx-4 text-lg font-semibold text-center font-serif">
          XAT sanalari
        </h3>
        {letterDates.length === 0 && (
          <span className="flex items-center flex-col font-semibold text-base font-mono justify-center min-h-screen">
            <DateRangeTwoTone />
            Topilmadi
          </span>
        )}
        <Menu
          defaultSelectedKeys={
            letterDates && letterDates.length > 0
              ? [letterDates[0].letter_date]
              : []
          }
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
        <Content style={{ margin: 16 }}>
          {loading ? (
            <AppLoader />
          ) : (
            <div style={{ padding: 24, background: "#fff" }}>
              {letterDates.length !== 0 && (
                <Button className="mb-4" onClick={handleDownload}>
                  NO PAY DOWNLOAD
                </Button>
              )}
              {content ? (
                <div>
                  <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={content}
                    renderItem={(item) => (
                      <List.Item key={item.id}>
                        <Card title={item.company_name}>
                          <p className="font-semibold">
                            Xat turi:
                            <span className="font-normal">
                              {item.typeletter}
                            </span>
                          </p>
                          <p className="font-semibold">
                            Pay:
                            <span className="font-normal"> {item.pay}</span>
                          </p>
                          <p className="font-semibold">
                            Sana:
                            <span className="font-normal">
                              {item.letter_date}
                            </span>
                          </p>

                          <img
                            src={`http://45.55.194.72:8003${item.qr_code}`}
                            alt="QR Code"
                            style={{ marginTop: 10 }}
                          />
                          <a
                            href={mergedPdf}
                            download={`${item.company_name}-${isTemplate(
                              typeletter_id
                            )}`}
                          >
                            <Button onClick={() => setSelectedItem(item)}>
                              VIEW
                            </Button>
                            <Button onClick={() => handleSigned(item.id)}>
                              IN DETAIL
                            </Button>
                          </a>
                        </Card>
                      </List.Item>
                    )}
                  />
                </div>
              ) : (
                <div className="flex justify-center">
                  <img
                    src="/imgs/not_found.png"
                    alt="not found"
                    width={500}
                    height={500}
                  />
                </div>
              )}
              {selectedItem && (
                <FileMerger
                  pdfUrl={`http://45.55.194.72:8003${selectedItem.pdf_file}`}
                  qrCodeUrl={`http://45.55.194.72:8003${selectedItem.qr_code}`}
                  mergedPdf={mergedPdf}
                  setMergedPdf={setMergedPdf}
                />
              )}
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Signed;
