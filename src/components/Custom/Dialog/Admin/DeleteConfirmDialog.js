//Custom
import DeleteButton from "../../Button/RemoveButton";
//Modules
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  cancel: {
    backgroundColor: theme.palette.getContrastText("#cb2431"),
    color: "#cb2431"
  }
}));

export default function DeleteConfirmDialog(props) {
  const { open, handleClose } = props;
  const classes = useStyles();
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-confirmation-alert"
        aria-describedby="Confirmation-popup-for-deletion"
      >
        <DialogTitle id="alert-dialog-title" style={{ color: "#cb2431" }}>
          Anda Yakin Ingin Menghapus Admin ?
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" style={{ color: "#586069" }}>
            Nama Admin:{" "}
          </Typography>
          <Typography
            variant="h5"
            style={{ color: "#333", fontWeight: "bold" }}
          >
            Adam Ardianto A.
          </Typography>
          <Typography variant="body1" style={{ color: "#586069" }}>
            Fakultas/Sekolah:{" "}
          </Typography>
          <Typography
            variant="h6"
            style={{ color: "#333", fontWeight: "bold" }}
          >
            FTMD
          </Typography>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              classes={{ root: classes.cancel }}
              size="small"
            >
              Batalkan
            </Button>
            <DeleteButton />
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
