import React, { useEffect, useState } from "react";
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
import { useData } from "../../context/DataContext";
import { message } from "antd";

const TemplateDetails = () => {
  const [open, setOpen] = useState(false);
  const { templateDetails } = useData();
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [rows, setRows] = useState([]);
  const [isSigned, setIsSigned] = useState(false);

  useEffect(() => {
    if (templateDetails) {
      setRows(templateDetails);
      console.log("TEMPLATE DETAILS:", templateDetails);
    }
  }, [templateDetails]);

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
      const res = await axios.post(
        `${BASE_URL}/v4/partyuser/typeletter/delete/`,
        { id: selectedRowId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedRows = rows.filter((row) => row.id !== selectedRowId);
      setRows(updatedRows);
      const success = res?.data?.status;
      message.success(`${success && "Muvaffaqiyatli o'chirildi!"}`);
      if (isSigned) {
        setRows(null);
      }
    } catch (error) {
      console.error("Failed to delete the row:", error);
    } finally {
      handleClose();
    }
  };
  const handleSigned = async () => {
    try {
      const pdf_file_updates = rows.map((row) => ({
        id: row.id,
        user_staff: row.user_staff,
      }));

      const res = await axios.put(
        `${BASE_URL}/v4/partyuser/typeletter/update/`,
        { pdf_file_updates },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const success = res?.data?.status;
      message.success(`${success && "Imzolandi!"}`);
      setIsSigned(true);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update the DATA:", error);
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
      <div style={{ height: 350, width: "100%" }}>
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
      </div>
      <Button
        onClick={handleSigned}
        disabled={isSigned}
        style={{
          backgroundColor: "blue",
          color: "white",
        }}
      >
        Imzolash
      </Button>
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
