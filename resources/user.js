// @ts-nocheck
import axios from "axios";
import { defaultAPIURL } from "../config";

axios.defaults.withCredentials = true;

/**
 * Get admin list
 * @param {number} [role_id] Admin role id, optional
 * @param {number} [page] Page number, optional
 * @param {object} source Axios request token
 * @param {string} token Authentication token
 */
export const getAdmins = async (role_id, page, source, token) => {
  try {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    const url = `${defaultAPIURL}/admins`;
    const cancelToken = source ? source.token : null;
    return await axios({
      url,
      cancelToken,
      method: "GET",
      params: {
        role: role_id,
        page,
      },
    });
  } catch (e) {
    throw "Error retrieving admins";
  }
};

/**
 * Get non-admin list
 * @param {number} [page] Page number, optional
 * @param {object} source Axios request token
 * @param {string} token Authentication token
 */
export const getNonAdmins = async (page, source, token) => {
  try {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    const url = `${defaultAPIURL}/non-admins`;
    const cancelToken = source ? source.token : null;
    return await axios({
      url,
      cancelToken,
      method: "GET",
      params: {
        page,
      },
    });
  } catch (e) {
    throw "Error retrieving non-admins";
  }
};

/**
 * Edit user role
 * @param {number} user_id User id
 * @param {number} role_id New role id
 * @param {object} source Axios request token
 * @param {string} token Authentication token
 */
export const patchEditUserRole = async (user_id, role_id, source, token) => {
  try {
    console.log("auth: ", token);
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    const url = `${defaultAPIURL}/users/${user_id}`;
    let data = new FormData();
    data.set("kode_role", role_id);
    const config = {
      cancelToken: source ? source.token : null,
      headers: { "content-type": "multipart/form-data" },
    };
    return await axios({
      method: "PATCH",
      url,
      data,
      config,
    });
  } catch (e) {
    throw "Gagal mengubah role user";
  }
};

/**
 * Remove admin access from user, reset to default access
 * @param {number} user_id User id
 * @param {object} source Axios request token
 * @param {string} token Authentication token
 */
export const patchResetRoleToDefault = async (user_id, source, token) => {
  try {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    const url = `${defaultAPIURL}/remove-admin/${user_id}`;
    const config = {
      cancelToken: source ? source.token : null,
    };
    return await axios({
      method: "PATCH",
      url,
      config,
    });
  } catch (e) {
    throw "Gagal mengubah akses admin";
  }
};
