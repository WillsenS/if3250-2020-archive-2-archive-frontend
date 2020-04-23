import React from "react";
import moment from "moment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

/**
 * @return {boolean}
 */

const useStyles = makeStyles(() => ({
  root: {
    minWidth: "50%",
  },
  remove: {
    backgroundColor: red[50],
    color: "#cb2431",
  },
  redText: {
    color: "#cb2431",
    fontWeight: "bold",
  },
}));

function RequestListItem(props) {
  const showedData = Array.isArray(props.data)
    ? props.data.join(", ")
    : props.data;
  return (
    <ListItem button divider role="listitem">
      {<ListItemText primary={props.label} secondary={showedData} />}
    </ListItem>
  );
}

export default function RequestDetail(props) {
  const { isOpen, handleClose, handleAccept, request } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="request-detail"
      aria-describedby="list-request-detail"
      className={classes.root}
      maxWidth={false}
      disableBackdropClick
    >
      <DialogTitle id="archive-name">
        Detail Peminjaman Arsip{" "}
        <span style={{ fontWeight: "bold" }}>{request.archive.judul}</span>
      </DialogTitle>
      <DialogContent>
        <List component="div" role="list">
          <RequestListItem
            label="Nama Peminjam"
            data={request ? request.borrower.fullname : ""}
          />
          <RequestListItem
            label="No Telepon"
            data={request ? request.phone : ""}
          />
          <RequestListItem label="Email" data={request ? request.email : ""} />
          <RequestListItem
            label="Alasan Peminjaman"
            data={request ? request.reason : ""}
          />
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccept} color="default">
          Pinjamkan
        </Button>
        <Button onClick={handleClose} color="default">
          Kembali
        </Button>
      </DialogActions>
    </Dialog>
  );
}
