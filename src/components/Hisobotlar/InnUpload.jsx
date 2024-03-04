import React, { useState } from "react";
import { message, Upload } from "antd";
import { InboxOutlined } from "@mui/icons-material";
import { BASE_URL } from "../../helpers";
const { Dragger } = Upload;

const InnUpload = () => {
  const [uploaded, setUploaded] = useState(false);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${BASE_URL}/letter/get_inn/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      message.success(`${file.name} file uploaded successfully.`);
      setUploaded(true);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      message.error(`${file.name} file upload failed.`);
    }
  };

  const props = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
      const isExcel =
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isExcel) {
        message.error("You can only upload Excel files!");
        return false;
      }
      return true;
    },
    onChange: (info) => {
      const { status } = info.file;
      if (status === "done") {
        uploadFile(info.file.originFileObj);
      }
    },
    disabled: uploaded,
    showUploadList: false,
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        {uploaded
          ? "File uploaded. Further uploads disabled."
          : "Click or drag file to upload"}
      </p>
      {uploaded && (
        <p className="ant-upload-hint">
          You can only upload one file, and further uploads are disabled.
        </p>
      )}
    </Dragger>
  );
};

export default InnUpload;
