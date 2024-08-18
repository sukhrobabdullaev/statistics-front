import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { BASE_URL, token, typeletter_id } from "../../helpers";
import { useState, useEffect } from "react";
import AppLoader from "../AppLoader";
import { useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";

const SignedContent = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  async function getData() {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/v3/typeletter/${typeletter_id}/signed/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRows(res.data);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "company_name",
      headerName: "Kompaniya nomi",
      width: 200,
    },
    {
      field: "inn_number",
      headerName: "INN raqami",
      width: 200,
    },
    {
      field: "user_boss",
      headerName: "Boss ID",
      width: 200,
    },
  ];

  return (
    <div>
      <h1>SIGNED CONTENT</h1>
      {loading ? (
        <AppLoader />
      ) : (
        <div style={{ height: "70vh", width: "70%", cursor: "pointer" }}>
          <DataGrid
            disableColumnMenu
            columns={columns}
            rows={rows}
            initialState={{
              pagination: {
                pageSize: 10,
              },
            }}
            // onRowClick={handleClickRow}
            pageSizeOptions={[10, 100]}
            pagination
            disableColumnResize
            disableColumnFilter
            disableColumnSelector
            localeText={{
              noRowsLabel: "Ma'lumot mabjud emas",
              footerRowSelected: (count) =>
                count !== 1
                  ? `${count.toLocaleString()} qatorlar tanlandi`
                  : `${count.toLocaleString()} qator tanlandi`,
              footerTotalRows: "Total Rows:",
              footerTotalVisibleRows: (visibleCount, totalCount) =>
                `${totalCount.toLocaleString()} ning ${visibleCount.toLocaleString()}`,
              footerPaginationRowsPerPage: "sahifada qatorlar:",
            }}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "rgba(0,0,255,0.6)",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "rgba(0,0,255,0.6)",
                color: "white",
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SignedContent;
