import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
    makeStyles,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from "@material-ui/core";
import DatePicker from "../../DatePicker";
import CustomTextField from "../../Input/CustomTextField";
import DoubleMultiSelect from "../../Input/DoubleMultiSelect";
import archiveTypeList from "../../../constants/ArchiveType";
import {ParseClassificationJsonArray} from "../../../../../utils/Fetcher";
import CustomAutocomplete from "../../Input/CustomAutocomplete";
//PropTypes validation
import PropTypes from 'prop-types';


const useStyles = makeStyles(() => ({
    input: {
        marginBottom: "1rem"
    },
    formControl: {
        margin: "1rem 0",
        minWidth: 120,
        maxWidth: 300
    }
}));


export default function FormArchive(props) {
    const classes = useStyles();
    const [classification] = useState(ParseClassificationJsonArray(props.classification));
    const {isOpen, handleClose, archive} = props;

    const editMode = props.type === "edit";
    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file != null) {
            props.handleUpload(file);
        }
    };

    const handleArchiveTypeChange = event => {
        props.handleArchiveTypeChange(event);
    };

    const handleInput = (attr, val) => {
        props.handleInput(attr, val);
    };

    const handleSubmitArchive = () => {
        props.handleSubmitArchive();
        handleClose();
    };

    const handleAutoComplete = (id, val) => {
        if (val !== null) {
            handleInput(id, val);
        }
    };

    const getArchiveUploaderFilter = (type) => {
        switch (type) {
            case 'Audio':
                return 'audio/*';
            case 'Video':
                return 'video/*';
            case 'Tekstual':
                return '*';
            case 'Foto':
                return 'image/*';
            default:
                return '*';
        }
    };
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                disableBackdropClick
            >
                <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Input data file yang akan ditambahkan
                    </DialogContentText>
                    {/*Tipe Arsip*/}
                    <FormControl required className={classes.formControl}>
                        <InputLabel id="user-label">Tipe</InputLabel>
                        <Select
                            required
                            labelId="tipe-klasifikasi"
                            id="pilih-tipe-klasifikasi"
                            value={archive.type}
                            onChange={handleArchiveTypeChange}
                        >
                            {
                                archiveTypeList.map(type => {
                                    return (
                                        <MenuItem value={type.name} key={type.id}>{type.name}</MenuItem>
                                    );
                                })
                            }
                        </Select>
                        <FormHelperText>Tipe Klasifikasi Dari Arsip </FormHelperText>
                    </FormControl>
                    {/*Uploader File*/}
                    <Box>
                        <input
                            hidden
                            accept={getArchiveUploaderFilter(archive.type)}
                            className={classes.input}
                            id="archive-upload"
                            type="file"
                            onChange={(e) => handleUpload(e)}
                        />
                        <label htmlFor="archive-upload">
                            <Button variant="contained" color="primary" component="span">
                                Upload Arsip
                            </Button>
                        </label>
                        <Typography component="span">
                            <Box fontWeight="fontWeightLight" m={1} component="span">
                                {archive.filename}
                            </Box>
                        </Typography>
                    </Box>
                    {/* Metadata fields that exist on every archive type*/}
                    <CustomTextField
                        id="code"
                        label="Nomor Arsip"
                        placeholder=""
                        handleInput={handleInput}
                        defaultValue={editMode ? archive.code : ""}/>
                    <CustomAutocomplete
                        id="classificationPattern"
                        label="Pola Klasifikasi"
                        classificationList={classification}
                        handleAutoComplete={handleAutoComplete}
                        pattern={editMode ? archive.classificationPattern: {}}
                    />
                    <DoubleMultiSelect
                        editMode={true}
                        accessData={props.accessList}
                        handleInput={props.handleInput}
                        defaultValue={editMode? archive.accessRightsList: []}
                    />

                    <CustomTextField
                        id="location"
                        label="Tempat Kegiatan/Pembuatan"
                        placeholder="Senat Akademik ITB"
                        handleInput={handleInput}
                        defaultValue={editMode ? archive.location : ""}/>
                    <CustomTextField
                        id="description"
                        label="Keterangan"
                        placeholder="-"
                        handleInput={handleInput}
                        defaultValue={editMode ? archive.description : ""}/>

                    {/*Show extra fields depending on the selected archive type*/}
                    {
                        archive.type === "Audio" || archive.type === "Video" ? (
                            <>
                                <CustomTextField id="narrator" label="Narator" placeholder="-"
                                                 handleInput={handleInput}
                                                 defaultValue={editMode ? archive.narrator : ""}/>
                                <CustomTextField id="reporter" label="Reporter" placeholder="-"
                                                 handleInput={handleInput}
                                                 defaultValue={editMode ? archive.reporter : ""}/>
                            </>

                        ) : (<></>)
                    }
                    {
                        archive.type === "Foto" ? (
                            <>
                                <CustomTextField id="activityDescription" label="Deskripsi Kegiatan" placeholder="-"
                                                 handleInput={handleInput}
                                                 defaultValue={editMode ? archive.activityDescription : ""}/>
                                <CustomTextField id="photographer" label="Fotografer" placeholder="-"
                                                 handleInput={handleInput}/>
                                <CustomTextField id="photoType" label="Jenis Foto" placeholder="Cetak (c)"
                                                 handleInput={handleInput}
                                                 defaultValue={editMode ? archive.photoType : ""}/>
                                <CustomTextField id="photoSize" label="Ukuran Foto" placeholder="3R"
                                                 handleInput={handleInput}
                                                 defaultValue={editMode ? archive.photoSize : ""}/>
                                <CustomTextField id="photoCondition" label="Kondisi Foto" placeholder="Baik"
                                                 handleInput={handleInput}
                                                 defaultValue={editMode ? archive.photoCondition : ""}/>
                            </>

                        ) : (<></>)
                    }
                    {
                        archive.type === "Tekstual" ? (
                            <>
                                <CustomTextField id="textualArchiveNumber" label="Nomor Arsip Tekstual" placeholder="5"
                                                 handleInput={handleInput}
                                                 defaultValue={editMode ? archive.textualArchiveNumber : ""}/>
                                <CustomTextField id="author" label="Pembuat" placeholder="-" handleInput={handleInput}
                                                 defaultValue={editMode ? archive.author : ""}/>
                            </>

                        ) : (<></>)
                    }
                    <DatePicker
                        id="date"
                        handleInput={handleInput}
                        defaultDateObj={editMode ? archive.date : new Date()}
                    />
                    <CustomTextField
                        id="archiveLocation"
                        label="Lokasi Simpan Arsip"
                        placeholder="AK1.L29"
                        handleInput={handleInput}
                        defaultValue={editMode ? archive.archiveLocation : ""}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Batal
                    </Button>
                    {/*TODO: Validasi semua isi form gaboleh ada yang kosong*/}
                    <Button onClick={handleSubmitArchive} color="primary">
                        {editMode ? 'Ubah' : 'Tambah'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

FormArchive.propTypes = {
    type: PropTypes.string,
    archive: PropTypes.object,
    classification: PropTypes.array,
    accessList: PropTypes.array,
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    isEdit: PropTypes.bool,
    handleClose: PropTypes.func,
    handleAddRequests: PropTypes.func,
    handleUpload: PropTypes.func,
    handleArchiveTypeChange: PropTypes.func,
    handleInput: PropTypes.func,
    handleSubmitArchive: PropTypes.func,
};
