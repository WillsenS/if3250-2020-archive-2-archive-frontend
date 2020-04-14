const axios = require("axios");
const { defaultAPIURL } = require("../config");

const validateStatus = () => true;
axios.defaults.withCredentials = true;
const withCredentials = true;

exports.getAuthCheck = (token) =>
  // eslint-disable-next-line no-async-promise-executor
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
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

      const url = `${defaultAPIURL}/detail/${idArchive}`;
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
