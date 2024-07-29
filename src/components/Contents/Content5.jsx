import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, token, typeletter_id } from "../../helpers";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AppLoader from "../AppLoader";
import { useData } from "../../context/DataContext";

export default function Content5() {
  const [letters, setLetters] = useState([]);
  const [rows, setRows] = useState([]);
  const [letterName, setLetterName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(1);
  const { setLetterDates } = useData();

  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClickRow = async (params) => {
    const id = params.row.id;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${BASE_URL}/v4/typeletter/letter-date/`,
        { typeletter_id, template_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setLetterDates(response.data);
        navigate(`/signed-letters/${id}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectId = (id) => {
    localStorage.setItem("template_id", id);
    setSelectedId(id);
    const newUrl = `${window.location.pathname}?step_id=5&template_id=${id}`;
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
  }, [searchParams.get("template_id")]);

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
          <div style={{ height: "100%", width: "70%" }}>
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
                  backgroundColor: "rgb(8 145 178)",
                },
                "& .MuiDataGrid-cell": {
                  backgroundColor: "rgb(168 85 247)",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "rgb(132 204 22)",
                },
                color: "white",
              }}
            />
          </div>
        )}
        {error && <div style={{ color: "red" }}>Error: {error}</div>}
      </div>
    </>
  );
}
