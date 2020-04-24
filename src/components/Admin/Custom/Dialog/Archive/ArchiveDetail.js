import React from "react";
import moment from "moment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import DialogContentText from "@material-ui/core/DialogContentText";

/**
 * @return {boolean}
 */

const useStyles = makeStyles(() => ({
  root: {
    minWidth: "50%",
  },
  remove: {
    backgroundColor: red[50],
    color: "#cb2431",
  },
  redText: {
    color: "#cb2431",
    fontWeight: "bold",
  },
}));

function ArchiveListItem(props) {
  const showedData = Array.isArray(props.data)
    ? props.data.join(", ")
    : props.data;
  return (
    <ListItem button divider role="listitem">
      {<ListItemText primary={props.label} secondary={showedData} />}
    </ListItem>
  );
}

export default function ArchiveDetail(props) {
  const { isOpen, handleClose, archive } = props;
  const classes = useStyles();

  const deleteModal = props.type === "delete";

  const handleDeleteClick = () => {
    props.handleDelete();
    handleClose();
  };

  const getLabel = (val) => {
    switch (val) {
      case "Audio":
        return val;
      case "Video":
        return val;
      case "Photo":
        return "Foto";
      case "Text":
        return "Tekstual";
      default:
        // console.log('Invalid Archive Data Type, No Label Specified');
        break;
    }
  };

  moment.locale("id");
  console.log(archive);
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="archive-detail"
      aria-describedby="list-archive-detail"
      className={classes.root}
      maxWidth={false}
      disableBackdropClick
    >
      {deleteModal ? (
        <DialogTitle id="archive-name" classes={{ root: classes.redText }}>
          Konfirmasi Penghapusan Arsip
        </DialogTitle>
      ) : (
        <DialogTitle id="archive-name">
          Detail <span style={{ fontWeight: "bold" }}>{archive.filename}</span>
        </DialogTitle>
      )}
      <DialogContent>
        {deleteModal ? (
          <DialogContentText>
            Anda yakin ingin menghapus arsip berikut ?
          </DialogContentText>
        ) : (
          <></>
        )}
        <List component="div" role="list">
          <ArchiveListItem label="Nama Arsip" data={archive.filename} />
          <ArchiveListItem label="Tipe Arsip" data={getLabel(archive.type)} />
          <ArchiveListItem label="Kode Arsip" data={archive.code} />
          {archive.classificationPattern ? (
            <ArchiveListItem
              label="Pola Klasifikasi"
              data={archive.classificationPattern}
            />
          ) : (
            <></>
          )}
          <ArchiveListItem
            label="Terbuka Untuk Umum"
            data={archive.forPublicOption === 1 ? "Ya" : "Tidak"}
          />
          <ArchiveListItem label="Lokasi" data={archive.location} />
          <ArchiveListItem label="Deskripsi Arsip" data={archive.description} />
          <ArchiveListItem
            label="Tanggal Pembuatan Arsip"
            // data={moment(archive.date).format("LL")} <-- To be deprecated, got warning on web console
            data={archive.date}
          />
          <ArchiveListItem label="Format File" data={archive.mime} />
          {archive.type === "Video" || archive.type === "Audio" ? (
            <>
              <ArchiveListItem label="Narator" data={archive.narrator} />
              <ArchiveListItem label="Reporter" data={archive.reporter} />
            </>
          ) : (
            <></>
          )}
          {archive.type === "Photo" ? (
            <>
              <ArchiveListItem
                label="Deskripsi Kegiatan pada Foto"
                data={archive.activityDescription}
              />
              <ArchiveListItem label="Fotografer" data={archive.photographer} />
              <ArchiveListItem label="Tipe Foto" data={archive.photoType} />
              <ArchiveListItem label="Ukuran Foto" data={archive.photoSize} />
              <ArchiveListItem
                label="Kondisi Foto"
                data={archive.photoCondition}
              />
            </>
          ) : (
            <></>
          )}
          {archive.type === "Text" ? (
            <>
              <ArchiveListItem
                label="Nomor Arsip Tekstual"
                data={archive.textualArchiveNumber}
              />
              <ArchiveListItem label="Pembuat" data={archive.author} />
            </>
          ) : (
            <></>
          )}
          <ArchiveListItem
            label="Lokasi Simpan Arsip"
            data={archive.archiveLocation}
          />
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default">
          Kembali
        </Button>
        {deleteModal ? (
          <Button
            onClick={handleDeleteClick}
            classes={{
              root: classes.remove,
            }}
          >
            Hapus
          </Button>
        ) : (
          <></>
        )}
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
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};
