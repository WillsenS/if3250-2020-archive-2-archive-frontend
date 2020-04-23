import axios from "axios";
import { defaultAPIURL } from "../config";
import formBuilder from "../utils/FormBuilder";
import { convertToServerJson } from "../utils/JsonConverter";

const validateStatus = () => true;
axios.defaults.withCredentials = true;
const withCredentials = true;

/**
 * Most Search Keywoard search from user
 */
export const getMostSearchKeyword = () =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${defaultAPIURL}/archive/search/most`;
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

/**
 * Most Search Keywoard search from user
 */
export const getMostSearchKeywordOnFile = () =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${defaultAPIURL}/keyword/most`;
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

export const changeMostSearchKeywordOnFile = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${defaultAPIURL}/keyword/most`;
      const response = await axios({
        url,
        method: "PATCH",
        data,
        validateStatus,
      });

      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

/**
 * Get Array of archive based on query, pagem and filter
 * @param {string} searchQuery Searchh queay
 * @param {string} currentPage Page number
 * @param {string} fiter The search filter (using google standard)
 * @param {string} sourceToken add token source to cancel request if user left the page before the request is finished
 */
export const getArchiveList = (searchQuery, currentPage, filter, sourceToken) =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${defaultAPIURL}/archive/search?q=${searchQuery}`;
      const filters = filter ? filter.join(",") : null;
      const cancelToken = sourceToken ? sourceToken.token : null;
      const { data: response } = await axios({
        url,
        cancelToken,
        method: "GET",
        params: {
          page: currentPage,
          filters,
        },
        validateStatus,
      });

      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

/**
 * Get Array of borrow archive request
 */
export const getArchiveBorrowRequestList = () =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${defaultAPIURL}/archive/borrow`;
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

/**
 * Get the title of archive based its id
 * @param {string} archiveId id of archive
 * @param {string} token Authentication token
 */
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

/**
 * Get the detail information of archive based its id
 * @param {string} archiveId id of archive
 * @param {string} token Authentication token
 */
export const getArchiveDetail = (archiveId, token) =>
  new Promise(async (resolve, reject) => {
    try {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      const url = `${defaultAPIURL}/archive/detail/${archiveId}`;
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

/**
 * Get Array (5 element) of latest and public archive
 */
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

/**
 * Get the file that want to download from archive based its id
 * @param {string} archiveId id of archive
 * @param {string} token Authentication token
 * @param {string} filename Filename of archive
 */
export const downloadArchive = (archiveId, token, filename) =>
  new Promise(async (resolve, reject) => {
    try {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      const url = `${defaultAPIURL}/archive/download/${archiveId}`;

      const response = await axios({
        url,
        method: "GET",
        validateStatus,
        responseType: "blob",
      }).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
      });

      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

export const patchArchiveBorrowRequest = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      // axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      const url = `${defaultAPIURL}/archive/borrow/${payload._id}`;
      const { data: response } = await axios({
        url,
        method: "PATCH",
        data: payload,
        validateStatus,
      });

      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

/**
 * Post new borrow archive request
 * @param {object} payload Information needed for apply request
 * @param {string} token Aythentication token
 */
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

export const postSubmitArchive = async (submittedArchive, source) => {
  try {
    const serverMetaArchive = convertToServerJson(submittedArchive);
    const url = `${defaultAPIURL}/archive/upload`;
    const data = formBuilder(serverMetaArchive);
    const config = {
      cancelToken: source.token,
      headers: { "content-type": "multipart/form-data" },
    };
    return await axios.post(url, data, config);
  } catch (e) {
    throw "Error adding Archive";
  }
};

export const patchEditArchive = async (editedArchive, source) => {
  try {
    const serverMetaArchive = convertToServerJson(editedArchive);
    const url = `${defaultAPIURL}/archive/edit/${serverMetaArchive._id}`;
    const data = formBuilder(serverMetaArchive);
    const config = {
      headers: { "content-type": "multipart/form-data" },
      cancelToken: source.token,
    };
    return await axios.patch(url, data, config);
  } catch (e) {
    throw "Error editing archive";
  }
};

export const deleteArchive = async (archive, source) => {
  try {
    const url = `${defaultAPIURL}/archive/delete/${archive._id}`;
    return await axios.delete(url, { cancelToken: source.token });
  } catch (e) {
    throw "Error deleting archive";
  }
};

export const getStatistic = async () => {
  try {
    const url = `${defaultAPIURL}/statistic`;
    return await axios.get(url);
  } catch (e) {
    throw "Error getting website statistic";
  }
};
