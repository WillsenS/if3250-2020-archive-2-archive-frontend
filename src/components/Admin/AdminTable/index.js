import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";

//Custom components and styles and data
import useStyles from "./style";
import StyledTableCell from "../Custom/Table/StyledTableCell";
import StyledTableRow from "../Custom/Table/StyledTableRow";
import Search from "../Custom/Input/Search";
import EditButton from "../Custom/Button/EditButton";
import RemoveButton from "../Custom/Button/RemoveButton";
import AddButton from "../Custom/Button/AddButton";
import DeleteConfirmDialog from "../Custom/Dialog/Admin/DeleteConfirmDialog";
import AddAdminDialog from "../Custom/Dialog/Admin/AddAdminDialog";
import EditAdminDialog from "../Custom/Dialog/Admin/EditAdminDialog";
import AdminPagination from "../Custom/Pagination/AdminPagination";
import LinearProgress from "@material-ui/core/LinearProgress";

//PropTypes validation
import PropTypes from "prop-types";

export default function AdminTable(props) {
  const classes = useStyles();
  const [openDeleteAdminDialog, setOpenDeleteAdminDialog] = React.useState(
    false
  );
  const [selectedAdmin, setSelectedAdmin] = React.useState({});
  const [openAddAdminDialog, setOpenAddAdminDialog] = React.useState(false);
  const [openEditAdminDialog, setOpenEditAdminDialog] = React.useState(false);

  const {
    dataAdmin,
    currentPage,
    totalPages,
    dataUser,
    dataRole,
    handlePageRequest,
    handleAddNewDataRequest,
    handleDeleteDataRequest,
    handleEditDataRequest,
    handleSearch,
    loading,
    error,
  } = props;

  const handleDeleteAdminOpen = (admin) => {
    setSelectedAdmin(admin);
    setOpenDeleteAdminDialog(true);
  };

  const handleDeleteAdminClose = () => {
    setOpenDeleteAdminDialog(false);
    setSelectedAdmin({});
  };
  const handleAddAdminOpen = () => {
    setOpenAddAdminDialog(true);
  };

  const handleAddAdminClose = () => {
    setOpenAddAdminDialog(false);
  };
  const handleEditAdminOpen = (admin) => {
    setSelectedAdmin(admin);
    setOpenEditAdminDialog(true);
  };

  const handleEditAdminClose = () => {
    setOpenEditAdminDialog(false);
    setSelectedAdmin({});
  };

  const handleDataChange = (page) => {
    handlePageRequest(page);
  };

  return (
    <>
      <div className={classes.input}>
        <Search
          label={"Cari Admin"}
          placeholder={"Masukkan Nama Admin"}
          type={"search"}
          handleSearch={handleSearch}
        />
        <AddButton handleClick={handleAddAdminOpen}>Tambah Admin</AddButton>
      </div>
      <TableContainer component={Paper} className={classes.wrapper}>
        {loading ? <LinearProgress /> : <></>}
        <Table
          className={classes.table}
          aria-label="admin list table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>NAMA</StyledTableCell>
              <StyledTableCell>UNIT KERJA</StyledTableCell>
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRole.length > 0 &&
              dataAdmin.map((admin, index) => (
                <StyledTableRow key={index} hover>
                  <StyledTableCell>{admin.fullname}</StyledTableCell>
                  <StyledTableCell>
                    {dataRole[admin.role - 1].nama}
                  </StyledTableCell>
                  <StyledTableCell>
                    <span style={{ display: "flex", justifyContent: "center" }}>
                      <EditButton
                        handleClick={handleEditAdminOpen}
                        data={admin}
                      />
                      <RemoveButton
                        handleClick={handleDeleteAdminOpen}
                        data={admin}
                      />
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/*Pagination*/}
      <AdminPagination
        handleDataChange={handleDataChange}
        totalPage={totalPages}
        currentPage={currentPage}
      />
      {/* Popup dialog */}
      <AddAdminDialog
        open={openAddAdminDialog}
        handleClose={handleAddAdminClose}
        dataRole={dataRole}
        userList={dataUser}
        handleAddNewDataRequest={handleAddNewDataRequest}
      />
      <EditAdminDialog
        open={openEditAdminDialog}
        handleClose={handleEditAdminClose}
        data={selectedAdmin}
        dataRole={dataRole}
        handleEdit={handleEditDataRequest}
      />
      <DeleteConfirmDialog
        open={openDeleteAdminDialog}
        handleClose={handleDeleteAdminClose}
        data={selectedAdmin}
        dataRole={dataRole}
        handleDelete={handleDeleteDataRequest}
      />
    </>
  );
}

AdminTable.propTypes = {
  dataAdmin: PropTypes.array,
  dataUser: PropTypes.array,
  dataRole: PropTypes.array,
  handlePageRequest: PropTypes.func,
  handleAddNewDataRequest: PropTypes.func,
  handleDeleteDataRequest: PropTypes.func,
  handleEditDataRequest: PropTypes.func,
  handleSearch: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
};
