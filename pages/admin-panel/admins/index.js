// @ts-nocheck
import React, { useState } from "react";
import useUpdateUsers from "../../../hooks/admins/useUpdateUser";
import HighAdminLayout from "../../../src/components/Admin/Layout/HighAdmin";
import AdminTable from "../../../src/components/Admin/AdminTable";

function AdminUsers(props) {
  const state = useUpdateUsers(props.token);
  const section = 2; //Section: Admin

  return (
    <HighAdminLayout
      section={section}
      title="Pengaturan Data Admin"
      token={props.token}
    >
      <AdminTable
        dataAdmin={state.admins}
        dataUser={state.users}
        dataRole={state.userRoleList}
        page={state.page}
        totalPages={state.totalPages}
        handlePageRequest={state.handlePageRequest}
        handleAddNewDataRequest={state.handleChangeUserRole}
        handleDeleteDataRequest={state.handleDeleteAdmin}
        handleEditDataRequest={state.handleChangeUserRole}
        handleSearch={state.handleSearch}
        loading={state.loading}
        error={state.error}
      />
    </HighAdminLayout>
  );
}

AdminUsers.getInitialProps = ({ req }) => {
  if (req && req.cookies) {
    return { token: req.cookies.token };
  } else {
    return {};
  }
};

export default AdminUsers;
