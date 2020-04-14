//Convert JSON sebelum dikirim supaya formatnya sesuai dengan backend
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
//Convert JSON sebelum dipakai di client supaya formatnya sesuai dengan front-end
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

const convertToServerAudioArchive = (archive) => {
  const defaultMeta = getDefaultServerArchiveMeta(archive);
  const typeSpecificMeta = {
    narrator: archive.narrator,
    reporter: archive.reporter,
  };
  return { ...defaultMeta, ...typeSpecificMeta };
};

const convertToServerVideoArchive = (archive) => {
  const defaultMeta = getDefaultServerArchiveMeta(archive);
  const typeSpecificMeta = {
    narrator: archive.narrator,
    reporter: archive.reporter,
  };
  return { ...defaultMeta, ...typeSpecificMeta };
};

const convertToServerPhotoArchive = (archive) => {
  const defaultMeta = getDefaultServerArchiveMeta(archive);
  const typeSpecificMeta = {
    activity_description: archive.activityDescription,
    photo_type: archive.photoType,
    photo_size: archive.photoSize,
    photo_condition: archive.photoCondition,
  };
  return { ...defaultMeta, ...typeSpecificMeta };
};

const convertToServerTextArchive = (archive) => {
  const defaultMeta = getDefaultServerArchiveMeta(archive);
  const typeSpecificMeta = {
    textual_archive_number: archive.textualArchiveNumber,
    author: archive.author,
  };
  return { ...defaultMeta, ...typeSpecificMeta };
};

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

const convertToClientAudioArchive = (archive) => {
  const defaultMeta = getDefaultClientArchiveMeta(archive);
  const type = archive.tipe.toLowerCase();
  const typeSpecificMeta = {
    narrator: archive[type].narrator,
    reporter: archive[type].reporter,
  };
  return { ...defaultMeta, ...typeSpecificMeta };
};

const convertToClientVideoArchive = (archive) => {
  const defaultMeta = getDefaultClientArchiveMeta(archive);
  const type = archive.tipe.toLowerCase();
  const typeSpecificMeta = {
    narrator: archive[type].narrator,
    reporter: archive[type].reporter,
  };
  return { ...defaultMeta, ...typeSpecificMeta };
};

const convertToClientPhotoArchive = (archive) => {
  const defaultMeta = getDefaultClientArchiveMeta(archive);
  const type = archive.tipe.toLowerCase();
  const typeSpecificMeta = {
    activityDescription: archive[type].activity_description,
    photoType: archive[type].photo_type,
    photoSize: archive[type].photo_size,
    photoCondition: archive[type].photo_condition,
  };
  return { ...defaultMeta, ...typeSpecificMeta };
};

const convertToClientTextArchive = (archive) => {
  const defaultMeta = getDefaultClientArchiveMeta(archive);
  const type = archive.tipe.toLowerCase();
  const typeSpecificMeta = {
    textualArchiveNumber: archive[type].textual_archive_number,
    author: archive[type].author,
  };
  return { ...defaultMeta, ...typeSpecificMeta };
};