import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../helpers";
import { useState } from "react";
import { useEffect } from "react";

export default function Reports() {
  const [letters, setLetters] = useState([]);
  const [rows1, setRows1] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [rows3, setRows3] = useState([]);

  const navigate = useNavigate();

  const handleClickRow = (params) => {
    const id = params.row.id;
    navigate(`/revison/${id}`);
  };

  let token = localStorage.getItem("access_token");

  useEffect(() => {
    async function getData() {
      try {
        const idsResponse = await axios.get(
          `${BASE_URL}/mainletter/typeletter/`
        );
        const ids = idsResponse?.data?.results;
        setLetters(ids);

        const promises = ids.map((id) =>
          axios.get(`${BASE_URL}/mainletter/typeletter/${id.id}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        );

        const responses = await Promise.all(promises);
        const data = responses.map((response) => response.data);

        const rowsData = data.map((dataItem) =>
          dataItem.map((row) => ({
            id: row.id,
            name: row.title,
          }))
        );
        setRows1(rowsData[0]);
        setRows2(rowsData[1]);
        setRows3(rowsData[2]);
      } catch (error) {
        console.error("Fetching data failed:", error);
      }
    }
    getData();
  }, []);

  const columns1 = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: letters[0]?.name, width: 130 },
  ];
  const columns2 = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: letters[1]?.name, width: 130 },
  ];
  const columns3 = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: letters[2]?.name, width: 130 },
  ];

  return (
    <div className="flex gap-5">
      <div style={{ height: "100%", width: "30%" }}>
        <DataGrid
          rows={rows1}
          columns={columns1}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          onRowClick={handleClickRow}
        />
      </div>
      <div style={{ height: "100%", width: "30%" }}>
        <DataGrid
          rows={rows2}
          columns={columns2}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          onRowClick={handleClickRow}
        />
      </div>
      <div style={{ height: "100%", width: "30%" }}>
        <DataGrid
          rows={rows3}
          columns={columns3}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          onRowClick={handleClickRow}
        />
      </div>
    </div>
  );
}
