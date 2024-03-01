import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../helpers";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Reports() {
  const [letters, setLetters] = useState([]);
  const [rows, setRows] = useState([]);
  const [letterName, setLetterName] = useState(null);

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

        if (searchParams.get("template_id")) {
          const res = await axios.get(
            `${BASE_URL}/mainletter/typeletter/${searchParams.get(
              "template_id"
            )}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setRows(res.data);
        }
      } catch (error) {
        console.error("Fetching data failed:", error);
      }
    }

    getData();
  }, [searchParams.get("template_id")]);

  console.log(rows);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: letterName, width: 200 },
  ];

  return (
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
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          onRowClick={handleClickRow}
        />
      </div>
    </div>
  );
}
