import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";

const getBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
};

const beforeUpload = (file) => {
  const isExcel =
    file.type === "application/vnd.ms-excel" ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if (!isExcel) {
    message.error("Siz faqat excel fayl yulay olasiz!");
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error("Excel 5MB dan ko'p bo'lmasin!");
  }
  return isExcel && isLt2M;
};

const SuperUser = () => {
  const [loading, setLoading] = useState(false);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get the image url from the response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });

      // Prepare form data
      const formData = new FormData();
      formData.append("excelFile", info.file.originFileObj);

      // Make POST request
      axios
        .post("YOUR_API_ENDPOINT", formData)
        .then((response) => {
          // Handle success
          console.log("File uploaded successfully:", response);
        })
        .catch((error) => {
          // Handle error
          console.error("Error uploading file:", error);
        });
    }
  };

  return (
    <div className="max-w-[1200px] text-center h-full mx-auto mt-5 flex flex-col gap-6">
      <h1 className="text-3xl font-semibold font-mono">Zarik Baza yuklash</h1>

      <Upload
        name="zarik_file"
        listType="picture-circle"
        showUploadList={false}
        maxCount={1}
        multiple={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      >
        <button
          style={{
            border: 0,
            background: "none",
          }}
          type="button"
        >
          yuklash
        </button>
      </Upload>
    </div>
  );
};

export default SuperUser;
