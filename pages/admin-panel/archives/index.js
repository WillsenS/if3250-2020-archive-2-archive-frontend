import React, {useEffect, useState} from "react";
import AdminLayout from "../../../src/components/Admin/Layout";
import ArchiveTable from "../../../src/components/Admin/ArchiveTable";
import Classification from "../../../src/scheme/Classification";
import {postSubmitArchive, patchEditArchive, deleteArchive, getArchiveList} from "../../../resources/archive";
import {convertToClientJson} from "../../../utils/JsonConverter";
import axios from 'axios';

const mockArchiveResponse = {
    currentPage: 1,
    totalPage: 0,
    payload: [],
    status: 200
};

export default function Archives() {
    const [submittedArchive, setSubmittedArchive] = useState({});
    const [editedArchive, setEditedArchive] = useState({});
    const [deletedArchiveId, setDeletedArchiveId] = useState('');
    const [searchQuery, setSearchQuery] = useState('13517021'); // TODO: Jadiin empty string, sekarang apinya belum bisa query kosong
    const [page, setPage] = useState(1);
    const [archiveList, setArchiveList] = useState([]);
    const section = 3; // section: archive

    // Add archive handler
    useEffect( () => {
        const errorText = 'Terjadi kesalahan. Silahkan coba beberapa saat lagi';
        const successText = 'Arsip berhasil ditambahkan dan disimpan';
        let source = axios.CancelToken.source(); //cancel request if user leave the page
        const submitArchive = async (archive) => {
            try {
                const res = await postSubmitArchive(archive, source);
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
        if (!isEmptyObj(submittedArchive)) {
            // Don't run useEffect on first component load
            submitArchive(submittedArchive, source).catch(e => {});
        }
        return  () => {
            source.cancel('Canceled because user left the page');
        };
    }, [submittedArchive]);
    // Edit archive handler
    useEffect( () => {
        const errorText = 'Terjadi kesalahan. Silahkan coba beberapa saat lagi';
        const successText = 'Arsip berhasil dirubah';
        let source = axios.CancelToken.source(); //cancel request if user leave the page
        const editArchive = async (archive, source) => {
            try {
                const res = await patchEditArchive(archive, source);
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
        if (!isEmptyObj(editedArchive)) {
            // Don't run useEffect on first component load
            editArchive(editedArchive).catch(e => {});
        }
        return  () => {
            source.cancel('Canceled because user left the page');
        };
    }, [editedArchive]);
    // Delete archive handler
    useEffect( () => {
        const errorText = 'Terjadi kesalahan. Silahkan coba beberapa saat lagi';
        const successText = 'Arsip berhasil dihapus';
        let mounted = true; //handle mem. leak if user leave the page before task is finished
        let source = axios.CancelToken.source(); //cancel request if user leave the page
        const handleDeleteArchive = async (id, source) => {
            try {
                const res = await deleteArchive(id, source);
                if (res.status === 200) {
                    // eslint-disable-next-line no-undef
                    alert(successText);
                    const getRes = await getArchiveList(searchQuery, page, '', source);
                    if (getRes.message === 'OK') {
                        const updatedArchiveList = getRes.data.map(archive => convertToClientJson(archive));
                        console.log(updatedArchiveList);
                        if (mounted) {
                            setArchiveList([...updatedArchiveList]);
                        }
                    }
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
        if (deletedArchiveId) {
            // Don't run useEffect on first component load
            handleDeleteArchive(deletedArchiveId, source).catch(e => {});
        }
        return  () => {
            mounted = false;
            source.cancel('Canceled because user left the page');
        };
    }, [deletedArchiveId]);
    // Search handler
    useEffect(() => {
        let mounted = true; //handle mem. leak if user leave the page before task is finished
        let source = axios.CancelToken.source(); //cancel request if user leave the page
        const handleGetArchiveList = async (searchQuery, page, filter, source) => {
            if (searchQuery.length <= 0) return;
            const res = await getArchiveList(searchQuery, page, filter, source);
            if (res.message === 'OK') {
                const updatedArchiveList = res.data.map(archive => convertToClientJson(archive));
                console.log(updatedArchiveList);
                if (mounted) {
                    setArchiveList([...updatedArchiveList]);
                }
            }
        };
        handleGetArchiveList(searchQuery, page, '', source).catch(e => {});
        return  () => {
            mounted = false;
            source.cancel('Canceled because user left the page');
        };
    }, [searchQuery, page]);


    const isEmptyObj = obj => {
        return Object.keys(obj).length === 0;
    };
    const handlePageRequests = (val) => {
    };


    const handleAddNewArchiveRequest = (newArchiveData) => {
        mockArchiveResponse.payload.push(newArchiveData);
        setSubmittedArchive({...newArchiveData});
    };

    const handleEditArchiveRequest = (editedArchive) => {
        const filteredArchives = mockArchiveResponse.payload.filter(archive => (
            archive._id !== editedArchive._id
        ));
        filteredArchives.push(editedArchive);
        mockArchiveResponse.payload = [...filteredArchives];
        setEditedArchive({...editedArchive});
    };

    const handleDeleteArchiveRequest = (selectedArchive) => {
        mockArchiveResponse.payload = mockArchiveResponse.payload.filter(archive => (
            archive._id !== selectedArchive._id
        ));
        setDeletedArchiveId(selectedArchive._id);
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

