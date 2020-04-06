const baseArchiveObjectTemplate = {
    // The attribute are the id's of the input elements.
    //Mandatory metadata
    filename: "",
    type: "",
    code: "",
    classificationPattern: {},
    accessRightsList: [],
    location: "",
    description: "",
    date: new Date().toLocaleDateString(),
    archiveLocation: "",
    file: null,
    fileUrl: '',
    mime: "",
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