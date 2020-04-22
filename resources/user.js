import axios from "axios";
import { defaultAPIURL } from "../config";

axios.defaults.withCredentials = true;

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

export const patchEditUserRole = async (user_id, role_id, source, token) => {
  try {
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
