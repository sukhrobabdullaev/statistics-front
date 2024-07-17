import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { BASE_URL, token } from "../helpers";
import { Spin, message } from "antd";
import { FileUploadOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";

function SuperUser() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(""); // State to store the selected file name
  const [fileUploaded, setFileUploaded] = useState(false);
  const [rows, setRows] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name); // Update file name when a new file is selected
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        message.error("Fayl tanlanmagan!, Iltimos faylni tanlang!");
        return;
      }

      setLoading(true); // Set loading state to true when starting the upload

      const formData = new FormData();
      formData.append("zarik_file", file);

      const response = await axios.post(
        `${BASE_URL}/v2/zarik-create/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success(response?.data?.Successful);
      setFileUploaded(true);
    } catch (err) {
      message.error(err.message);
      message.info("Fayl nomi 'zarik_file' nomi bilan bolishi kerak.");
    } finally {
      setLoading(false); // Set loading state to false when upload is completed or failed
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/v3/typeletter/zarik-get/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response?.data?.results);
        setRows(response?.data?.results);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "company_name",
      headerName: "Kompaniya nomi",
      width: 700,
      editable: true,
    },
  ];

  const handleClickRow = (params) => {
    const id = params.row.id;
    navigate(`/revison/${id}`);
  };

  return (
    <div className="text-center flex flex-col items-center justify-center gap-6">
      <label
        htmlFor="fileInput"
        className="custom-file-upload bg-gray-300 px-4 py-2 cursor-pointer flex items-center gap-2 justify-center w-32 h-32 hover:bg-gray-200 border-dashed border-2 border-blue-400 mx-auto rounded-full flex-col"
      >
        <FileUploadOutlined />
        <span>{fileName || "Faylni tanlang"}</span>
        <input
          id="fileInput"
          type="file"
          name="zarik_file"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      <button
        onClick={handleUpload}
        disabled={loading || fileUploaded}
        className={`text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2${
          fileUploaded && "bg-blue-300 hover:bg-blue-300"
        }`}
      >
        {loading ? (
          <span>
            <Spin />
          </span>
        ) : (
          "Yuborish"
        )}
      </button>

      <Box sx={{ height: 700, width: "80%", marginBottom: 30 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnMenu
          pageSizeOptions={[50]}
          onRowClick={handleClickRow}
        />
      </Box>
    </div>
  );
}

export default SuperUser;
