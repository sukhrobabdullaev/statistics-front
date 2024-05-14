import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../helpers";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AppLoader from "../AppLoader";

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

  let token = localStorage.getItem("access_token");

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const idsResponse = await axios.get(
          `${BASE_URL}/mainletter/typeletter/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const ids = idsResponse?.data?.results;
        setLetters(ids);

        const res = await axios.get(
          `${BASE_URL}/mainletter/typeletter/${
            searchParams.get("template_id") || "1"
          }/`,
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

  console.log();
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
            />
          </div>
        )}
      </div>
    </>
  );
}
