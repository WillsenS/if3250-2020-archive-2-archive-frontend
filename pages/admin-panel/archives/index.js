import React, {useEffect, useRef, useState} from "react";
import AdminLayout from "../../../src/components/Admin/Layout";
import ArchiveTable from "../../../src/components/Admin/ArchiveTable";
import Classification from "../../../src/scheme/Classification";
import {postSubmitArchive} from "../../../resources/archive";

const mockArchiveResponse = {
    currentPage: 1,
    totalPage: 0,
    payload: [],
    status: 200
};

export default function Archives() {

    const [submittedArchive, setSubmittedArchive] = useState({});
    const firstRender = useRef(true);
    const section = 3; // section archive

    useEffect( () => {
        const errorText = 'Terjadi kesalahan. Silahkan coba beberapa saat lagi';
        const successText = 'Arsip berhasil ditambahkan dan disimpan';
        const submitArchive = async (archive) => {
            try {
                const res = await postSubmitArchive(archive);
                if (res.status === 200) {
                    // eslint-disable-next-line no-undef
                    alert(successText);
                } else {
                    // eslint-disable-next-line no-undef
                    alert(errorText);
                }
            }
            catch (e) {
                // eslint-disable-next-line no-undef
                alert(errorText);
            }
        };
        if (firstRender.current) {
            // Don't run useEffect on first component load
            firstRender.current = false;
        } else {
            submitArchive(submittedArchive);
        }
    }, [submittedArchive]);


    const handlePageRequests = (val) => {
    };


    const handleAddNewArchiveRequest = (newArchiveData) => {
        mockArchiveResponse.payload.push(newArchiveData);
        setSubmittedArchive({...newArchiveData});
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
                handlePageRequests={handlePageRequests}
                handleAddRequests={handleAddNewArchiveRequest}
                handleEditRequests={handleEditArchiveRequest}
                handleDeleteRequests={handleDeleteArchiveRequest}/>
        </AdminLayout>
    );
}

