import React, {useEffect, useState} from "react";
import AdminLayout from "../../../src/components/Admin/Layout";
import ArchiveTable from "../../../src/components/Admin/ArchiveTable";
import Classification from "../../../src/scheme/Classification";
import {defaultPublicURL} from "../../../config";
import axios from "axios";
import {convertToClientJson, convertToServerJson} from "../../../src/utils/JsonConverter";

const mockArchiveResponse = {
    currentPage: 1,
    totalPage: 0,
    payload: [],
    status: 200
};

export default function Archives() {
    const [loading, setLoading] = useState(false);
    const [archiveList, setArchiveList] = useState([]);
    const [submittedArchive, setSubmittedArchive] = useState({});
    const section = 3;

    const handlePageRequests = (val) => {
    };

    useEffect( () => {
        async function submitArchive(submittedArchive) {
            const url = `${defaultPublicURL}/api/v1/upload`;
            // eslint-disable-next-line no-undef
            const data = new FormData();
            const config = {
                headers: {'content-type': 'multipart/form-data'}
            };
            const fileMetaName = 'filetoupload';
            for (const meta in submittedArchive) {
                if (Object.prototype.hasOwnProperty.call(submittedArchive, meta)) {
                    if (meta === fileMetaName) {
                        data.append(fileMetaName, submittedArchive[meta]);
                    } else {
                        data.set(meta, submittedArchive[meta]);
                    }
                }
            }
            try {
                const res = await axios.post(url, data, config);

            } catch (e) {
                console.log(e);
            }
        }
        // eslint-disable-next-line no-unused-vars
        const promise = submitArchive(convertToServerJson(submittedArchive));
    }, [submittedArchive]);

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

