import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { BASE_URL, token } from "../../helpers";
import axios from "axios";

const BossReview = () => {
  const [rows, setRows] = useState([]);
  const location = useLocation();
  const { data } = location.state || {};
  const navigate = useNavigate();
  let params = useParams();

  //   let typeletter_id = localStorage.getItem("template_id");

  useEffect(() => {
    if (data) {
      setRows(data);
      console.log("success");
    }
  }, [data]);
  console.log(rows);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "title",
      headerName: "Hisobot nomi",
      width: 400,
    },
  ];

  const handleClickRow = async (params) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/v4/typeletter/partyuser/partyuser-typeletter-id/pdffiletemplate-id/`,
        {
          typeletter_id: params.row.typeletter,
          staff_id: params.row.user_staff,
          id: params.row.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      navigate(`/boss-review/${params.row.user_staff}/template-details`, {
        state: { data: res.data },
      });
    } catch (error) {
      console.error("Error posting row data", error);
    }
  };

  return (
    <>
      <div className="max-w-[1200px] h-full mx-auto mt-5 flex flex-col gap-6">
        <h1 className="text-3xl font-semibold">Hisobotlar ro'yxati</h1>
        {rows && (
          <DataGrid
            disableColumnMenu
            columns={columns}
            rows={rows}
            initialState={{
              pagination: {
                pageSize: 10,
              },
            }}
            onRowClick={handleClickRow}
            pageSizeOptions={[10, 100]}
            pagination
            disableColumnResize
            disableColumnFilter
            // disableColumnMenu
            disableColumnSelector
          />
        )}
      </div>
    </>
  );
};

export default BossReview;
