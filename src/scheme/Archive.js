export const archiveTypeList = [
    {
        id: 1,
        name: "Audio"
    },
    {
        id: 2,
        name: "Video"
    },
    {
        id: 3,
        name: "Foto"
    },
    {
        id: 4,
        name: "Tekstual"
    }
];

export const baseArchiveObjectTemplate = {
    // The attribute are the id's of the input elements.
    //Mandatory metadata
    name: "",
    type: "Audio",
    code: "",
    classificationScheme: "",
    location: "",
    description: "",
    date: new Date().toLocaleDateString(),
    archiveLocation: "",
    mime: "",
    // Video and Audio only metadata
    narrator: "",
    reporter: "",
    //Photo only metadata
    activityDescription: "",
    photographer: "",
    photoType: "",
    photoSize: "",
    photoCondition: "",
    //text only metadata
    textualArchiveNumber: "",
    author: "",
};
