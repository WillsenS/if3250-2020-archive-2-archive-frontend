import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
const useStyles = makeStyles(theme => ({
  input: {
    marginBottom: "1rem"
  },
  formControl: {
    margin: "1rem 0",
    minWidth: 120,
    maxWidth: 300
  }
}));

export default function AddArchive(props) {
  const [file, setFile] = useState("");
  const [archiveType, setArchiveType] = React.useState("");
  const { open, handleClose, isEdit } = props;
  const classes = useStyles();

  const handleUpload = () => {
    let fakePath = document.getElementById("archive-upload").value;
    fakePath = fakePath.replace(/.*[\/\\]/, "");
    setFile(fakePath);
  };

  const handleArchiveTypeChange = event => {
    setArchiveType(event.target.value);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        {isEdit ? (
          <DialogTitle id="form-dialog-title">
            Edit Arsip (nanti formnya auto diisi data arsip)
          </DialogTitle>
        ) : (
          <DialogTitle id="form-dialog-title">Tambah Arsip Baru</DialogTitle>
        )}
        <DialogContent dividers>
          <DialogContentText>
            Input data file yang akan ditambahkan
          </DialogContentText>
          <Box>
            <input
              hidden
              accept="*"
              className={classes.input}
              id="archive-upload"
              type="file"
              onChange={handleUpload}
            />
            <label htmlFor="archive-upload">
              <Button variant="contained" color="primary" component="span">
                Upload Arsip
              </Button>
            </label>
            <Typography component="span">
              <Box fontWeight="fontWeightLight" m={1} component="span">
                {file}
              </Box>
            </Typography>
          </Box>
          <FormControl required className={classes.formControl}>
            <InputLabel id="user-label">Tipe</InputLabel>
            <Select
              required
              labelId="tipe-klasifikasi"
              id="pilih-tipe-klasifikasi"
              value={archiveType}
              onChange={handleArchiveTypeChange}
            >
              <MenuItem value={1}>Audio/Video</MenuItem>
              <MenuItem value={2}>Foto</MenuItem>
              <MenuItem value={3}>Tekstual</MenuItem>
            </Select>
            <FormHelperText>Tipe Klasifikasi Dari Arsip </FormHelperText>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="number"
            label="Nomor Arsip"
            type="text"
            placeholder="AK/OA.AE.04/58"
            fullWidth
            required
            classes={{ root: classes.input }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="regrouping"
            label="Periode Regrouping"
            type="text"
            placeholder="AK"
            fullWidth
            required
            classes={{ root: classes.input }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="classification-scheme"
            label="Skema Klasifikasi"
            type="text"
            placeholder="OA.AE.04"
            fullWidth
            required
            classes={{ root: classes.input }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="location"
            label="Tempat Kegiatan/Pembuatan"
            type="text"
            placeholder="Senak Akademik ITB"
            fullWidth
            required
            classes={{ root: classes.input }}
          />
          <DatePicker />
          <TextField
            autoFocus
            margin="dense"
            id="archive-location"
            label="Lokasi Simpan Arsip"
            type="text"
            placeholder="AK1.L29"
            fullWidth
            required
            classes={{ root: classes.input }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="mime"
            label="Format File (Mime)"
            type="text"
            placeholder="Mp3, Audio,WAV"
            fullWidth
            required
            classes={{ root: classes.input }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Batal
          </Button>
          <Button onClick={handleClose} color="primary">
            Tambahkan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
