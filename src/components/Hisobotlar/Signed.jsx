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
  Download,
  Mail,
  MailLockOutlined,
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
                <button
                  onClick={handleDownload}
                  className="relative flex items-center px-6 mb-4 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
                >
                  <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                  </span>
                  <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
                  <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                    Bartaraf etilmagan korxonalar
                  </span>
                </button>
              )}
              {content ? (
                <div>
                  <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={content}
                    renderItem={(item) => (
                      <List.Item key={item.id}>
                        <Card title={item.company_name}>
                          <div className="mb-6">
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
                          </div>
                          <img
                            src={`https://hsat.uz${item.qr_code}`}
                            alt="QR Code"
                            style={{ marginTop: 10 }}
                          />
                          <div className="flex gap-1">
                            <a
                              href={mergedPdf}
                              download={`${item.company_name}-${isTemplate(
                                typeletter_id
                              )}`}
                            >
                              <Button
                                onClick={() => setSelectedItem(item)}
                                className="flex gap-1 bg-green-400 text-white"
                              >
                                <Download /> Yuklab olish
                              </Button>
                            </a>
                            <Button
                              onClick={() => handleSigned(item.id)}
                              className="flex gap-1 bg-orange-400 w-1/2 text-white"
                            >
                              Baholash
                            </Button>
                          </div>
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
                  pdfUrl={`https://hsat.uz${selectedItem.pdf_file}`}
                  qrCodeUrl={`https://hsat.uz${selectedItem.qr_code}`}
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
