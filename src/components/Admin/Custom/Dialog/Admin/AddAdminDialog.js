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

//PropTypes validation
import PropTypes from 'prop-types';
import Faculty from "../../../constants/Faculty";

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
    const {open, handleClose, userList, handleAddNewDataRequest} = props;
    const classes = useStyles();
    const [name, setName] = React.useState("");
    const [faculty, setFaculty] = React.useState("");

    const handleNameChange = event => {
        setName(event.target.value.trim());
    };

    const handleFacultyChange = event => {
        setFaculty(event.target.value.trim());
    };

    const handleAddData = () => {
        handleAddNewDataRequest({
            name, faculty, access: 2 //ADMIN
        });
        setName("");
        setFaculty("");
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
                classes={{root: classes.root}}
                disableBackdropClick
            >
                <DialogTitle classes={{root: classes.title}}>
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
                            {
                                //List all users
                                userList.map((user) =>
                                    <MenuItem value={user.name} key={user.id}>{user.name}</MenuItem>
                                )
                            };
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
                            {
                                Faculty.map(faculty => (
                                    <MenuItem value={faculty.name} key={faculty.code}>{faculty.name}</MenuItem>
                                ))
                            }
                        </Select>
                        <FormHelperText>Fakultas dari user yang dipilih</FormHelperText>
                    </FormControl>
                    <DialogActions>
                        <Button color="default" onClick={handleClose}>
                            Batal
                        </Button>
                        <Button classes={{root: classes.buttonExecute}} onClick={handleAddData}>Tambahkan</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
}

AddAdminDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    userList: PropTypes.array,
    handleAddNewDataRequest: PropTypes.func
};
