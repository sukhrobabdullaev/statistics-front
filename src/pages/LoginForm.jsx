import { Form, Input, Button } from "antd";
import axiosInstance from "../services/api";

const LoginForm = () => {
  const onFinish = async (values) => {
    try {
      const response = await axiosInstance.post("/docs/login", {
        username: values.username,
        password: values.password,
      });

      const { access, refresh } = response.data;

      // Store tokens securely (e.g., in local storage)
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // Redirect to a dashboard or another page upon successful login
      // Replace '/dashboard' with your desired route
      window.location.replace("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure
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
