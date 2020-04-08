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

export const FlattenClassificationJsonArray = (jsonArray) => {
    let flattenJsonArray = [];
    jsonArray.forEach((obj) => {
       flattenJsonArray.push(`${obj.kode} ${obj.nama}`);
    });
    return flattenJsonArray;
};