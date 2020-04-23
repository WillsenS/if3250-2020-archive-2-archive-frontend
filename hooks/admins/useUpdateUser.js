import { useState, useEffect } from "react";
import {
  getNonAdmins,
  getAdmins,
  patchEditUserRole,
  patchResetRoleToDefault,
} from "../../resources/user";
import axios from "axios";

export default function useUpdateUser(authToken) {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("*");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    userId: "",
    roleId: 0,
  });
  const IDLE = 0;
  const CHANGE_ADMIN = 1;
  const DELETE_ADMIN = 2;
  const [action, setAction] = useState(IDLE);

  const handleUpdateTables = async (role_id, pages) => {
    try {
      setError(false);
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
        setError(true);
      }
    } catch (err) {
      setError(true);
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
            break;
          case DELETE_ADMIN:
            res = await patchResetRoleToDefault(
              updateUser.userId,
              sourceToken,
              authToken
            );
            break;
          default:
            break;
        }
        if (res.status === 200) {
          if (mounted) {
            await handleUpdateTables();
          }
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      sourceToken.cancel("Request cancelled because user left the page");
    };
  }, [updateUser]);

  // Pagination and search handler
  useEffect(() => {
    // TODO: Will be updated to handle user search too
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
      setError(true);
    } finally {
      setLoading(false);
    }
    return () => {
      mounted = false;
      sourceToken.cancel("Request cancelled because user left the page");
    };
  }, [query, page]);

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
