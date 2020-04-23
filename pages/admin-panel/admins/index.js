// @ts-nocheck
import React, { useEffect, useState } from "react";

import AdminLayout from "../../../src/components/Admin/Layout";
import AdminTable from "../../../src/components/Admin/AdminTable";
import {
  getAdmins,
  getNonAdmins,
  patchEditUserRole,
  patchResetRoleToDefault,
} from "../../../resources/user";
import axios from "axios";

function AdminUsers(props) {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [actionSet, setActionSet] = useState({
    userId: "",
    roleId: 0,
    action: 0,
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(false);
  const section = 2; //Section: Admin
  const IDLE = 0;
  const CHANGE_ADMIN = 1;
  const DELETE_ADMIN = 2;

  //Update tables after CRD operation
  const updateTables = async (role_id, pages) => {
    try {
      const [res1, res2] = await Promise.all([
        getAdmins(role_id, pages, props.token),
        getNonAdmins(null, null, props.token),
      ]);
      if (res1.status === 200 && res2.status === 200) {
        setAdmins(res1.data.data);
        setUsers(res2.data.data);
        setPage(res1.data.currentPage);
        setTotalPages(res1.data.totalPages);
        setActionSet({ userId: "", roleId: 0, action: IDLE });
      }
    } catch (err) {
      setError(true);
    }
  };

  //Change access handler
  useEffect(() => {
    let mounted = true;
    let source = axios.CancelToken.source();
    const changeAdminAccess = async (user_id, role_id, action, source) => {
      try {
        let res;
        if (action === CHANGE_ADMIN) {
          res = await patchEditUserRole(user_id, role_id, source, props.token);
        } else if (action === DELETE_ADMIN) {
          res = await patchResetRoleToDefault(user_id, source, props.token);
        } else {
          return;
        }
        if (res.status === 200) {
          alert("Berhasil mengubah role user");
          setActionSet({ ...actionSet, action: IDLE });
          await updateTables();
        } else {
          alert("Gagal mengubah role user");
        }
      } catch (e) {
        alert("Gagal mengubah role user");
      }
    };
    (async () => {
      await changeAdminAccess(
        actionSet.userId,
        actionSet.roleId,
        actionSet.action,
        source
      );
    })();
    return () => {
      mounted = false;
      source.cancel("Req. cancelled because user left the page");
    };
  }, [actionSet]);

  //pagination handler
  useEffect(() => {
    (async () => {
      await updateTables(null, page);
    })();
  }, [page]);

  const handlePageRequest = (val) => {
    setPage(parseInt(val));
  };

  const handleSearch = (val) => {
    // TODO: Tembak Backend (route?)
  };

  const handleAddNewAdminRequest = (userId, roleId) => {
    setActionSet({ userId, roleId, action: CHANGE_ADMIN });
  };

  const handleDeleteAdminRequest = (userId) => {
    setActionSet({ userId, roleId: 0, action: DELETE_ADMIN });
  };

  const handleEditAdminRequest = (userId, roleId) => {
    setActionSet({ userId, roleId, action: CHANGE_ADMIN });
  };

  return (
    <AdminLayout section={section} title="Pengaturan Data Admin">
      {admins && users ? (
        <AdminTable
          dataAdmin={admins}
          dataUser={users}
          page={page}
          totalPages={totalPages}
          handlePageRequest={handlePageRequest}
          handleAddNewDataRequest={handleAddNewAdminRequest}
          handleDeleteDataRequest={handleDeleteAdminRequest}
          handleEditDataRequest={handleEditAdminRequest}
          handleSearch={handleSearch}
        />
      ) : (
        <span>Terjadi kesalahan pada saat mengambil data</span>
      )}
    </AdminLayout>
  );
}

AdminUsers.getInitialProps = ({ req, query }) => {
  if (req && req.cookies) return { ...query, token: req.cookies.token };
  else return query;
};

export default AdminUsers;
