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
import RequestDetail from "../Custom/Dialog/Request/RequestDetail";

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
    phone: "phone",
    email: "email",
    reason: "reason",
  };

  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(dummy);

  const handleOpenDetailDialog = (data) => {
    setSelectedRequest({ ...data });
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
  };

  return (
    <div style={{ marginLeft: "3rem" }}>
      <Typography variant="h3" component="h2" className={classes.title}>
        {props.title}
      </Typography>
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
                    <span style={{ display: "flex", justifyContent: "center" }}>
                      <DetailButton
                        handleClick={handleOpenDetailDialog}
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
      />
    </div>
  );
}

RequestTable.propTypes = {
  title: PropTypes.string,
  requestList: PropTypes.array,
  handleClick: PropTypes.func,
};
