import axios from "axios";
import { defaultAPIURL } from "../config";

const validateStatus = () => true;
axios.defaults.withCredentials = true;
const withCredentials = true;

export const getAuthCheck = token =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

      const url = `${defaultAPIURL}/auth/check`;
      const { data: response } = await axios({
        url,
        method: "get",
        validateStatus,
        withCredentials
      });
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
