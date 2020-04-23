/**
 * Build form to send data as form using axios
 * Not for general purpose data (Needs refactoring and not recommended)
 * Currently used to send archive/arsip data to server
 * @param {object} archiveObj Data object to be sent with axios
 */
export default function formBuilder(archiveObj) {
  const formData = new FormData();
  const fileMetaName = "filetoupload";
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
