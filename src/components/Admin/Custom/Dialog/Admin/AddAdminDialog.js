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
  FormHelperText,
} from "@material-ui/core";

//PropTypes validation
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "500px",
  },
  title: {
    color: "#1aaa55",
  },
  buttonCancel: {
    color: "#333",
  },
  buttonExecute: {
    color: theme.palette.getContrastText("#1aaa55"),
    backgroundColor: "#1aaa55",
    borderColor: "#168f48",
    "&:hover": {
      backgroundColor: "#168f48",
      borderColor: "#12753a",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddAdminDialog(props) {
  const [userId, setUserId] = React.useState("");
  const [roleId, setRoleId] = React.useState("");
  const classes = useStyles();
  const {
    open,
    handleClose,
    userList,
    handleAddNewDataRequest,
    dataRole,
  } = props;

  const handleNameChange = (event) => {
    setUserId(event.target.value);
  };

  const handleUnitChange = (event) => {
    setRoleId(event.target.value);
  };

  const handleAddData = () => {
    handleAddNewDataRequest(userId, roleId);
    setUserId("");
    setRoleId("");
    handleClose();
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
              value={userId}
              onChange={handleNameChange}
            >
              {
                //List all users
                userList.map((user) => (
                  <MenuItem value={user._id} key={user._id}>
                    {user.fullname}
                  </MenuItem>
                ))
              }
              ;
            </Select>
            <FormHelperText>
              Nama user yang akan diberikan akses admin
            </FormHelperText>
          </FormControl>
          <FormControl required className={classes.formControl}>
            <InputLabel id="pilih-unit-kerja">Unit Kerja</InputLabel>
            <Select
              labelId="pilih-unit-kerja"
              id="pilih-unit-kerja"
              value={roleId}
              onChange={handleUnitChange}
            >
              {dataRole.map((r) => (
                <MenuItem value={r.kode} key={r.kode}>
                  {r.nama}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Unit Kerja dari user yang dipilih</FormHelperText>
          </FormControl>
          <DialogActions>
            <Button color="default" onClick={handleClose}>
              Batal
            </Button>
            <Button
              classes={{ root: classes.buttonExecute }}
              onClick={handleAddData}
            >
              Tambahkan
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

AddAdminDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  dataRole: PropTypes.array,
  userList: PropTypes.array,
  handleAddNewDataRequest: PropTypes.func,
};
