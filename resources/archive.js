import axios from "axios";
import { defaultAPIURL } from "../config";
import formBuilder from "../utils/FormBuilder";
import {convertToServerJson} from "../utils/JsonConverter";


const validateStatus = () => true;
axios.defaults.withCredentials = true;
const withCredentials = true;

export const getArchiveList = (searchQuery, currentPage, filter, sourceToken) =>
    //sourceToken: add token source to cancel request if user left the page before the request is finished
  new Promise(async (resolve, reject) => {
    try {
      const url = `${defaultAPIURL}/search?q=${searchQuery}`;
      const filters = filter ? filter.join(","): null;
      const cancelToken = sourceToken ? sourceToken.token: null;
      const { data: response } = await axios({
        url,
        cancelToken,
        method: "GET",
        params: {
          page: currentPage,
          filters
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


export const postSubmitArchive =  async (submittedArchive, source) => {
  try {
    const serverMetaArchive = convertToServerJson(submittedArchive);
    const url = `${defaultAPIURL}/upload`;
    const data = formBuilder(serverMetaArchive);
    const config = {
      cancelToken: source.token,
      headers: {'content-type': 'multipart/form-data'},
    };
    return await axios.post(url, data, config);
  } catch (e) {
    throw('Error adding Archive');
  }
};

export const patchEditArchive = async (editedArchive, source) => {
  try {
    const serverMetaArchive = convertToServerJson(editedArchive);
    const url = `${defaultAPIURL}/edit/${serverMetaArchive._id}`;
    const data = formBuilder(serverMetaArchive);
    const config = {
      headers: {'content-type': 'multipart/form-data'},
      cancelToken: source.token
    };
    return await axios.patch(url, data, config);
  } catch (e) {
    throw('Error editing archive');
  }
};

export const deleteArchive = async (id, source) => {
  try {
    const url = `${defaultAPIURL}/delete/${id}`;
    return await axios.delete(url, {cancelToken: source.token});
  } catch (e) {
    throw('Error deleting archive');
  }
};


