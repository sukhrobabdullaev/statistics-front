import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns1 = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Nomi", width: 130 },
];
const columns2 = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Nomi", width: 130 },
];
const columns3 = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Nomi", width: 130 },
];

const rows1 = [
  { id: 1, name: "Ko'rsatma xati" },
  { id: 2, name: "Cersei" },
  { id: 3, name: "Cersei" },
  { id: 4, name: "Cersei" },
  { id: 5, name: "Cersei" },
  { id: 6, name: "Cersei" },
  { id: 7, name: "Cersei" },
  { id: 8, name: "Cersei" },
  { id: 9, name: "Cersei" },
  { id: 10, name: "Cersei" },
  { id: 11, name: "Cersei" },
  { id: 12, name: "Cersei" },
  { id: 13, name: "Cersei" },
];
const rows2 = [
  { id: 1, name: "Chaqiruv xati" },
  { id: 2, name: "Cersei" },
  { id: 3, name: "Cersei" },
  { id: 4, name: "Cersei" },
  { id: 5, name: "Cersei" },
  { id: 6, name: "Cersei" },
  { id: 7, name: "Cersei" },
  { id: 8, name: "Cersei" },
  { id: 9, name: "Cersei" },
  { id: 10, name: "Cersei" },
  { id: 11, name: "Cersei" },
  { id: 12, name: "Cersei" },
  { id: 13, name: "Cersei" },
];
const rows3 = [
  { id: 1, name: "SUD xati" },
  { id: 2, name: "Cersei" },
  { id: 3, name: "Cersei" },
  { id: 4, name: "Cersei" },
  { id: 5, name: "Cersei" },
  { id: 6, name: "Cersei" },
  { id: 7, name: "Cersei" },
  { id: 8, name: "Cersei" },
  { id: 9, name: "Cersei" },
  { id: 10, name: "Cersei" },
  { id: 11, name: "Cersei" },
  { id: 12, name: "Cersei" },
  { id: 13, name: "Cersei" },
];

export default function Reports() {
  return (
    <div className="flex gap-5">
      <div style={{ height: "100%", width: "30%" }}>
        <DataGrid
          rows={rows1}
          columns={columns1}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
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
        />
      </div>
    </div>
  );
}
