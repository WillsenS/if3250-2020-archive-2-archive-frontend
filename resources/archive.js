import axios from "axios";
import { defaultAPIURL } from "../config";

const validateStatus = () => true;
axios.defaults.withCredentials = true;
const withCredentials = true;

export const getArchiveList = (searchQuery, currentPage, filter) =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${defaultAPIURL}/search?q=${searchQuery}`;
      const { data: response } = await axios({
        url,
        method: "GET",
        params: {
          page: currentPage,
          filters: filter.join(","),
        },
        validateStatus,
      });

      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

export const getArchiveTitle = (archiveId, token) =>
  new Promise(async (resolve, reject) => {
    try {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      const url = `${defaultAPIURL}/archive/title/${archiveId}`;
      const { data: response } = await axios({
        url,
        method: "GET",
        validateStatus,
      });

      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

export const getArchiveDetail = (archiveId, token) =>
  new Promise(async (resolve, reject) => {
    try {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      const url = `${defaultAPIURL}/detail/${archiveId}`;
      const { data: response } = await axios({
        url,
        method: "GET",
        validateStatus,
      });

      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

export const postBorrowArchive = (token, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      const url = `${defaultAPIURL}/archive/borrow`;
      const { data: response } = await axios({
        url,
        method: "POST",
        data: payload,
        validateStatus,
      });

      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
