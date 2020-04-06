import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import {InputAdornment} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AdminPagination from "../Custom/Pagination/AdminPagination";

//Custom components and styles and data
import useStyles from "./style";
import StyledTableCell from "../Custom/Table/StyledTableCell";
import StyledTableRow from "../Custom/Table/StyledTableRow";
import EditButton from "../Custom/Button/EditButton";
import DetailButton from "../Custom/Button/DetailButton";
import RemoveButton from "../Custom/Button/RemoveButton";
import Search from "../Custom/Input/Search";
import AddButton from "../Custom/Button/AddButton";
import FormArchive from "../Custom/Dialog/Archive/FormArchive";
import {baseArchiveObjectTemplate} from "../../../scheme/Archive";
import cleanObject from "../../../utils/CleanInput";
import ArchiveDetail from "../Custom/Dialog/Archive/ArchiveDetail";
//PropTypes validation
import PropTypes from 'prop-types';

const InputCustomProps = {
    endAdornment: (
        <InputAdornment position="end">
            <SearchIcon style={{cursor: "pointer"}}/>
        </InputAdornment>
    )
};

export default function ArchiveTable(props) {
    const classes = useStyles();

    //Form Modal hooks
    const [openDelDialog, setOpenDelDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [openDetailDialog, setOpenDetailDialog] = React.useState(false);

    //Selected archive hooks
    const [selectedArchive, setSelectedArchive] = React.useState(baseArchiveObjectTemplate);

    //Read props from parent component
    const {currentPage, totalPage, payload} = props.archiveList;
    const {handleAddRequests, handleEditRequests, handleDeleteRequests} = props;
    //Dynamic form data options
    const {classification, accessList} = props;

    const handleOpenDetailDialog = (data) => {
        setSelectedArchive({...data});
        setOpenDetailDialog(true);
    };

    const handleOpenDelDialog = (data) => {
        setSelectedArchive({...data});
        setOpenDelDialog(true);
    };

    const handleOpenEditDialog = (data) => {
        setSelectedArchive({...data});
        setOpenEditDialog(true);
    };

    const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
    };

    const handleCloseDetailDialog = () => {
        setOpenDetailDialog(false);
    };


    const handleCloseDelDialog = () => {
        setOpenDelDialog(false);
    };


    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSelectedArchive(baseArchiveObjectTemplate);
    };


    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
    };

    const handleDataChange = (pageNum) => {
        props.handlePageRequests(pageNum);
    };


    const handleUpload = () => {
        // eslint-disable-next-line no-undef
        let fakePath = document.getElementById("archive-upload").value;
        // eslint-disable-next-line no-useless-escape
        fakePath = fakePath.replace(/.*[\/\\]/, "");
        setSelectedArchive({...selectedArchive, name: fakePath});
    };

    const handleArchiveTypeChange = event => {
        setSelectedArchive({...selectedArchive, type: event.target.value});
    };

    const handleInput = (attr, val) => {
        const newAttrObject = {[attr]: val};
        setSelectedArchive({...selectedArchive, ...newAttrObject});
    };

    const handleSubmitArchive = () => {
        handleAddRequests(cleanObject({...selectedArchive}));
        //Reset form
        setSelectedArchive(baseArchiveObjectTemplate);
    };

    const handleChangeArchive = () => {
        handleEditRequests(cleanObject({...selectedArchive}));
        setSelectedArchive(baseArchiveObjectTemplate);
    };

    const handleDeleteArchive = () => {
        handleDeleteRequests(cleanObject({...selectedArchive}));
        setSelectedArchive(baseArchiveObjectTemplate);
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
                <AddButton handleClick={handleOpenAddDialog}>Tambah Arsip</AddButton>
            </div>
            <TableContainer component={Paper} className={classes.wrapper}>
                <Table className={classes.table} aria-label="archive list table" size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Nama Arsip</StyledTableCell>
                            <StyledTableCell>
                                Skema Klasifikasi
                            </StyledTableCell>
                            <StyledTableCell>Tipe Arsip</StyledTableCell>
                            <StyledTableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payload.map((archive, idx) => (
                            <StyledTableRow key={archive.id} hover>
                                <StyledTableCell>{idx + 1}</StyledTableCell>
                                <StyledTableCell>{archive.name}</StyledTableCell>
                                <StyledTableCell>
                                    {archive.classificationScheme}
                                </StyledTableCell>
                                <StyledTableCell>{archive.type}</StyledTableCell>
                                <StyledTableCell>
                                    <span style={{display: "flex", justifyContent: "center"}}>
                                        <DetailButton handleClick={handleOpenDetailDialog} data={archive}/>
                                        <EditButton handleClick={handleOpenEditDialog} data={archive}/>
                                        <RemoveButton handleClick={handleOpenDelDialog} data={archive}/>
                                    </span>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*Form Pagination Component*/}
            <AdminPagination
                handleDataChange={handleDataChange}
                currentPage={currentPage}
                totalPage={totalPage}/>
            {/*Add New Archive Modal Component*/}
            <FormArchive
                type="add"
                archive={selectedArchive}
                classification={classification}
                accessList={accessList}
                title="Tambah Arsip Baru"
                isOpen={openAddDialog}
                handleClose={handleCloseAddDialog}
                handleUpload={handleUpload}
                handleArchiveTypeChange={handleArchiveTypeChange}
                handleInput={handleInput}
                handleSubmitArchive={handleSubmitArchive}
            />
            {/*   Edit Archive Modal Component*/}
            <FormArchive
                type="edit"
                archive={selectedArchive}
                classification={classification}
                accessList={accessList}
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


ArchiveTable.propTypes = {
    archiveList: PropTypes.object,
    classification: PropTypes.array,
    accessList: PropTypes.array,
    handlePageRequests: PropTypes.func,
    handleAddRequests: PropTypes.func,
    handleEditRequests: PropTypes.func,
    handleDeleteRequests: PropTypes.func
};
