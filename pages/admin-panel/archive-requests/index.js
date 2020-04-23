import React, { useState, useEffect } from "react";
import RequestTable from "../../../src/components/Admin/RequestTable";
import AdminLayout from "../../../src/components/Admin/Layout";
import Typography from "@material-ui/core/Typography";

import {
  getArchiveBorrowRequestList,
  patchArchiveBorrowRequest,
} from "../../../resources/archive";

export default function ArchiveRequest() {
  const [request, setRequest] = useState([]);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertText, setAlertText] = useState("");

  const acceptRequest = async (payload) => {
    payload.status = 1;
    const response = await patchArchiveBorrowRequest(payload);

    if (!response.error) {
      getData();
      setSeverity("success");
      setAlertText("Arsip berhasil dipinjamkan!");
      setOpen(true);
    } else {
      setSeverity("error");
      setAlertText("Maaf, terjadi error saat mencatat permohonan Anda!");
      setOpen(true);
    }
  };

  const rejectRequest = async (payload) => {
    payload.status = 2;
    const response = await patchArchiveBorrowRequest(payload);

    if (!response.error) {
      getData();
      setSeverity("success");
      setAlertText("Arsip berhasil ditolak!");
      setOpen(true);
    } else {
      setSeverity("error");
      setAlertText("Maaf, terjadi error saat mencatat permohonan Anda!");
      setOpen(true);
    }
  };

  const getData = async () => {
    const response = await getArchiveBorrowRequestList();
    setRequest([...response.data]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AdminLayout section={4} title="Data Permintaan Peminjaman Arsip">
      {request.length > 0 ? (
        <RequestTable
          title="Daftar Permintaan Peminjaman Arsip"
          requestList={request}
          handleAccept={acceptRequest}
          handleReject={rejectRequest}
          open={open}
          setOpen={setOpen}
          severity={severity}
          alertText={alertText}
        />
      ) : (
        <Typography variant="h3" component="h2" style={{ marginLeft: "3rem" }}>
          Tidak ada permintaan peminjaman arsip
        </Typography>
      )}
    </AdminLayout>
  );
}
