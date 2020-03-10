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
import { dummyAdmins, names } from "./DummyAdmins";
import StyledTableCell from "../../Custom/Table/StyledTableCell";
import StyledTableRow from "../../Custom/Table/StyledTableRow";
import Search from "../../Custom/Input/Search";
import EditButton from "../../Custom/Button/EditButton";
import RemoveButton from "../../Custom/Button/RemoveButton";
import Addbutton from "../../Custom/Button/AddButton";
import DeleteConfirmDialog from "../../Custom/Dialog/Admin/DeleteConfirmDialog";
import AddAdminDialog from "../../Custom/Dialog/Admin/AddAdminDialog";
import EditAdminDialog from "../../Custom/Dialog/Admin/EditAdminDialog";

const InputCustomProps = {
  endAdornment: (
    <InputAdornment position="end">
      <SearchIcon style={{ cursor: "pointer" }} />
    </InputAdornment>
  )
};

export default function AdminTable() {
  const classes = useStyles();
  const [openDeleteAdminDialog, setOpenDeleteAdminDialog] = React.useState(
    false
  );
  const [openAddAdminDialog, setOpenAddAdminDialog] = React.useState(false);
  const [openEditAdminDialog, setOpenEditAdminDialog] = React.useState(false);

  const handleDeleteAdminOpen = () => {
    setOpenDeleteAdminDialog(true);
  };

  const handleDeleteAdminClose = () => {
    setOpenDeleteAdminDialog(false);
  };
  const handleAddAdminOpen = () => {
    setOpenAddAdminDialog(true);
  };

  const handleAddAdminClose = () => {
    setOpenAddAdminDialog(false);
  };
  const handleEditAdminOpen = () => {
    setOpenEditAdminDialog(true);
  };

  const handleEditAdminClose = () => {
    setOpenEditAdminDialog(false);
  };

  function access(code) {
    switch (code) {
      case 2:
        return "Admin";
      case 3:
        return "Super Admin";
      default:
        return "-";
    }
  }
  return (
    <>
      <div className={classes.input}>
        <Search
          label={"Cari Admin"}
          placeholder={"Masukkan Nama Admin"}
          type={"search"}
          InputProps={InputCustomProps}
        />
        <Addbutton handleClick={handleAddAdminOpen}>Tambah Admin</Addbutton>
      </div>
      <TableContainer component={Paper} className={classes.wrapper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>NAMA</StyledTableCell>
              <StyledTableCell align="center">FAKULTAS</StyledTableCell>
              <StyledTableCell align="center">AKSES</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyAdmins.map(admin => (
              <StyledTableRow key={admin.name} hover>
                <StyledTableCell>{admin.name}</StyledTableCell>
                <StyledTableCell align="center">
                  {admin.faculty}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {access(admin.access)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <EditButton handleClick={handleEditAdminOpen} />
                  <RemoveButton handleClick={handleDeleteAdminOpen} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Popup dialog */}
      <AddAdminDialog
        open={openAddAdminDialog}
        handleClose={handleAddAdminClose}
      />
      <EditAdminDialog
        open={openEditAdminDialog}
        handleClose={handleEditAdminClose}
      />
      <DeleteConfirmDialog
        open={openDeleteAdminDialog}
        handleClose={handleDeleteAdminClose}
      />
    </>
  );
}
