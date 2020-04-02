import axios from "axios";
import { defaultAPIURL } from "../config";
import Cookies from "js-cookie";

const validateStatus = () => true;
axios.defaults.withCredentials = true;
const withCredentials = true;

export const getAuthCheck = token =>
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
