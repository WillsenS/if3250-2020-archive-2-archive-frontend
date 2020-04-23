/**
 * Function to take only the last child of the archive classification json array object
 * @param {array} jsonArray Archive classification array of objects
 * @returns {array} Array with only specific items of the archive classification (without it's category)
 */
export const ParseClassificationJsonArray = (jsonArray) => {
  //Parser untuk data -skema klasifikasi arsip- dan mengambil item terdalamnya saja
  let filteredArray = [];
  let i;
  for (i = 0; i < jsonArray.length - 1; i++) {
    if (jsonArray[i].kode.length >= jsonArray[i + 1].kode.length) {
      filteredArray.push(jsonArray[i]);
    }
  }
  filteredArray.push(jsonArray[i]);
  return filteredArray;
};

/**
 * Flatten jsonArray to same level
 * Combine kode and nama from archive classification object into one string
 * @param {array} jsonArray Archive classification array of objects
 * @returns {array} String array of archive classification scheme
 */
export const FlattenClassificationJsonArray = (jsonArray) => {
  let flattenJsonArray = [];
  jsonArray.forEach((obj) => {
    flattenJsonArray.push(`${obj.kode} ${obj.nama}`);
  });
  return flattenJsonArray;
};
