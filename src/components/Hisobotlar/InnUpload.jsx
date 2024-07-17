import { useNavigate, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { BASE_URL, token, typeletter_id } from "../../helpers/index";
import { useEffect, useState } from "react";
import ModalConf from "../ModalConf";
import { message, Upload, Button, Select, Form, Alert } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AppLoader from "../AppLoader";
import axios from "axios";
import "./InnUpload.css";

const InnUpload = () => {
  const [uploadedData, setUploadedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false); // New state variable
  const [error, setError] = useState(null);
  const [boss, setBoss] = useState([]);
  const [selectedBoss, setSelectedBoss] = useState(null); // New state variable

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before starting the request
      try {
        const response = await axios.get(`${BASE_URL}/v2/all-boss/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // Replace with your API endpoint
        setBoss(response?.data?.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after the request is completed
      }
    };
    const fetchLetters = async () => {
      setLoading(true); // Set loading to true before starting the request
      try {
        const response = await axios.get(
          `${BASE_URL}/v4/typeletter/letter3-update/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setRows(response?.data?.results);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after the request is completed
      }
    };

    fetchData();
    fetchLetters();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const params = useParams();
  let template_id = localStorage.getItem("template_id");

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/v2/create_inn_number/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUploadedData(data);
        setIsSubmitDisabled(true);
        message.success("Imzolashga muvaffaqiyatli yuborildi!");
        window.location.reload();
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `An error occurred: ${response.statusText}`
        );
      }
    } catch (error) {
      message.error(
        `Jo'natishda muammo bo'ldi, iltimos yana harakat qilib ko'ring!`
      );
    } finally {
      setLoading(false);
    }
  };

  const showModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    const formData = new FormData();
    formData.append("typeletter_id", template_id);
    formData.append("id", params.id);
    formData.append("user_boss", selectedBoss); // Include selected boss

    if (fileList.length > 0) {
      formData.append("excel_file", fileList[0].originFileObj);
    }

    await handleSubmit(formData);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    message.error("Bekor qilindi!");
  };

  const handleChange = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1); // Keep only the last file
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.status = file.response.status === "success" ? "done" : "error";
      }
      return file;
    });
    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    const isExcel =
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel";
    if (!isExcel) {
      message.error("Faqat Excel fayllarini yuklash mumkin!");
    }
    return isExcel || Upload.LIST_IGNORE;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "company_name",
      headerName: "Kompaniya",
      width: 400,
    },
    {
      field: "inn_number",
      headerName: "INN raqami",
      width: 200,
    },
    {
      field: "send_by_staff",
      headerName: "Holati",
      width: 200,
      renderCell: (params) =>
        params.value ? (
          <span className="text-blue-600">Yuborildi</span>
        ) : (
          <span className="text-orange-600">Yuborilmadi</span>
        ),
    },
    {
      field: "signed_state",
      headerName: "Imzolanganlik holati",
      width: 200,
      renderCell: (params) =>
        params.value ? (
          <span className="text-blue-600">Imzolandi</span>
        ) : (
          <span className="text-orange-600">Imzolanmadi</span>
        ),
    },
  ];

  const handleClickRow = (params) => {
    if (localStorage.getItem("template_id") === "3") {
      navigate(`/revison/${id}/inn_upload/${params.id}`);
    }
    return;
  };
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="md:max-w-[1200px] h-full mx-auto mt-5">
      <div
        className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50   "
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">E'tibor bering:</span> Excel faylingiz
          quyidagi{" "}
          <a
            href="https://docs.google.com/spreadsheets/d/1rh6Df__OZjbXeLuRxe9bpYVp32V0EZPKHsBIK_sk8sQ"
            target="_blank"
            className="underline font-semibold"
          >
            Namuna
          </a>
          dagi kabi bo'lishi kerak.
        </div>
      </div>
      <Form className="flex flex-col items-center justify-center">
        <Form.Item name="user_boss">
          <Select
            placeholder="Bossni tanlang!"
            className="w-full "
            onChange={(value) => setSelectedBoss(value)}
          >
            {boss &&
              boss.map((el) => (
                <Select.Option value={el.id} key={el.id}>
                  {el.first_name} {el.last_name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Upload
            style={{ color: "blue" }}
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={beforeUpload}
            accept=".xlsx,.xls"
            multiple={false}
          >
            <Button icon={<UploadOutlined />}>Excel Faylni yuklash</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={showModal}
            style={{ marginTop: 16 }}
            disabled={fileList.length === 0 || isSubmitDisabled}
            className="bg-[#1677ff]"
          >
            Yuborish
          </Button>
        </Form.Item>
      </Form>
      {rows && rows.length !== 0 && (
        <DataGrid
          className="mt-10"
          disableColumnMenu
          columns={columns}
          rows={rows}
          initialState={{
            pagination: {
              pageSize: 10,
            },
          }}
          pageSizeOptions={[10, 100]}
          pagination
          disableColumnResize
          disableColumnFilter
          disableColumnSelector
          // disableRowSelectionOnClick
          onRowClick={handleClickRow}
        />
      )}
      <ModalConf
        showModal={showModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
      />
      {loading && <AppLoader />}
    </div>
  );
};

export default InnUpload;
