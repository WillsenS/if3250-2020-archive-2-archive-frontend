import axios from "axios";
import { defaultAPIURL } from "../config";
import formBuilder from "../utils/FormBuilder";
import {convertToClientJson, convertToServerJson} from "../utils/JsonConverter";


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

export const getLatestArchives = () =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${defaultAPIURL}/archive/latest`;
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
};


export const postSubmitArchive =  async (submittedArchive) => {
  try {
    const serverMetaArchive = convertToServerJson(submittedArchive);
    const url = `${defaultAPIURL}/upload`;
    const data = formBuilder(serverMetaArchive);
    const config = {
      headers: {'content-type': 'multipart/form-data'}
    };
    return await axios.post(url, data, config);
  } catch (e) {
    throw('Error Adding Archive');
  }
};
