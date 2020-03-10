import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

//Custom components and styles and data
import useStyles from "./style";
import { dummyArchives } from "./DummyArchive";
import StyledTableCell from "../../Custom/Table/StyledTableCell";
import StyledTableRow from "../../Custom/Table/StyledTableRow";
import EditButton from "../../Custom/Button/EditButton";
import DetailButton from "../../Custom/Button/DetailButton";
import RemoveButton from "../../Custom/Button/RemoveButton";
import Search from "../../Custom/Input/Search";
import Addbutton from "../../Custom/Button/AddButton";
import FormArchive from "../../Custom/Dialog/Archive/FormArchive";
const InputCustomProps = {
  endAdornment: (
    <InputAdornment position="end">
      <SearchIcon style={{ cursor: "pointer" }} />
    </InputAdornment>
  )
};

export default function ArchiveTable() {
  const classes = useStyles();
  const [openDelDialog, setOpenDelDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);

  const handleOpenDelDialog = () => {
    setOpenDelDialog(true);
  };

  const handleCloseDelDialog = () => {
    setOpenDelDialog(false);
  };
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  return (
    <>
      <div className={classes.input}>
        <Search
          label={"Cari Arsip"}
          placeholder={"Masukkan Nama Arsip"}
          type={"search"}
          InputProps={InputCustomProps}
        />
        <Addbutton handleClick={handleOpenAddDialog}>Tambah Arsip</Addbutton>
      </div>
      <TableContainer component={Paper} className={classes.wrapper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">No</StyledTableCell>
              <StyledTableCell align="center">Nama Arsip</StyledTableCell>
              <StyledTableCell align="center">
                Skema Klasifikasi
              </StyledTableCell>
              <StyledTableCell align="center">Tipe Arsip</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyArchives.map((archive, idx) => (
              <StyledTableRow key={archive.id} hover>
                <StyledTableCell align="center">{idx + 1}</StyledTableCell>
                <StyledTableCell align="center">{archive.name}</StyledTableCell>
                <StyledTableCell align="center">
                  {archive.scheme}
                </StyledTableCell>
                <StyledTableCell align="center">{archive.type}</StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <DetailButton />
                  <EditButton handleClick={handleOpenEditDialog} />
                  <RemoveButton handleClick={handleOpenDelDialog} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FormArchive
        open={openAddDialog}
        handleClose={handleCloseAddDialog}
        isEdit={openEditDialog}
      />
      <FormArchive
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        isEdit={openEditDialog}
      />
    </>
  );
}
