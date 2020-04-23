import React from "react";
import AdminLayout from "../../../src/components/Admin/Layout";
import ArchiveTable from "../../../src/components/Admin/ArchiveTable";
import Classification from "../../../src/scheme/Classification";
import useUpdateArchive from "../../../hooks/archive/useUpdateArchive";

const SUBMIT = 1;
const EDIT = 2;
const DELETE = 3;

function Archives({ token }) {
  const state = useUpdateArchive(token);
  const section = 3; // section: archive

  const handlePageRequests = (val) => {
    if (val !== state.page) {
      state.setPage(val);
    }
  };

  const handleSearch = (val) => {
    if (val.trim().length > 0) {
      state.setQuery(val);
    }
  };

  const handleAddNewArchiveRequest = (newArchiveData) => {
    state.setAction(SUBMIT);
    state.updateArchive({ ...newArchiveData });
  };

  const handleEditArchiveRequest = (editedArchive) => {
    state.setAction(EDIT);
    state.updateArchive({ ...editedArchive });
  };

  const handleDeleteArchiveRequest = (selectedArchive) => {
    state.setAction(DELETE);
    state.updateArchive({ ...selectedArchive });
  };

  return (
    <AdminLayout section={section} title="Pengaturan Data Arsip">
      <ArchiveTable
        searchQuery={state.query}
        // @ts-ignore
        currentPage={state.page}
        loading={state.loading}
        error={state.error}
        totalPages={state.totalPages}
        archives={state.archiveList}
        classification={Classification.klasifikasi}
        handleSearch={handleSearch}
        handlePageRequests={handlePageRequests}
        handleAddRequests={handleAddNewArchiveRequest}
        handleEditRequests={handleEditArchiveRequest}
        handleDeleteRequests={handleDeleteArchiveRequest}
      />
    </AdminLayout>
  );
}

Archives.getInitialProps = ({ req, query }) => {
  if (req && req.cookies) return { ...query, token: req.cookies.token };
  else return query;
};

export default Archives;
