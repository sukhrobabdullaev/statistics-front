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

  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClickRow = (params) => {
    const id = params.row.id;
    navigate(`/revison/${id}`);
  };

  const selectId = (id) => {
    localStorage.setItem("template_id", id);
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
    { field: "title", headerName: letterName, width: 200 },
  ];

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            {letters.map((letter) => (
              <button
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

          <div style={{ height: "100%", width: "70%" }}>
            <DataGrid
              disableColumnMenu
              rows={rows}
              columns={columns}
              // initialState={{
              //   pagination: {
              //     paginationModel: { pageSize: 5 },
              //   },
              // }}
              // pageSizeOptions={[5]}
              onRowClick={handleClickRow}
            />
          </div>
        </div>
      )}
    </>
  );
}
