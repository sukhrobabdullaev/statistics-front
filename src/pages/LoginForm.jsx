import { Form, Input, Button, message } from "antd";
// import axios from "axios";
import { useState } from "react";

const BASE_URL = "https://reportx.hsat.uz";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/account/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const { access, refresh } = data;

        // Store tokens securely (e.g., in local storage)
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        // Redirect to a dashboard or another page upon successful login
        // Replace '/dashboard' with your desired route
        window.location.replace("/dashboard");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed. Please check your credentials.");
      // Handle login failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-blue-100">
      <img src="icons/HSAT_logo.png" alt="HSAT logo" className="w-24 h-24" />
      <h3 className="font-bold text-lg text-center leading-4 mb-6 font-mono">
        Toshkent shahar statistika <br /> boshqarmasi
      </h3>
      <Form
        className="bg-white rounded-[14px] border p-24 shadow-md flex flex-col"
        name="login-form"
        onFinish={onFinish}
      >
        <h3 className="text-center pb-6 text-lg text-gray-600 font-bold animate animation-moveLeftToRight">
          HSAT
        </h3>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Username" className="p-2 w-[250px]" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" className="p-2" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-600"
            loading={loading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
