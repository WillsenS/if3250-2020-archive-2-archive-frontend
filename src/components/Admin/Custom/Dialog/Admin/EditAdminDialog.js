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
  Box,
} from "@material-ui/core";
import Role from "../../../../../scheme/Unit";

//PropTypes validation
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: "500px"
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
  },
  title: {
    color: "#333",
  },
  buttonCancel: {
    color: "#333",
  },
  buttonExecute: {
    color: theme.palette.getContrastText("#E0e0e0"),
    backgroundColor: "#E0e0e0",
    borderColor: "#E0e0e0",
    "&:hover": {
      backgroundColor: "#E0e0e0",
      borderColor: "#E0e0e0",
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

export default function EditAdminDialog(props) {
  const { open, handleClose, handleEdit } = props;
  const classes = useStyles();
  const [userId, setUserId] = React.useState(
    props.data._id ? props.data._id : ""
  );
  const [roleId, setRoleId] = React.useState(
    props.data.role ? props.data.role : ""
  );

  const handleUserSelected = (event) => {
    setUserId(event.target.value);
  };

  const handleUnitSelected = (event) => {
    setRoleId(event.target.value);
  };

  const handleEditClick = () => {
    if (roleId) {
      handleEdit(props.data._id, roleId);
      handleClose();
    } else {
      alert("Pilih role untuk user");
    }
  };

  const handleCloseClick = () => {
    handleClose();
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
        <DialogContent dividers>
          <Box className={classes.content}>
            <FormControl className={classes.formControl} disabled>
              <InputLabel shrink id="admin">
                Nama Admin
              </InputLabel>
              <Select
                labelId="pilih-user"
                id="pilih-user"
                value=""
                onChange={handleUserSelected}
                displayEmpty
              >
                <MenuItem value="">{props.data.fullname}</MenuItem>
              </Select>
            </FormControl>
            <FormControl required className={classes.formControl}>
              <InputLabel shrink id="pilih-unit-kerja">
                Unit Kerja
              </InputLabel>
              <Select
                labelId="pilih-unit-kerja"
                id="pilih-unit-kerja"
                value={roleId}
                onChange={handleUnitSelected}
                displayEmpty
              >
                {Role.map((r) => (
                  <MenuItem value={r._id} key={r._id}>
                    {r.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Ubah Unit Kerja</FormHelperText>
            </FormControl>
          </Box>
          <DialogActions>
            <Button color="default" onClick={handleCloseClick}>
              Batal
            </Button>
            <Button
              classes={{ root: classes.buttonExecute }}
              onClick={() => {
                handleEditClick(props.data);
              }}
            >
              Ubah
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

EditAdminDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  data: PropTypes.object,
  handleEdit: PropTypes.func,
};
