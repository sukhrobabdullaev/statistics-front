import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import { Transition } from "./Revision";

export default function AlertDialogSlide({ open, handleClose, handleSave }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth={1000}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Keyingi sahifaga o'tilsinmi?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Bekor qilish</Button>
          <Button onClick={handleSave}>Saqlash</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
