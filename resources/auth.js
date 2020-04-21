const axios = require("axios");
const { defaultAPIURL } = require("../config");

const validateStatus = () => true;
axios.defaults.withCredentials = true;
const withCredentials = true;

exports.getAuthCheck = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

      const url = `${defaultAPIURL}/auth/check`;
      const { data: response } = await axios({
        url,
        method: "get",
        validateStatus,
        withCredentials,
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

exports.getAuthArchive = (idArchive, token) =>
  new Promise(async (resolve, reject) => {
    try {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

      const url = `${defaultAPIURL}/archive/detail/${idArchive}`;
      const { data: response } = await axios({
        url,
        method: "get",
        validateStatus,
        withCredentials,
      });

      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
