import React from "react";

import AdminLayout from "../../../src/components/Admin/Layout";
import ArchiveTable from "../../../src/components/Admin/ArchiveTable";
import Classification from "../../../src/scheme/Classification";
import Access from "../../../src/scheme/Access";

const mockArchiveResponse = {
    currentPage: 1,
    totalPage: 10,
    payload: [
        {
            //Mandatory metadata
            id: 1,
            name: "Arsip 1",
            type: "Audio",
            code: "X1",
            classificationPattern: {kode: '', nama: ''},
            location: "-",
            description: "-",
            date: new Date().toLocaleDateString(),
            archiveLocation: "-",
            mime: "-",
            // Video and Audio only metadata
            narrator: "-",
            reporter: "-",
        }
    ],
    status: 200
};

export default function AdminUsers() {
    const section = 3;

    const handlePageRequests = (val) => {
    };

    const handleAddNewArchiveRequest = (newArchiveData) => {
        // const newArchiveId = Math.floor(Math.random() * Math.floor(1000)) + 10; //Assign random ID
        // const newArchive = {...newArchiveData, id: newArchiveId, submittedOnWebsiteDate: new Date()};
        mockArchiveResponse.payload.push(newArchiveData);
    };

    const handleEditArchiveRequest = (editedArchive) => {
        const filteredArchives = mockArchiveResponse.payload.filter(archive => (
            archive.id !== editedArchive.id
        ));
        filteredArchives.push(editedArchive);
        mockArchiveResponse.payload = [...filteredArchives];
    };

    const handleDeleteArchiveRequest = (selectedArchive) => {
        mockArchiveResponse.payload = mockArchiveResponse.payload.filter(archive => (
            archive.id !== selectedArchive.id
        ));
    };

    return (
        <AdminLayout section={section} title="Pengaturan Data Arsip">
            <ArchiveTable
                archiveList={mockArchiveResponse}
                classification={Classification.klasifikasi}
                accessList={Access}
                handlePageRequests={handlePageRequests}
                handleAddRequests={handleAddNewArchiveRequest}
                handleEditRequests={handleEditArchiveRequest}
                handleDeleteRequests={handleDeleteArchiveRequest}/>
        </AdminLayout>
    );
}
