import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLoader from "../components/AppLoader";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../helpers";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/v1/login/`, {
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        const { access, refresh } = response.data;

        // Store tokens securely (e.g., in local storage)
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        const decodedToken = jwtDecode(access);

        if (
          decodedToken.is_staff &&
          !decodedToken.is_boss &&
          !decodedToken.is_superuser
        ) {
          navigate("/staff-dashboard");
          window.location.reload();
        } else if (
          decodedToken.is_boss &&
          !decodedToken.is_staff &&
          !decodedToken.is_superuser
        ) {
          navigate("/boss-dashboard");
          window.location.reload();
        } else if (
          decodedToken.is_boss &&
          decodedToken.is_staff &&
          decodedToken.is_superuser
        ) {
          navigate("/superuser");
        } else {
          navigate("/");
        }
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      // console.error("Login failed:", error);
      message.error("Login failed. Please check your credentials.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <div className="flex justify-center items-center flex-col h-screen bg-blue-100">
          <img
            src="icons/HSAT_logo.png"
            alt="HSAT logo"
            className="w-24 h-24"
          />
          <h3 className="font-bold text-lg text-center leading-4 mb-6 font-mono">
            Toshkent shahar statistika <br /> boshqarmasi
          </h3>
          <Form
            className="bg-white rounded-[14px] border p-24 shadow-md flex flex-col"
            name="login-form"
            onFinish={onFinish}
            initialValues={{
              csrfmiddlewaretoken: "{{ csrf_token }}", // Include this line for CSRF token
            }}
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
              <Input
                placeholder="Username"
                className="p-2 w-[250px]"
                autoComplete="username"
              />
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
              <Input.Password
                placeholder="Password"
                className="p-2"
                autoComplete="current-password"
              />
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
      )}
    </>
  );
};

export default LoginForm;
