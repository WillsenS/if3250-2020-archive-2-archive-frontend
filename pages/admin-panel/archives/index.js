import React from "react";
import AdminLayout from "../../../src/components/Admin/Layout";
import ArchiveTable from "../../../src/components/Admin/ArchiveTable";
import Classification from "../../../src/scheme/Classification";
import Access from "../../../src/scheme/Access";
import {getArchive} from "../../../resources/archive";

const mockArchiveResponse = {
    currentPage: 1,
    totalPage: 0,
    payload: [],
    status: 200
};

export default function Archives(props) {

    // console.log(props.data);

    const section = 3;

    const handlePageRequests = (val) => {
    };

    const handleAddNewArchiveRequest = (newArchiveData) => {
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

