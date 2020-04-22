import React, { useState, useEffect } from "react";
import RequestTable from "../../../src/components/Admin/RequestTable";
import AdminLayout from "../../../src/components/Admin/Layout";
import Typography from "@material-ui/core/Typography";

import { getArchiveBorrowRequestList } from "../../../resources/archive";

export default function ArchiveRequest() {
  const [request, setRequest] = useState([]);

  const acceptRequest = (id) => {
    const filtered = request.filter((req) => req._id !== id);
    setRequest(filtered);
  };

  const getData = async () => {
    const response = await getArchiveBorrowRequestList();
    console.log(response);
    setRequest([...response.data]);
  };

  useEffect(() => {
    console.log("Req");
    getData();
  }, []);

  return (
    <AdminLayout section={4} title="Data Permintaan Peminjaman Arsip">
      {request.length > 0 ? (
        <RequestTable
          title="Daftar Permintaan Peminjaman Arsip"
          requestList={request}
          handleClick={acceptRequest}
        />
      ) : (
        <Typography variant="h3" component="h2" style={{ marginLeft: "3rem" }}>
          Tidak ada permintaan peminjaman arsip
        </Typography>
      )}
    </AdminLayout>
  );
}
