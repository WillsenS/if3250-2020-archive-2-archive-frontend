//Custom
//Modules
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {makeStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import DialogContentText from "@material-ui/core/DialogContentText";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";


const useStyles = makeStyles(theme => ({
    remove: {
        backgroundColor: theme.palette.getContrastText("#cb2431"),
        color: "#cb2431"
    }
}));

export default function DeleteConfirmDialog(props) {
    const {open, handleClose, handleDelete, data} = props;
    const classes = useStyles();

    const handleDeleteClick = (admin_id) => {
        handleDelete(admin_id);
        handleClose();
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="delete-confirmation-alert"
                aria-describedby="Confirmation-popup-for-deletion"
            >
                <DialogTitle id="alert-dialog-title" style={{color: "#cb2431"}}>
                    Konfirmasi Penghapusan Akses Admin
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Anda yakin ingin menghapus akses admin untuk user ini?</DialogContentText>
                    <List
                        component="div"
                        role="list">
                        <ListItem divider role="listitem">
                            <ListItemText
                                primary="Nama Admin"
                                secondary={data.fullname}
                            />
                        </ListItem>
                        <ListItem divider role="listitem">
                            <ListItemText
                                primary="Akses Admin untuk Fakultas/Sekolah"
                                secondary={data.role}
                            />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="default"
                        size="small"
                    >
                        Batalkan
                    </Button>
                    <Button
                        onClick={() => {
                            handleDeleteClick(data._id)
                        }}
                        color="default"
                        classes={{root: classes.remove}}
                        size="small"
                    >
                        Hapus
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


DeleteConfirmDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    data: PropTypes.object,
    handleDelete: PropTypes.func
};