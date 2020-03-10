//Modules
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "500px"
  },
  title: {
    color: "#1aaa55"
  },
  buttonCancel: {
    color: "#333"
  },
  buttonExecute: {
    color: theme.palette.getContrastText("#1aaa55"),
    backgroundColor: "#1aaa55",
    borderColor: "#168f48",
    "&:hover": {
      backgroundColor: "#168f48",
      borderColor: "#12753a"
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function AddAdminDialog(props) {
  const { open, handleClose } = props;
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [faculty, setFaculty] = React.useState("");

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleFacultyChange = event => {
    setFaculty(event.target.value);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-new-admin"
        aria-describedby="form-to-select-new-admin"
        maxWidth="md"
        classes={{ root: classes.root }}
        disableBackdropClick
      >
        <DialogTitle classes={{ root: classes.title }}>
          Tambah Admin
        </DialogTitle>
        <DialogContent dividers>
          <FormControl required className={classes.formControl}>
            <InputLabel id="user-label">User</InputLabel>
            <Select
              labelId="pilih-user"
              id="pilih-user-admin-baru"
              value={name}
              onChange={handleNameChange}
            >
              <MenuItem value={1}>Abda Shaffan Diva</MenuItem>
              <MenuItem value={2}>Harry Rahmadi M</MenuItem>
              <MenuItem value={3}>Juniardi Akbar</MenuItem>
              <MenuItem value={4}>Willsen Sentosa</MenuItem>
              <MenuItem value={5}>M. Hendry Prasetya</MenuItem>
            </Select>
            <FormHelperText>
              Nama user yang akan diberikan akses admin
            </FormHelperText>
          </FormControl>
          <FormControl required className={classes.formControl}>
            <InputLabel id="pilih-fakultas">Fakultas/Sekolah</InputLabel>
            <Select
              labelId="pilih-fakultas"
              id="pilih-fakultas"
              value={faculty}
              onChange={handleFacultyChange}
            >
              <MenuItem value={1}>STEI</MenuItem>
              <MenuItem value={2}>FTMD</MenuItem>
              <MenuItem value={3}>FTTM</MenuItem>
              <MenuItem value={4}>SAPPK</MenuItem>
              <MenuItem value={5}>SBM</MenuItem>
              <MenuItem value={6}>FMIPA</MenuItem>
              <MenuItem value={7}>FTI</MenuItem>
              <MenuItem value={8}>SITH-S</MenuItem>
              <MenuItem value={9}>SITH-R</MenuItem>
              <MenuItem value={10}>FSRD</MenuItem>
              <MenuItem value={11}>FITB</MenuItem>
              <MenuItem value={12}>FTSL</MenuItem>
            </Select>
            <FormHelperText>Fakultas dari user yang dipilih</FormHelperText>
          </FormControl>
          <DialogActions>
            <Button color="default" onClick={handleClose}>
              Batal
            </Button>
            <Button classes={{ root: classes.buttonExecute }}>Tambahkan</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
