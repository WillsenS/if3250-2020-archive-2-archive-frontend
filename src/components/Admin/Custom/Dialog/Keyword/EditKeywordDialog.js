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
import CustomTextField from "../../Input/CustomTextField";

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

export default function EditKeywordDialog(props) {
  const { data, open, handleClose, handleEdit } = props;
  const classes = useStyles();

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

  const handleInput = () => {
    console.log("++");
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
        <DialogTitle id="form-dialog-title">Edit Keyword</DialogTitle>
        <DialogContent dividers>
          <Box className={classes.content}>
            <FormControl className={classes.formControl} disabled>
              <CustomTextField
                id="keyword"
                label="Keyword"
                placeholder=""
                handleInput={handleInput}
                value={data.keyword}
              />
            </FormControl>
            <FormControl required className={classes.formControl}>
              <CustomTextField
                id="priority"
                label="priotity"
                placeholder=""
                value={data.index}
              />
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

EditKeywordDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  data: PropTypes.object,
  handleEdit: PropTypes.func,
};
