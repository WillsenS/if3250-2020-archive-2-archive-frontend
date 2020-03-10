//Modules
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  makeStyles,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    // minWidth: "500px"
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline"
  },
  title: {
    color: "#333"
  },
  buttonCancel: {
    color: "#333"
  },
  buttonExecute: {
    color: theme.palette.getContrastText("#E0e0e0"),
    backgroundColor: "#E0e0e0",
    borderColor: "#E0e0e0",
    "&:hover": {
      backgroundColor: "#E0e0e0",
      borderColor: "#E0e0e0"
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

export default function EditAdminDialog(props) {
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
        aria-labelledby="edit-admin"
        aria-describedby="form-to-select-admin"
        maxWidth="lg"
        classes={{ root: classes.root }}
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">Edit Admin</DialogTitle>

        {/* <DialogTitle classes={{ root: classes.title }} disableTypography>
          <Typography variant="h4" component="h1">
            Ubah Admin
          </Typography> */}
        {/* </DialogTitle> */}
        <DialogContent dividers>
          <Box className={classes.content}>
            <FormControl className={classes.formControl} disabled>
              <InputLabel shrink id="admin">
                Nama Admin
              </InputLabel>
              <Select
                labelId="pilih-user"
                id="pilih-user"
                value={name}
                onChange={handleNameChange}
                displayEmpty
              >
                <MenuItem value="">Adam Ardianto A.</MenuItem>
              </Select>
            </FormControl>
            <FormControl required className={classes.formControl}>
              <InputLabel shrink id="pilih-fakultas">
                Fakultas
              </InputLabel>
              <Select
                labelId="pilih-fakultas"
                id="pilih-fakultas"
                value={faculty}
                onChange={handleFacultyChange}
                displayEmpty
              >
                <MenuItem value="">FTMD</MenuItem>
                <MenuItem value={1}>STEI</MenuItem>
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
              <FormHelperText>Ubah Fakultas/Sekolah</FormHelperText>
            </FormControl>
          </Box>
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
