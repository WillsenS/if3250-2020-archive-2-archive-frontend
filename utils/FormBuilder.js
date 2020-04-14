// (required) Build formdata before sending the data using axios
export default function formBuilder(archiveObj) {
    // eslint-disable-next-line no-undef
    const formData = new FormData();
    const fileMetaName = 'filetoupload';
    // To send form data using axios, need to set (assign if data is a file) to the formdata
    for (const meta in archiveObj) {
        // Check if all property already exists
        if (Object.prototype.hasOwnProperty.call(archiveObj, meta)) {
            if (meta === fileMetaName) {
                formData.append(fileMetaName, archiveObj[meta]);
            } else {
                formData.set(meta, archiveObj[meta]);
            }
        }
    }
    return formData;
}