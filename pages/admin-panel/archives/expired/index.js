import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../src/components/Admin/Layout";
import ExpiredArchiveTable from "../../../../src/components/Admin/ExpiredArchiveTable";
import Classification from "../../../../src/scheme/Classification";
import { getArchiveList } from "../../../../resources/archive";

export default function Archives() {
  const [archiveList, setArchiveList] = useState([]);
  const section = 3;

  const handlePageRequests = (val) => {};

  const fetchExpiredArchives = async () => {
    try {
      const response = await getArchiveList("*", 1, []);
      setArchiveList(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpiredArchives();
  }, []);

  return (
    <AdminLayout section={section} title="Pengaturan Data Arsip">
      <ExpiredArchiveTable
        archiveList={archiveList}
        classification={Classification.klasifikasi}
        handlePageRequests={handlePageRequests}
      />
    </AdminLayout>
  );
}
