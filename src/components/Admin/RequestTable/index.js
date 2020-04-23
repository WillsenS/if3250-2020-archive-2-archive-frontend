import React, { useState } from "react";
import PropTypes from "prop-types";
import StyledTableCell from "../Custom/Table/StyledTableCell";
import StyledTableRow from "../Custom/Table/StyledTableRow";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import DetailButton from "../Custom/Button/DetailButton";
import RemoveButton from "../Custom/Button/RemoveButton";
import RequestDetail from "../Custom/Dialog/Request/RequestDetail";
import RequestReject from "../Custom/Dialog/Request/RequestReject";

import {
  Container,
  IconButton,
  Button,
  Card,
  CardContent,
  TextField,
  Collapse,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  root: {
    minWidth: "50%",
    maxWidth: "70%",
  },
  title: {
    marginBottom: "1rem",
  },
  cell: {
    textAlign: "left",
    fontSize: "0.8rem",
  },
}));

export default function RequestTable(props) {
  const classes = useStyles();

  const dummy = {
    archive: {
      judul: "title",
    },
    borrower: {
      fullname: "fullname",
    },
    status: 0,
    phone: "phone",
    email: "email",
    reason: "reason",
  };

  const [selectedRequest, setSelectedRequest] = useState(dummy);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openRejectRequestDialog, setOpenRejectRequestDialog] = useState(false);

  const handleOpenDetailDialog = (data) => {
    setSelectedRequest({ ...data });
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
  };

  const handleRejectRequestOpen = (data) => {
    setSelectedRequest({ ...data });
    setOpenRejectRequestDialog(true);
  };

  const handleRejectRequestClose = () => {
    setOpenRejectRequestDialog(false);
  };

  const handleAcceptRequest = () => {
    props.handleAccept(selectedRequest);
    handleCloseDetailDialog();
  };

  const handleRejectRequest = () => {
    props.handleReject(selectedRequest);
    handleRejectRequestClose();
  };

  return (
    <div style={{ marginLeft: "3rem" }}>
      <Typography variant="h3" component="h2" className={classes.title}>
        {props.title}
      </Typography>
      <div style={{ maxWidth: "70%" }}>
        <Collapse in={props.open}>
          <Alert
            variant="outlined"
            severity={props.severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  props.setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {props.alertText}
          </Alert>
        </Collapse>
      </div>
      <TableContainer component={Paper} className={classes.root}>
        <Table
          className={classes.table}
          aria-label="tabel permintaan peminjamana arsip"
          size="small"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.cell} align="left">
                {" "}
                NAMA PEMINJAM{" "}
              </StyledTableCell>
              <StyledTableCell className={classes.cell}>
                {" "}
                NAMA ARSIP
              </StyledTableCell>
              <StyledTableCell className={classes.cell}>
                {" "}
                ALASAN
              </StyledTableCell>
              <StyledTableCell className={classes.cell}>
                {" "}
                STATUS
              </StyledTableCell>
              <StyledTableCell className={classes.cell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.requestList.map((request) => {
              return (
                <StyledTableRow key={request._id}>
                  <StyledTableCell className={classes.cell}>
                    {request.borrower.fullname}
                  </StyledTableCell>
                  <StyledTableCell className={classes.cell}>
                    {request.archive.judul}
                  </StyledTableCell>
                  <StyledTableCell className={classes.cell}>
                    {request.reason}
                  </StyledTableCell>
                  <StyledTableCell className={classes.cell}>
                    {request.status === 0
                      ? "PENDING"
                      : request.status === 1
                      ? "ACCEPTED"
                      : "REJECTED"}
                  </StyledTableCell>
                  <StyledTableCell className={classes.cell}>
                    <span style={{ display: "flex", justifyContent: "center" }}>
                      <DetailButton
                        handleClick={handleOpenDetailDialog}
                        data={request}
                      />
                      <RemoveButton
                        handleClick={handleRejectRequestOpen}
                        data={request}
                      />
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <RequestDetail
        type="detail"
        request={selectedRequest}
        isOpen={openDetailDialog}
        handleClose={handleCloseDetailDialog}
        handleAccept={handleAcceptRequest}
      />
      <RequestReject
        type="reject"
        request={selectedRequest}
        isOpen={openRejectRequestDialog}
        handleClose={handleRejectRequestClose}
        handleReject={handleRejectRequest}
      />
    </div>
  );
}

RequestTable.propTypes = {
  title: PropTypes.string,
  requestList: PropTypes.array,
  handleClick: PropTypes.func,
};
