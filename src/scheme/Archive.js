const baseArchiveObjectTemplate = {
    // The attribute are the id's of the input elements.
    //Mandatory metadata
    filename: "", //str
    type: "", //str
    code: "", //str
    classificationPattern: null, //str
    forPublicOption: 0, //bool 0||1
    location: "", //str
    description: "", //str
    date: new Date().toLocaleDateString(), //str
    archiveLocation: "", //str
    file: null, //obj
    fileUrl: '', //str
    mime: "", //str
};

export const audioArchiveObject = {
    ...baseArchiveObjectTemplate,
    type: 'Audio',
    narrator: "",
    reporter: "",
};

export const videoArchiveObject = {
    ...baseArchiveObjectTemplate,
    type: "Video",
    narrator: "",
    reporter: "",
};


export const photoArchiveObject = {
   ...baseArchiveObjectTemplate,
    type: 'Foto',
    activityDescription: "",
    photographer: "",
    photoType: "",
    photoSize: "",
    photoCondition: ""
};

export const textArchiveObject = {
  ...baseArchiveObjectTemplate,
    type: 'Tekstual',
    textualArchiveNumber: "",
    author: "",
};