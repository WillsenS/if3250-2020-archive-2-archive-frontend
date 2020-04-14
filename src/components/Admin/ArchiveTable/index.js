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
import {audioArchiveObject, videoArchiveObject, photoArchiveObject, textArchiveObject} from "../../../scheme/Archive";
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
    const [selectedArchive, setSelectedArchive] = React.useState(audioArchiveObject);
    //Read props from parent component
    const currentPage = props.page;
    const totalPage = props.totalPages;
    const payload = props.archives;
    const {handleAddRequests, handleEditRequests, handleDeleteRequests} = props;
    //Dynamic form data options
    const {classification} = props;

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
        setSelectedArchive(audioArchiveObject);
    };


    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
    };

    const handleDataChange = (pageNum) => {
        props.handlePageRequests(pageNum);
    };


    const handleUpload = (file) => {
        const fileUrl = URL.createObjectURL(file);
        const filename = file.name;
        const mime = file.type;
        setSelectedArchive({...selectedArchive, file, filename, fileUrl, mime});
    };

    const handleArchiveTypeChange = event => {
        switch (event.target.value) {
            case 'Audio':
                setSelectedArchive({...audioArchiveObject});
                break;
            case 'Video':
                setSelectedArchive({...videoArchiveObject});
                break;
            case 'Text':
                setSelectedArchive({...textArchiveObject});
                break;
            case 'Photo':
                setSelectedArchive({...photoArchiveObject});
                break;
            default:
                break;
        }
    };

    const handleInput = (attr, val) => {
        const newAttrObject = {[attr]: val};
        setSelectedArchive({...selectedArchive, ...newAttrObject});
    };

    const handleSubmitArchive = () => {
        handleAddRequests({...selectedArchive});
        //Reset form
        setSelectedArchive(audioArchiveObject);
    };

    const handleChangeArchive = () => {
        handleEditRequests({...selectedArchive});
        setSelectedArchive(audioArchiveObject);
    };

    const handleDeleteArchive = () => {
        handleDeleteRequests({...selectedArchive});
        setSelectedArchive(audioArchiveObject);
    };

    const getLabel = val => {
        switch (val) {
            case 'Audio':
                return val;
            case 'Video':
                return val;
            case 'Photo':
                return 'Foto';
            case 'Text':
                return 'Tekstual';
            default:
                // console.log('Invalid Archive Data Type, No Label Specified');
                break;
        }
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
                <Table className={classes.table} aria-label="archive list table">
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
                        {payload? payload.map((archive, idx) => (
                            <StyledTableRow key={idx} hover>
                                <StyledTableCell>{idx + 1}</StyledTableCell>
                                <StyledTableCell>{archive.filename}</StyledTableCell>
                                <StyledTableCell>
                                    {archive.classificationPattern}
                                </StyledTableCell>
                                <StyledTableCell>{getLabel(archive.type)}</StyledTableCell>
                                <StyledTableCell>
                                    <span style={{display: "flex", justifyContent: "center"}}>
                                        <DetailButton handleClick={handleOpenDetailDialog} data={archive}/>
                                        <EditButton handleClick={handleOpenEditDialog} data={archive}/>
                                        <RemoveButton handleClick={handleOpenDelDialog} data={archive}/>
                                    </span>
                                </StyledTableCell>
                            </StyledTableRow>
                        )): <></>}
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
    archives: PropTypes.array,
    page: PropTypes.number,
    totalPages: PropTypes.number,
    searchQuery: PropTypes.string,
    classification: PropTypes.array,
    handlePageRequests: PropTypes.func,
    handleAddRequests: PropTypes.func,
    handleEditRequests: PropTypes.func,
    handleDeleteRequests: PropTypes.func
};
