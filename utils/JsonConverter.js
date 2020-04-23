/**
 * Convert client version of archive data properties to server version of property name, without changing the data
 * @param {object} archive Archive data to be sent to the server
 * @returns {object} Archive object with converted properties (server version)
 */
export const convertToServerJson = (archive) => {
  switch (archive.type) {
    case "Audio":
      return convertToServerAudioArchive(archive);
    case "Video":
      return convertToServerVideoArchive(archive);
    case "Photo":
      return convertToServerPhotoArchive(archive);
    case "Text":
      return convertToServerTextArchive(archive);
    default:
      // console.log('Invalid Archive Type');
      break;
  }
};

/**
 * Convert server version of archive data properties to client version of property name,
 * without changing the data so it can be used in the front-end
 * @param {object} archive Archive data to be used in the client components
 * @returns {object} Archive object with converted properties (client version)
 */
export const convertToClientJson = (archive) => {
  switch (archive.tipe) {
    case "Audio":
      return convertToClientAudioArchive(archive);
    case "Video":
      return convertToClientVideoArchive(archive);
    case "Photo":
      return convertToClientPhotoArchive(archive);
    case "Text":
      return convertToClientTextArchive(archive);
    default:
      // console.log('Invalid Archive Type');
      break;
  }
};

/**
 * (Helper function) Returns object with mandatory metadata, server version
 * @param {object} archive Archive data to be sent to the server
 * @returns {object} Archive object with converted properties (server version)
 */
const getDefaultServerArchiveMeta = (archive) => {
  return {
    _id: archive._id,
    judul: archive.filename,
    tipe: archive.type,
    nomor: archive.code,
    pola: archive.classificationPattern,
    keamanan_terbuka: archive.forPublicOption,
    lokasi_kegiatan: archive.location,
    keterangan: archive.description,
    waktu_kegiatan: archive.date,
    lokasi_simpan_arsip: archive.archiveLocation,
    mime: archive.mime,
    filetoupload: archive.file,
  };
};
/**
 * (Helper function) Returns object with ONLY server audio metadata
 * @param {object} archive Archive data to be sent to the server
 * @returns {object} Archive object with converted properties (server version)
 */
const convertToServerAudioArchive = (archive) => {
  const defaultMeta = getDefaultServerArchiveMeta(archive);
  const typeSpecificMeta = {
    narrator: archive.narrator,
    reporter: archive.reporter,
  };
  return { ...defaultMeta, ...typeSpecificMeta };
};

/**
 * (Helper function) Returns object with ONLY server video metadata
 * @param {object} archive Archive data to be sent to the server
 * @returns {object} Archive object with converted properties (server version)
 */
const convertToServerVideoArchive = (archive) => {
  const defaultMeta = getDefaultServerArchiveMeta(archive);
  const typeSpecificMeta = {
    narrator: archive.narrator,
    reporter: archive.reporter,
  };
  return { ...defaultMeta, ...typeSpecificMeta };
};

/**
 * (Helper function) Returns object with ONLY server photo metadata
 * @param {object} archive Archive data to be sent to the server
 * @returns {object} Archive object with converted properties (server version)
 */
const convertToServerPhotoArchive = (archive) => {
  const defaultMeta = getDefaultServerArchiveMeta(archive);
  const typeSpecificMeta = {
    activity_description: archive.activityDescription,
    photo_type: archive.photoType,
    photographer: archive.photographer,
    photo_size: archive.photoSize,
    photo_condition: archive.photoCondition,
  };
  return { ...defaultMeta, ...typeSpecificMeta };
};

/**
 * (Helper function) Returns object with ONLY server text metadata
 * @param {object} archive Archive data to be sent to the server
 * @returns {object} Archive object with converted properties (server version)
 */
const convertToServerTextArchive = (archive) => {
  const defaultMeta = getDefaultServerArchiveMeta(archive);
  const typeSpecificMeta = {
    textual_archive_number: archive.textualArchiveNumber,
    author: archive.author,
  };
  return { ...defaultMeta, ...typeSpecificMeta };
};

/**
 * (Helper function) Returns object with mandatory metadata, client version
 * @param {object} archive Archive data to be used inside the client components
 * @returns {object} Archive object with converted properties (client version)
 */
const getDefaultClientArchiveMeta = (archive) => {
  return {
    _id: archive._id,
    filename: archive.judul,
    type: archive.tipe,
    code: archive.nomor,
    classificationPattern: archive.pola,
    forPublicOption: archive.keamanan_terbuka,
    location: archive.lokasi_kegiatan,
    description: archive.keterangan,
    date: archive.waktu_kegiatan,
    archiveLocation: archive.lokasi_simpan_arsip,
    mime: archive.mime,
    file: archive.file,
  };
};
/**
 * (Helper function) Returns object with ONLY client audio metadata
 * @param {object} archive Archive data to be used inside client components
 * @returns {object} Archive object with converted properties (client version)
 */
const convertToClientAudioArchive = (archive) => {
  const defaultMeta = getDefaultClientArchiveMeta(archive);
  const type = archive.tipe.toLowerCase();
  const typeSpecificMeta = {
    narrator: archive[type].narrator,
    reporter: archive[type].reporter,
  };
  return { ...defaultMeta, ...typeSpecificMeta };
};

/**
 * (Helper function) Returns object with ONLY client video metadata
 * @param {object} archive Archive data to be used inside client components
 * @returns {object} Archive object with converted properties (client version)
 */
const convertToClientVideoArchive = (archive) => {
  const defaultMeta = getDefaultClientArchiveMeta(archive);
  const type = archive.tipe.toLowerCase();
  const typeSpecificMeta = {
    narrator: archive[type].narrator,
    reporter: archive[type].reporter,
  };
  return { ...defaultMeta, ...typeSpecificMeta };
};

/**
 * (Helper function) Returns object with ONLY client photo metadata
 * @param {object} archive Archive data to be used inside client components
 * @returns {object} Archive object with converted properties (client version)
 */
const convertToClientPhotoArchive = (archive) => {
  const defaultMeta = getDefaultClientArchiveMeta(archive);
  const type = archive.tipe.toLowerCase();
  const typeSpecificMeta = {
    activityDescription: archive[type].activity_description,
    photoType: archive[type].photo_type,
    photographer: archive[type].photographer,
    photoSize: archive[type].photo_size,
    photoCondition: archive[type].photo_condition,
  };
  return { ...defaultMeta, ...typeSpecificMeta };
};

/**
 * (Helper function) Returns object with ONLY client text metadata
 * @param {object} archive Archive data to be used inside client components
 * @returns {object} Archive object with converted properties (client version)
 */
const convertToClientTextArchive = (archive) => {
  const defaultMeta = getDefaultClientArchiveMeta(archive);
  const type = archive.tipe.toLowerCase();
  const typeSpecificMeta = {
    textualArchiveNumber: archive[type].textual_archive_number,
    author: archive[type].author,
  };
  return { ...defaultMeta, ...typeSpecificMeta };
};
