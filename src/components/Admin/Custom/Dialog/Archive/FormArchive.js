import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//PropTypes validation
import PropTypes from "prop-types";
import {
  makeStyles,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import DatePicker from "../../DatePicker";
import CustomTextField from "../../Input/CustomTextField";
import CustomRadio from "../../Input/CustomRadio";
import archiveTypeList from "../../../constants/ArchiveType";
import {
  ParseClassificationJsonArray,
  FlattenClassificationJsonArray,
} from "../../../../../../utils/Parser";
import CustomAutocomplete from "../../Input/CustomAutocomplete";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(() => ({
  input: {
    marginBottom: "1rem",
  },
  formControl: {
    margin: "1rem 0",
    minWidth: 120,
    maxWidth: 300,
  },
}));

export default function FormArchive(props) {
  const classes = useStyles();
  const [classification] = useState(
    FlattenClassificationJsonArray(
      ParseClassificationJsonArray(props.classification)
    )
  );
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const { isOpen, handleClose, archive } = props;

  const editMode = props.type === "edit";
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file != null) {
      props.handleUpload(file);
    }
  };

  const handleArchiveTypeChange = (event) => {
    props.handleArchiveTypeChange(event);
  };

  const handleInput = (attr, val) => {
    props.handleInput(attr, val);
  };

  const handleSubmitArchive = () => {
    if (isAllInputFilled()) {
      props.handleSubmitArchive();
      handleClose();
    } else {
      setErrorSnackbar(true);
    }
  };
  const isAllInputFilled = () => {
    for (const property in archive) {
      if (property !== "forPublicOption") {
        if (!archive[property] || archive[property].length <= 0) {
          return false;
        }
      }
    }
    return true;
  };
  const handleAutoComplete = (id, val) => {
    handleInput(id, val);
  };

  const getArchiveUploaderFilter = (type) => {
    switch (type) {
      case "Audio":
        return "audio/*";
      case "Video":
        return "video/*";
      case "Text":
        return "*";
      case "Photo":
        return "image/*";
      default:
        return "*";
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
          {/* Changed business logic: User can't edit the file itself, only the metadata */}
          {/* User can do archive reupload if there's some mistake in the uploaded data*/}
          {!editMode ? (
            <>
              <DialogContentText>
                Input data file yang akan ditambahkan
              </DialogContentText>
              <FormControl required className={classes.formControl}>
                <InputLabel id="user-label">Tipe</InputLabel>
                <Select
                  required
                  labelId="tipe-klasifikasi"
                  id="pilih-tipe-klasifikasi"
                  value={archive.type}
                  onChange={handleArchiveTypeChange}
                >
                  {archiveTypeList.map((type) => {
                    return (
                      <MenuItem value={type.name} key={type.id}>
                        {type.label}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>Tipe Klasifikasi Dari Arsip </FormHelperText>
              </FormControl>
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
                    {archive.file ? archive.file.name : ""}
                  </Box>
                </Typography>
              </Box>
            </>
          ) : (
            <></>
          )}
          {/*Uploader File*/}

          {/* Judul Arsip */}
          <CustomTextField
            id="filename"
            label="Judul Arsip"
            placeholder=""
            handleInput={handleInput}
            value={archive.filename}
          />
          {/* Metadata fields that exist on every archive type*/}
          <CustomTextField
            id="code"
            label="Nomor Arsip"
            placeholder=""
            handleInput={handleInput}
            value={archive.code}
          />
          <CustomAutocomplete
            id="classificationPattern"
            label="Pola Klasifikasi"
            classificationList={classification}
            handleAutoComplete={handleAutoComplete}
            value={archive.classificationPattern}
          />

          <CustomRadio
            id="forPublicOption"
            label="Terbuka Untuk Umum?"
            value={archive.forPublicOption ? 1 : 0}
            handleInput={handleInput}
          />

          <CustomTextField
            id="location"
            label="Tempat Kegiatan/Pembuatan"
            placeholder="Senat Akademik ITB"
            handleInput={handleInput}
            value={archive.location}
          />
          <CustomTextField
            id="description"
            label="Keterangan"
            placeholder="-"
            handleInput={handleInput}
            value={archive.description}
          />

          {/*Show extra fields depending on the selected archive type*/}
          {archive.type === "Audio" || archive.type === "Video" ? (
            <>
              <CustomTextField
                id="narrator"
                label="Narator"
                placeholder="-"
                handleInput={handleInput}
                value={archive.narrator}
              />
              <CustomTextField
                id="reporter"
                label="Reporter"
                placeholder="-"
                handleInput={handleInput}
                value={archive.reporter}
              />
            </>
          ) : (
            <></>
          )}
          {archive.type === "Photo" ? (
            <>
              <CustomTextField
                id="activityDescription"
                label="Deskripsi Kegiatan"
                placeholder="-"
                handleInput={handleInput}
                value={archive.activityDescription}
              />
              <CustomTextField
                id="photographer"
                label="Fotografer"
                placeholder="-"
                handleInput={handleInput}
                value={archive.photographer}
              />
              <CustomTextField
                id="photoType"
                label="Jenis Foto"
                placeholder="Cetak (c)"
                handleInput={handleInput}
                value={archive.photoType}
              />
              <CustomTextField
                id="photoSize"
                label="Ukuran Foto"
                placeholder="3R"
                handleInput={handleInput}
                value={archive.photoSize}
              />
              <CustomTextField
                id="photoCondition"
                label="Kondisi Foto"
                placeholder="Baik"
                handleInput={handleInput}
                value={archive.photoCondition}
              />
            </>
          ) : (
            <></>
          )}
          {archive.type === "Text" ? (
            <>
              <CustomTextField
                id="textualArchiveNumber"
                label="Nomor Arsip Tekstual"
                placeholder="5"
                handleInput={handleInput}
                value={archive.textualArchiveNumber}
              />
              <CustomTextField
                id="author"
                label="Pembuat"
                placeholder="-"
                handleInput={handleInput}
                value={archive.author}
              />
            </>
          ) : (
            <></>
          )}
          <DatePicker
            id="date"
            label="Tanggal Pembuatan Arsip"
            handleInput={handleInput}
            defaultDateObj={editMode ? archive.date : new Date()}
          />

          <CustomTextField
            id="archiveLocation"
            label="Lokasi Simpan Arsip"
            placeholder="AK1.L29"
            handleInput={handleInput}
            value={archive.archiveLocation}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Batal
          </Button>
          {/*TODO: Validasi semua isi form gaboleh ada yang kosong*/}
          <Button onClick={handleSubmitArchive} color="primary">
            {editMode ? "Ubah" : "Tambah"}
          </Button>
        </DialogActions>
      </Dialog>
      {/*Error snackbar/ toast*/}
      <Snackbar
        open={errorSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        key={`bottom center`}
        autoHideDuration={3000}
        onClose={() => {
          setErrorSnackbar(false);
        }}
      >
        <Alert
          onClose={() => {
            setErrorSnackbar(false);
          }}
          severity="error"
        >
          Isi Seluruh Input pada Form
        </Alert>
      </Snackbar>
    </div>
  );
}

FormArchive.propTypes = {
  type: PropTypes.string,
  archive: PropTypes.object,
  classification: PropTypes.array,
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
