import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Form, Select, Input, Button, Typography, Row, Col } from "antd";
import { BASE_URL, token } from "../../helpers";
import AppLoader from "../AppLoader";

const { Title, Paragraph } = Typography;

const SignedXat = () => {
  const [loading, setLoading] = useState(false);
  const [signed, setSigned] = useState(null);
  const { xat } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/v4/typeletter/all-letter/${xat}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          setSigned(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [xat]);

  const handleSend = async (values) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${BASE_URL}/v4/typeletter/all-letter/${xat}/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", res);
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <AppLoader />;

  const isComparasion = new Date() > new Date(signed && signed.letter_date);

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
      initialValues={{
        pay: signed ? signed.pay : undefined,
        comment: "",
      }}
    >
      <Col span={12}>
        <div style={{ textAlign: "center" }}>
          {signed && (
            <div>
              <Title level={4}>KOMPANIYA: {signed.company_name}</Title>
              <Paragraph className="font-semibold">
                XAT VAQTI:
                <span className="font-normal"> {signed.letter_date}</span>
              </Paragraph>
              <Paragraph className="font-semibold">
                XAT TURI:
                <span className="font-normal"> {signed.typeletter}</span>
              </Paragraph>
              <Paragraph className="font-semibold">
                XAT HOLATI:
                <span className="font-normal"> {signed.pay}</span>
              </Paragraph>
            </div>
          )}

          <Form onFinish={handleSend} layout="vertical">
            <Form.Item
              name="pay"
              rules={[
                {
                  required: true,
                  message: "Iltimos to'lov holatini belgilang!",
                },
              ]}
            >
              <Select>
                <Select.Option value="Bartaraf etildi">
                  Bartaraf etildi
                </Select.Option>
                <Select.Option value="Bartaraf etilmadi">
                  Bartaraf etilmadi
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="comment"
              rules={[
                { required: true, message: "Iltimos fikringizni qoldiring!" },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isComparasion}
                loading={loading}
                className="bg-blue-600"
              >
                Saqlash
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default SignedXat;
