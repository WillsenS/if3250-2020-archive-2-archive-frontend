import React, { useEffect, useState } from "react";
import AdminLayout from "../../../../src/components/Admin/Layout";
import ExpiedArchiveTable from "../../../../src/components/Admin/ExpiredArchiveTable";
import Classification from "../../../../src/scheme/Classification";
import {
  patchEditArchive,
  deleteArchive,
  getArchiveExpired,
} from "../../../../resources/archive";
import { convertToClientJson } from "../../../../utils/JsonConverter";
import axios from "axios";

export default function Archives() {
  const [editedArchive, setEditedArchive] = useState({});
  const [deletedArchiveId, setDeletedArchiveId] = useState("");
  const [searchQuery, setSearchQuery] = useState("*");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [archiveList, setArchiveList] = useState([]);
  const section = 3; // section: archive

  // Edit archive handler
  useEffect(() => {
    const errorText = "Terjadi kesalahan. Silahkan coba beberapa saat lagi";
    const successText = "Arsip berhasil dirubah";
    let mounted = true;
    let source = axios.CancelToken.source(); //cancel request if user leave the page
    const editArchive = async (archive, source) => {
      try {
        const res = await patchEditArchive(archive, source);
        if (res.status === 200) {
          // eslint-disable-next-line no-undef
          alert(successText);
          const getRes = await getArchiveExpired(page, source);
          if (getRes.message === "OK") {
            const updatedArchiveList = getRes.data.map((archive) =>
              convertToClientJson(archive)
            );
            if (mounted) {
              setArchiveList([...updatedArchiveList]);
              setPage(res.currentPage);
              setTotalPages(res.totalPages);
            }
          }
        } else {
          // eslint-disable-next-line no-undef
          alert(errorText);
        }
      } catch (e) {
        // eslint-disable-next-line no-undef
        alert(errorText);
      }
    };
    if (!isEmptyObj(editedArchive)) {
      // Don't run useEffect on first component load
      editArchive(editedArchive, source).catch((e) => {});
    }
    return () => {
      mounted = false;
      source.cancel("Canceled because user left the page");
    };
  }, [editedArchive]);
  // Delete archive handler
  useEffect(() => {
    const errorText = "Terjadi kesalahan. Silahkan coba beberapa saat lagi";
    const successText = "Arsip berhasil dihapus";
    let mounted = true; //handle mem. leak if user leave the page before task is finished
    let source = axios.CancelToken.source(); //cancel request if user leave the page
    const handleDeleteArchive = async (id, source) => {
      try {
        const res = await deleteArchive(id, source);
        if (res.status === 200) {
          // eslint-disable-next-line no-undef
          alert(successText);
          const getRes = await getArchiveExpired(page, source);
          if (getRes.message === "OK") {
            const updatedArchiveList = getRes.data.map((archive) =>
              convertToClientJson(archive)
            );
            if (mounted) {
              setArchiveList([...updatedArchiveList]);
              setPage(res.currentPage);
              setTotalPages(res.totalPages);
            }
          }
        } else {
          // eslint-disable-next-line no-undef
          alert(errorText);
        }
      } catch (e) {
        // eslint-disable-next-line no-undef
        alert(errorText);
      }
    };
    if (deletedArchiveId) {
      // Don't run useEffect on first component load
      handleDeleteArchive(deletedArchiveId, source).catch((e) => {});
    }
    return () => {
      mounted = false;
      source.cancel("Canceled because user left the page");
    };
  }, [deletedArchiveId]);

  // Search handler
  useEffect(() => {
    if (searchQuery.length <= 0) return;
    console.log("search = ", searchQuery);
    let mounted = true; //handle mem. leak if user leave the page before task is finished
    let source = axios.CancelToken.source(); //cancel request if user leave the page
    const handleGetArchiveExpired = async (
      searchQuery,
      page,
      filter,
      source
    ) => {
      const res = await getArchiveExpired(searchQuery, page, filter, source);
      if (res.message === "OK") {
        const updatedArchiveList = res.data.map((archive) =>
          convertToClientJson(archive)
        );
        if (mounted) {
          setArchiveList([...updatedArchiveList]);
          setPage(res.currentPage);
          setTotalPages(res.totalPages);
        }
      }
    };
    handleGetArchiveExpired(page, source).catch((e) => {});
    return () => {
      mounted = false;
      source.cancel("Canceled because user left the page");
    };
  }, [searchQuery, page]);

  const isEmptyObj = (obj) => {
    return Object.keys(obj).length === 0;
  };
  const handlePageRequests = (val) => {
    console.log(typeof val, val);
    if (val !== page) {
      setPage(val);
    }
  };

  const handleSearch = (val) => {
    if (val.trim().length > 0) {
      setSearchQuery(val);
    }
  };

  const handleEditArchiveRequest = (editedArchive) => {
    setEditedArchive({ ...editedArchive });
  };

  const handleDeleteArchiveRequest = (selectedArchive) => {
    setDeletedArchiveId(selectedArchive._id);
  };

  return (
    <AdminLayout section={section} title="Pengaturan Data Arsip">
      <ExpiedArchiveTable
        searchQuery={searchQuery}
        currentPage={page}
        totalPages={totalPages}
        archives={archiveList}
        classification={Classification.klasifikasi}
        handleSearch={handleSearch}
        handlePageRequests={handlePageRequests}
        handleEditRequests={handleEditArchiveRequest}
        handleDeleteRequests={handleDeleteArchiveRequest}
      />
    </AdminLayout>
  );
}