import { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";

const LoginForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch("https://reportx.hsat.uz/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log("Login successful!");
        // Handle successful login here (e.g., redirect the user)
      } else {
        console.error("Login failed.");
        // Handle login failure (display error message, etc.)
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-blue-100">
      <img src="icons/HSAT_logo.png" alt="HSAT logo" className="w-24 h-24" />
      <h3 className="font-bold text-lg text-center leading-4 mb-6 font-mono">
        Toshkent shahar statistika <br /> boshqarmasi
      </h3>
      <Form
        form={form}
        className="bg-white rounded-[14px] border p-24 shadow-md flex flex-col"
        name="basic"
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        autoComplete="on"
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

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-blue-600">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
