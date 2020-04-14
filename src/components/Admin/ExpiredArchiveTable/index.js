import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import AdminPagination from "../Custom/Pagination/AdminPagination";

//Custom components and styles and data
import useStyles from "./style";
import StyledTableCell from "../Custom/Table/StyledTableCell";
import StyledTableRow from "../Custom/Table/StyledTableRow";
import EditButton from "../Custom/Button/EditButton";
import DetailButton from "../Custom/Button/DetailButton";
import RemoveButton from "../Custom/Button/RemoveButton";
import FormArchive from "../Custom/Dialog/Archive/FormArchive";
import {
  audioArchiveObject,
  videoArchiveObject,
  photoArchiveObject,
  textArchiveObject,
} from "../../../scheme/Archive";
import ArchiveDetail from "../Custom/Dialog/Archive/ArchiveDetail";

import PropTypes from "prop-types";

export default function ExpiredArchiveTable(props) {
  const classes = useStyles();

  //Form Modal hooks
  const [openDelDialog, setOpenDelDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  //Selected archive hooks
  const [selectedArchive, setSelectedArchive] = useState(audioArchiveObject);

  //Read props from parent component
  const { currentPage, totalPage, data } = props.archiveList;
  const { handleEditRequests, handleDeleteRequests } = props;
  //Dynamic form data options
  const { classification } = props;

  const handleOpenDetailDialog = (data) => {
    setSelectedArchive({ ...data });
    setOpenDetailDialog(true);
  };

  const handleOpenDelDialog = (data) => {
    setSelectedArchive({ ...data });
    setOpenDelDialog(true);
  };

  const handleOpenEditDialog = (data) => {
    setSelectedArchive({ ...data });
    setOpenEditDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
  };

  const handleCloseDelDialog = () => {
    setOpenDelDialog(false);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedArchive(audioArchiveObject);
  };

  const handleDataChange = (pageNum) => {
    props.handlePageRequests(pageNum);
  };

  const handleUpload = (file) => {
    const fileUrl = URL.createObjectURL(file);
    const filename = file.name;
    const mime = file.type;
    setSelectedArchive({ ...selectedArchive, file, filename, fileUrl, mime });
  };

  const handleArchiveTypeChange = (event) => {
    switch (event.target.value) {
      case "Audio":
        setSelectedArchive({ ...audioArchiveObject });
        break;
      case "Video":
        setSelectedArchive({ ...videoArchiveObject });
        break;
      case "Text":
        setSelectedArchive({ ...textArchiveObject });
        break;
      case "Photo":
        setSelectedArchive({ ...photoArchiveObject });
        break;
      default:
        break;
    }
  };

  const handleInput = (attr, val) => {
    const newAttrObject = { [attr]: val };
    setSelectedArchive({ ...selectedArchive, ...newAttrObject });
  };

  const handleChangeArchive = () => {
    handleEditRequests({ ...selectedArchive });
    setSelectedArchive(audioArchiveObject);
  };

  const handleDeleteArchive = () => {
    handleDeleteRequests({ ...selectedArchive });
    setSelectedArchive(audioArchiveObject);
  };

  const getLabel = (val) => {
    switch (val) {
      case "Audio":
        return val;
      case "Video":
        return val;
      case "Photo":
        return "Foto";
      case "Text":
        return "Tekstual";
      default:
        // console.log('Invalid Archive Data Type, No Label Specified');
        break;
    }
  };

  console.log(data);

  return (
    <>
      <TableContainer component={Paper} className={classes.wrapper}>
        <Table
          className={classes.table}
          aria-label="archive list table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Nama Arsip</StyledTableCell>
              <StyledTableCell>Skema Klasifikasi</StyledTableCell>
              <StyledTableCell>Tipe Arsip</StyledTableCell>
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.map((archive, idx) => (
                <StyledTableRow key={idx} hover>
                  <StyledTableCell>{idx + 1}</StyledTableCell>
                  <StyledTableCell>{archive.judul}</StyledTableCell>
                  <StyledTableCell>{archive.pola}</StyledTableCell>
                  <StyledTableCell>{getLabel(archive.tipe)}</StyledTableCell>
                  <StyledTableCell>
                    <span style={{ display: "flex", justifyContent: "center" }}>
                      <DetailButton
                        handleClick={handleOpenDetailDialog}
                        data={archive}
                      />
                      <EditButton
                        handleClick={handleOpenEditDialog}
                        data={archive}
                      />
                      <RemoveButton
                        handleClick={handleOpenDelDialog}
                        data={archive}
                      />
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/*Form Pagination Component*/}
      <AdminPagination
        handleDataChange={handleDataChange}
        currentPage={currentPage}
        totalPage={totalPage}
      />
      {/*   Edit Archive Modal Component*/}
      <FormArchive
        type="edit"
        archive={selectedArchive}
        classification={classification}
        title="Edit Arsip"
        isOpen={openEditDialog}
        handleClose={handleCloseEditDialog}
        handleUpload={handleUpload}
        handleArchiveTypeChange={handleArchiveTypeChange}
        handleInput={handleInput}
        handleSubmitArchive={handleChangeArchive}
      />
      {/*    Archive Detail Modal Component*/}
      <ArchiveDetail
        type="detail"
        archive={selectedArchive}
        isOpen={openDetailDialog}
        handleClose={handleCloseDetailDialog}
      />
      {/*    Delete Archive Modal Component*/}
      <ArchiveDetail
        type="delete"
        archive={selectedArchive}
        isOpen={openDelDialog}
        handleClose={handleCloseDelDialog}
        handleDelete={handleDeleteArchive}
      />
    </>
  );
}

ExpiredArchiveTable.propTypes = {
  archiveList: PropTypes.array,
  classification: PropTypes.array,
  handlePageRequests: PropTypes.func,
  handleEditRequests: PropTypes.func,
  handleDeleteRequests: PropTypes.func,
};
