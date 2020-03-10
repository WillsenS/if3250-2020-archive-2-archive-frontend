import React from "react";

import AdminLayout from "../../../src/components/Admin/Layout";
import AdminTable from "../../../src/components/Admin/AdminTable";
// import Header from "../../../src/components/Header";
// import Footer from "../../../src/components/Footer";

export default function AdminUsers() {
  const section = 2;
  return (
    <>
      {/* <Header /> */}
      <AdminLayout section={section} title="Pengaturan Data Admin">
        <AdminTable />
      </AdminLayout>
      {/* <Footer /> */}
    </>
  );
}
