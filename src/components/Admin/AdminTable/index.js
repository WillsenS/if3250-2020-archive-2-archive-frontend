import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import {InputAdornment} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

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
import AdminPagination from "../Custom/Pagination/AdminPagination"

//PropTypes validation
import PropTypes from 'prop-types';


const InputCustomProps = {
    endAdornment: (
        <InputAdornment position="end">
            <SearchIcon style={{cursor: "pointer"}}/>
        </InputAdornment>
    )
};

export default function AdminTable(props) {
    const classes = useStyles();
    const [openDeleteAdminDialog, setOpenDeleteAdminDialog] = React.useState(
        false
    );
    const [selectedAdmin, setSelectedAdmin] = React.useState({});
    const [openAddAdminDialog, setOpenAddAdminDialog] = React.useState(false);
    const [openEditAdminDialog, setOpenEditAdminDialog] = React.useState(false);

    const {dataAdmin, dataUser, handlePageRequest, handleAddNewDataRequest, handleDeleteDataRequest, handleEditDataRequest} = props;
    const {currentPage, totalPage, payload} = dataAdmin;
    const userPayload = dataUser.payload;

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
                <AddButton handleClick={handleAddAdminOpen}>Tambah Admin</AddButton>
            </div>
            <TableContainer component={Paper} className={classes.wrapper}>
                <Table className={classes.table} aria-label="admin list table" size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>NAMA</StyledTableCell>
                            <StyledTableCell>FAKULTAS</StyledTableCell>
                            <StyledTableCell>AKSES</StyledTableCell>
                            <StyledTableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payload.map(admin => (
                            <StyledTableRow key={admin.name} hover>
                                <StyledTableCell>{admin.name}</StyledTableCell>
                                <StyledTableCell>
                                    {admin.faculty}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {access(admin.access)}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <span style={{display: "flex", justifyContent: "center"}}>
                                        <EditButton handleClick={handleEditAdminOpen} data={admin}/>
                                        <RemoveButton handleClick={handleDeleteAdminOpen} data={admin}/>
                                    </span>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*Pagination*/}
            <AdminPagination handleDataChange={handleDataChange} totalPage={totalPage} currentPage={currentPage}/>
            {/* Popup dialog */}
            <AddAdminDialog
                open={openAddAdminDialog}
                handleClose={handleAddAdminClose}
                userList={userPayload}
                handleAddNewDataRequest={handleAddNewDataRequest}
            />
            <EditAdminDialog
                open={openEditAdminDialog}
                handleClose={handleEditAdminClose}
                data={selectedAdmin}
                handleEdit={handleEditDataRequest}
            />
            <DeleteConfirmDialog
                open={openDeleteAdminDialog}
                handleClose={handleDeleteAdminClose}
                data={selectedAdmin}
                handleDelete={handleDeleteDataRequest}
            />
        </>
    );
}

AdminTable.propTypes = {
    dataAdmin: PropTypes.object,
    dataUser: PropTypes.object,
    handlePageRequest: PropTypes.func,
    handleAddNewDataRequest: PropTypes.func,
    handleDeleteDataRequest: PropTypes.func,
    handleEditDataRequest: PropTypes.func
};