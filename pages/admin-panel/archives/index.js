import React from "react";

import AdminLayout from "../../../src/components/Admin/Layout";
import ArchiveTable from "../../../src/components/Admin/ArchiveTable";

export default function AdminUsers() {
  const section = 3;
  return (
    <AdminLayout section={section} title="Pengaturan Data Arsip">
      <ArchiveTable />
    </AdminLayout>
  );
}
