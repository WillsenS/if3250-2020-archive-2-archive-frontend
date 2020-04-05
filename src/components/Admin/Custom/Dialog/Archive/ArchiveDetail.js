import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import DialogContentText from "@material-ui/core/DialogContentText";


/**
 * @return {boolean}
 */

const useStyles = makeStyles(() => ({
    remove: {
        backgroundColor: red[50],
        color: "#cb2431",
    },
    redText: {
        color: "#cb2431",
        fontWeight: "bold",
    }
}));

function ArchiveListItem(props) {
    return (
        <ListItem button divider role="listitem">
            <ListItemText
                primary={props.label}
                secondary={props.data}
            />
        </ListItem>
    );
}


export default function ArchiveDetail(props) {
    const {isOpen, handleClose, archive} = props;
    const classes = useStyles();

    const deleteModal = props.type === "delete";

    const handleDeleteClick = () => {
        props.handleDelete();
        handleClose();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="archive-detail"
            aria-describedby="list-archive-detail"
            disableBackdropClick>
            {
                deleteModal ? (
                    <DialogTitle id="archive-name" classes={{root: classes.redText}}>Konfirmasi Penghapusan
                        Arsip</DialogTitle>
                ) : (
                    <DialogTitle id="archive-name">Detail {archive.name}</DialogTitle>
                )
            }
            <DialogContent>
                {
                    deleteModal ? (
                        <DialogContentText>Anda yakin ingin menghapus arsip berikut ?</DialogContentText>
                    ) : (<></>)
                }
                <List
                    component="div"
                    role="list"
                >
                    <ArchiveListItem label="Nama Arsip" data={archive.name}/>
                    <ArchiveListItem label="Tipe Arsip" data={archive.type}/>
                    <ArchiveListItem label="Kode Arsip" data={archive.code}/>
                    <ArchiveListItem label="Pola Klasifikasi" data={`${archive.classificationPattern.kode} ${archive.classificationPattern.nama}`}/>
                    <ArchiveListItem label="Lokasi" data={archive.location}/>
                    <ArchiveListItem label="Deskripsi Arsip" data={archive.description}/>
                    <ArchiveListItem label="Tanggal Pembuatan Arsip" data={archive.date.toString()}/>
                    <ArchiveListItem label="Format File" data={archive.mime}/>
                    {
                        archive.type === "Video" || archive.type === "Audio" ? (
                            <>
                                <ArchiveListItem label="Narator" data={archive.narrator}/>
                                <ArchiveListItem label="Reporter" data={archive.reporter}/>
                            </>

                        ) : (<></>)
                    }
                    {
                        archive.type === "Foto" ? (
                            <>
                                <ArchiveListItem label="Deskripsi Kegiatan pada Foto"
                                                 data={archive.activityDescription}/>
                                <ArchiveListItem label="Fotografer" data={archive.photographer}/>
                                <ArchiveListItem label="Tipe Foto" data={archive.photoType}/>
                                <ArchiveListItem label="Ukuran Foto" data={archive.photoSize}/>
                                <ArchiveListItem label="Kondisi Foto" data={archive.photoCondition}/>
                            </>

                        ) : (<></>)
                    }
                    {
                        archive.type === "Tekstual" ? (
                            <>
                                <ArchiveListItem label="Nomor Arsip Tekstual" data={archive.textualArchiveNumber}/>
                                <ArchiveListItem label="Pembuat" data={archive.author}/>
                            </>

                        ) : (<></>)
                    }
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default">
                    Kembali
                </Button>
                {
                    deleteModal ? (
                        <Button
                            onClick={handleDeleteClick}
                            classes={{
                                root: classes.remove
                            }}>
                            Hapus
                        </Button>
                    ) : (<></>)
                }
            </DialogActions>
        </Dialog>
    );
}

ArchiveDetail.propTypes = {
    archive: PropTypes.object,
    type: PropTypes.string,
    isOpen: PropTypes.bool,
    deleteMode: PropTypes.bool,
    detailMode: PropTypes.bool,
    handleClose: PropTypes.func,
    handleDelete: PropTypes.func,
};

ArchiveListItem.propTypes = {
    label: PropTypes.string,
    data: PropTypes.string
};