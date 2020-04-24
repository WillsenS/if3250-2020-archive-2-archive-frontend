import React, { useState, useEffect } from "react";
import {
  getNonAdmins,
  getAdmins,
  patchEditUserRole,
  patchResetRoleToDefault,
} from "../../resources/user";
import axios from "axios";

/**
 * Custom hook for controlling role management section logic.
 * @param {string} authToken Authentication token
 * @returns {object} Archive object state, with self-documenting names
 */
export default function useUpdateUser(authToken) {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("*");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updateUser, setUpdateUser] = useState({
    userId: "",
    roleId: 0,
  });
  const IDLE = 0;
  const CHANGE_ADMIN = 1;
  const DELETE_ADMIN = 2;
  const [action, setAction] = useState(IDLE);

  const handleUpdateTables = async (role_id, pages) => {
    const updateTableError =
      "Gagal melakukan update pada tabel admin, silahkan coba beberapa saat lagi";
    try {
      setLoading(true);
      const sourceToken = axios.CancelToken.source();
      const [getAdminRes, getNonAdminRes] = await Promise.all([
        getAdmins(role_id, pages, sourceToken, authToken),
        // No page num specified , server will provide all non-admin users
        getNonAdmins(null, sourceToken, authToken),
      ]);
      if (getAdminRes.status === 200 && getNonAdminRes.status === 200) {
        setAdmins(getAdminRes.data.data);
        setUsers(getNonAdminRes.data.data);
        setPage(getAdminRes.data.currentPage);
        setTotalPages(getAdminRes.data.totalPages);
      } else {
        setError(updateTableError);
      }
    } catch (err) {
      setError(updateTableError);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeUserRole = (userId, roleId) => {
    setAction(CHANGE_ADMIN);
    setUpdateUser({ userId, roleId });
  };

  const handleDeleteAdmin = (userId) => {
    setAction(DELETE_ADMIN);
    setUpdateUser({ ...updateUser, userId });
  };

  const handleSearch = (query) => {
    setQuery(query);
  };

  const handlePageRequest = (page) => {
    setPage(parseInt(page, 10));
  };

  // Admin update handler
  useEffect(() => {
    let mounted = true;
    let sourceToken = axios.CancelToken.source();
    (async () => {
      const errorText =
        "Gagal melakukan update pada user. Silahkan coba beberapa saat lagi";
      try {
        setLoading(true);
        let res;
        switch (action) {
          case CHANGE_ADMIN:
            res = await patchEditUserRole(
              updateUser.userId,
              updateUser.roleId,
              sourceToken,
              authToken
            );
            if (res.status === 200) {
              if (mounted) {
                await handleUpdateTables();
              } else {
                setError(errorText);
              }
            }
            break;
          case DELETE_ADMIN:
            res = await patchResetRoleToDefault(
              updateUser.userId,
              sourceToken,
              authToken
            );
            if (res.status === 200) {
              if (mounted) {
                await handleUpdateTables();
              } else {
                setError(errorText);
              }
            }
            break;
          default:
            break;
        }
      } catch (err) {
        setError(errorText);
      } finally {
        setLoading(false);
        setAction(IDLE);
      }
    })();

    return () => {
      mounted = false;
      sourceToken.cancel("Request cancelled because user left the page");
    };
  }, [updateUser]);

  // Pagination and search handler
  useEffect(() => {
    // TODO: Ideally, admin search functionality should be integrated within this handler
    const errorText =
      "Gagal melakukan pencarian dan update halaman. Silahkan coba beberapa saat lagi";
    let mounted = true;
    if (query.length <= 0) return;
    let sourceToken = axios.CancelToken.source();
    try {
      setLoading(true);
      (async () => {
        if (mounted) {
          // Unspecified role_id, will get all admins from server
          await handleUpdateTables(null, page);
        }
      })();
    } catch (err) {
      setError(errorText);
    } finally {
      setLoading(false);
    }
    return () => {
      mounted = false;
      sourceToken.cancel("Request cancelled because user left the page");
    };
  }, [query, page]);

  // Error handler
  useEffect(() => {
    if (error.length <= 0) return;
    alert(error);
    setError("");
  }, [error]);

  return {
    error,
    loading,
    admins,
    users,
    page,
    totalPages,
    handleChangeUserRole,
    handleDeleteAdmin,
    handleSearch,
    handlePageRequest,
  };
}
