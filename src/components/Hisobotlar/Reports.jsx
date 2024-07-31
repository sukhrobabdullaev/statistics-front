import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, token } from "../../helpers";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AppLoader from "../AppLoader";
import "./InnUpload.css";

export default function Reports() {
  const [letters, setLetters] = useState([]);
  const [rows, setRows] = useState([]);
  const [letterName, setLetterName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(1);

  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClickRow = (params) => {
    const id = params.row.id;
    navigate(`/revison/${id}`);
  };

  const selectId = (id) => {
    localStorage.setItem("template_id", id);
    setSelectedId(id);
    const newUrl = `${window.location.pathname}?step_id=3&template_id=${id}`;
    navigate(newUrl);
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const idsResponse = await axios.get(`${BASE_URL}/v3/typeletter/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const ids = idsResponse?.data?.results;
        setLetters(ids);

        const templateId = searchParams.get("template_id") || "1";
        setSelectedId(Number(templateId));

        const res = await axios.get(
          `${BASE_URL}/v3/typeletter/${templateId}/`,
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

    getData();
  }, [searchParams]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "title",
      headerName: letterName ? letterName : "Ko'rsatma xati",
      width: 200,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          {letters.map((letter) => (
            <button
              className={`text-white bg-gradient-to-r ${
                selectedId === letter.id
                  ? "from-green-500 via-green-500 to-green-700"
                  : "from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br"
              } font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
              key={letter.id}
              onClick={() => {
                setLetterName(letter.name);
                selectId(letter.id);
              }}
            >
              {letter.name}
            </button>
          ))}
        </div>

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
              onRowClick={handleClickRow}
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
                // "& .MuiDataGrid-cell": {
                //   backgroundColor: "#08e8de",
                // },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "rgba(0,0,255,0.6)",
                  color: "white",
                },
                // color: "white",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
