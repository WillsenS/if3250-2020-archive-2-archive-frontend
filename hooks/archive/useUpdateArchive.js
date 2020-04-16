import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {convertToClientJson} from "../../utils/JsonConverter";
import {postSubmitArchive, patchEditArchive, deleteArchive, getArchiveList} from "../../resources/archive";


export default function useUpdateArchive() {

    const [updatedArchive, setUpdatedArchive] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [archiveList, setArchiveList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [query, setQuery] = useState('*');
    const NONE = 0;
    const SUBMIT = 1;
    const EDIT = 2;
    const DELETE = 3;
    const [action, setAction] = useState(NONE);


    const isEmptyObj = obj => {
        return Object.keys(obj).length === 0;
    };

    useEffect(() => {
        let mounted = true;
        let source = axios.CancelToken.source();

        const updateArchiveList = async () => {
            try {
                setLoading(true);
                const res = await getArchiveList('*', 1, '', source);
                if (res.message === 'OK') {
                    const updatedArchiveList = res.data.map(archive => convertToClientJson(archive));
                    if (mounted) {
                        setArchiveList([...updatedArchiveList]);
                        setPage(res.currentPage);
                        setTotalPages(res.totalPages);
                        setLoading(false);
                        setAction(NONE);
                    }
                } else {
                    setLoading(false);
                    setError(true);
                }
            } catch (e) {
                setLoading(false);
                setError(true);
            }
        };

        (async () => {
            if (action !== NONE && !isEmptyObj(updatedArchive)) {
                try {
                    setLoading(true);
                    let res;
                    switch (action) {
                        case SUBMIT:
                            res = await postSubmitArchive(updatedArchive, source);
                            break;
                        case EDIT:
                            res = await patchEditArchive(updatedArchive, source);
                            break;
                        case DELETE:
                            res = await deleteArchive(updatedArchive, source);
                            break;
                    }
                    if (res.status === 200) {
                        await updateArchiveList();
                    } else {
                        setLoading(false);
                        setError(true);
                        setAction(NONE);
                    }
                } catch (e) {
                    setLoading(false);
                    setError(true);
                    setAction(NONE);
                }
            }

        })();

        return () => {
            mounted = false;
            source.cancel('Request cancelled');
        }
    }, [updatedArchive]);

    useEffect(() => {
        let mounted = true;
        let source = axios.CancelToken.source();

        (async () => {
            if (query.length <= 0) return;
            setLoading(true);
            try {
                setLoading(true);
                const res = await getArchiveList(query, page, null, source);
                if (res.message === 'OK') {
                    const updatedArchiveList = res.data.map(archive => convertToClientJson(archive));
                    if (mounted) {
                        setArchiveList([...updatedArchiveList]);
                        setPage(res.currentPage);
                        setTotalPages(res.totalPages);
                        setLoading(false);
                    }
                } else {
                    setError(true);
                    setLoading(false);
                }
            } catch (e) {
                setError(true);
                setLoading(false);
            }

        })();

        return () => {
            mounted = false;
            source.cancel('Request cancelled');
        };
    }, [query, page]);

    return {
        error,
        loading,
        page,
        totalPages,
        archiveList,
        updateArchive: setUpdatedArchive,
        setAction,
        setPage,
        setQuery
    }
}