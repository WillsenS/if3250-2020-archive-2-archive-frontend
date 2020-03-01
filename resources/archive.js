import axios from "axios";
import { defaultAPIURL } from "../config";

const validateStatus = () => true;

export const getArchiveList = (searchQuery, currentPage) =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${defaultAPIURL}/search?q=${searchQuery}`;
      const { data: response } = await axios({
        url,
        method: "GET",
        params: {
          page: currentPage
        },
        validateStatus
      });

      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
