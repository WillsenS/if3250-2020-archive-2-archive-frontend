import React, { useState, useEffect } from "react";
import axios from "axios";
import { convertToClientJson } from "../../utils/JsonConverter";
import {
  postSubmitArchive,
  patchEditArchive,
  deleteArchive,
  getArchiveList,
} from "../../resources/archive";

export default function useUpdateArchive(token) {
  const [updatedArchive, setUpdatedArchive] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [archiveList, setArchiveList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("*");
  const NONE = 0;
  const SUBMIT = 1;
  const EDIT = 2;
  const DELETE = 3;
  const [action, setAction] = useState(NONE);

  const isEmptyObj = (obj) => {
    return Object.keys(obj).length === 0;
  };

  useEffect(() => {
    let mounted = true;
    let source = axios.CancelToken.source();

    const updateArchiveList = async () => {
      const errorText =
        "Gagal melakukan update pada tabel arsip. Silahkan coba beberapa saat lagi";
      try {
        setLoading(true);
        const res = await getArchiveList("*", 1, "", source, token);
        if (res.message === "OK") {
          const updatedArchiveList = res.data.map((archive) =>
            convertToClientJson(archive)
          );
          if (mounted) {
            setArchiveList([...updatedArchiveList]);
            setPage(res.currentPage);
            setTotalPages(res.totalPages);
            setAction(NONE);
          }
        } else {
          setError(errorText);
        }
      } catch (e) {
        setError(errorText);
      } finally {
        setLoading(false);
      }
    };

    (async () => {
      const fetchError =
        "Gagal melakukan perubahan pada arsip. Silahkan coba beberapa saat lagi";
      if (action !== NONE && !isEmptyObj(updatedArchive)) {
        try {
          setLoading(true);
          let res;
          switch (action) {
            case SUBMIT:
              res = await postSubmitArchive(updatedArchive, source, token);
              break;
            case EDIT:
              res = await patchEditArchive(updatedArchive, source, token);
              break;
            case DELETE:
              res = await deleteArchive(updatedArchive, source, token);
              break;
          }
          if (res.status === 200) {
            await updateArchiveList();
          } else {
            setError(fetchError);
            setAction(NONE);
          }
        } catch (e) {
          setError(fetchError);
          setAction(NONE);
        } finally {
          setLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
      source.cancel("Request cancelled");
    };
  }, [updatedArchive]);

  useEffect(() => {
    const errorText =
      "Gagal melakukan pencarian dan update tabel arsip. Silahkan coba beberapa saat lagi";
    let mounted = true;
    let source = axios.CancelToken.source();

    (async () => {
      if (query.length <= 0) return;
      setLoading(true);
      try {
        setLoading(true);
        const res = await getArchiveList(query, page, null, source, token);
        if (res.message === "OK") {
          const updatedArchiveList = res.data.map((archive) =>
            convertToClientJson(archive)
          );
          if (mounted) {
            setArchiveList([...updatedArchiveList]);
            setPage(res.currentPage);
            setTotalPages(res.totalPages);
          }
        } else {
          setError(errorText);
        }
      } catch (e) {
        setError(errorText);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      source.cancel("Request cancelled");
    };
  }, [query, page]);

  // Error handler
  useEffect(() => {
    if (error.length <= 0) return;
    alert(error);
    setError("");
  }, [error]);

  return {
    error,
    loading,
    page,
    totalPages,
    archiveList,
    updateArchive: setUpdatedArchive,
    setAction,
    setPage,
    setQuery,
  };
}
