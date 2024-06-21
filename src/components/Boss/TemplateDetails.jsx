import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { BASE_URL, token } from "../../helpers";
import axios from "axios";

const TemplateDetails = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const location = useLocation();
  const { data } = location.state || {};

  useEffect(() => {
    if (data) {
      setRows(data);
      console.log("TEMPLATE DETAILS:", data);
    }
  }, [data]);

  const handleOpen = (id) => {
    console.log(id);
    setSelectedRowId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRowId(null);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/v4/partyuser/typeletter/delete/${selectedRowId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200 || res.status === 204) {
        setRows((prevRows) =>
          prevRows.filter((row) => row.id !== selectedRowId)
        );
      } else {
        console.error("Unexpected response status:", res.status);
      }
    } catch (error) {
      console.error(
        "Failed to delete the row:",
        error.response || error.message || error
      );
    } finally {
      handleClose();
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "company_name",
      headerName: "Hisobot nomi",
      width: 400,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleOpen(params.id)} sx={{ color: "red" }}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div className="max-w-[1200px] h-full mx-auto mt-5 flex flex-col gap-6">
      <h1 className="text-3xl font-semibold">Hisobotlar ro'yxati</h1>
      <DataGrid
        disableColumnMenu
        columns={columns}
        rows={rows}
        initialState={{
          pagination: {
            pageSize: 10,
          },
        }}
        pageSizeOptions={[10, 100]}
        pagination
        disableColumnResize
        disableColumnFilter
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Xat chiqarmaslik!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Bekor qilish
          </Button>
          <Button onClick={handleDelete} color="secondary">
            O'chirish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TemplateDetails;
