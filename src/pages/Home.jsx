import { Button, Checkbox, Form, Input } from "antd";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Home = () => {
  return (
    <div className="flex justify-center items-center flex-col h-screen bg-blue-100">
      <img src="icons/HSAT_logo.png" alt="HSAT logo" className="w-24 h-24" />
      <h3 className="font-bold text-lg text-center leading-4 mb-6 font-mono">
        Toshkent shahar statistika <br /> boshqarmasi
      </h3>
      <Form
        className="bg-white rounded-[14px] border p-24 shadow-md flex flex-col"
        name="basic"
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
              message: "Iltimos loginni kiriting!",
            },
          ]}
        >
          <Input placeholder="Login" className="p-2 w-[250px]" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Iltimos parolni kiriting!",
            },
          ]}
        >
          <Input.Password placeholder="Parol" className="p-2" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Meni eslab qol!</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-blue-600">
            Kirish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Home;
