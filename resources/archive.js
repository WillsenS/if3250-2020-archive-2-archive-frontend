import axios from "axios";
import { defaultAPIURL } from "../config";

const validateStatus = () => true;

export const getArchiveList = (searchQuery, currentPage, filter) =>
  new Promise(async (resolve, reject) => {
    try {
      const url = `${defaultAPIURL}/search?q=${searchQuery}`;
      const { data: response } = await axios({
        url,
        method: "GET",
        params: {
          page: currentPage,
          filters: filter.join(",")
        },
        validateStatus
      });

      resolve(response);
    } catch (e) {
      reject(e);
    }
  });


export const getArchive = async (searchQuery, currentPage, filterArray) => {
  const url = `${defaultAPIURL}/search?`;
  const filters = filterArray ? filterArray.join(", ") : "";
  const q = searchQuery;
  const page = currentPage;
  try {
    const response = await axios({
      url,
      method: "GET",
      params: {q, page, filters},
      validateStatus
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};