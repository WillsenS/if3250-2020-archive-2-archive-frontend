import React, { useContext } from "react";
import AllAdminLayout from "../../../src/components/Admin/Layout/AllAdmin";
import ArchiveTable from "../../../src/components/Admin/ArchiveTable";
import Classification from "../../../src/scheme/Classification";
import useUpdateArchive from "../../../hooks/archive/useUpdateArchive";
import { StateUserContext } from "../../../reducers/user";

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

  const userState = React.useContext(StateUserContext);

  return (
    <AllAdminLayout
      section={section}
      title="Pengaturan Data Arsip"
      token={token}
    >
      <ArchiveTable
        user={userState.user}
        searchQuery={state.query}
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
    </AllAdminLayout>
  );
}

Archives.getInitialProps = ({ req, query }) => {
  if (req && req.cookies) return { ...query, token: req.cookies.token };
  else return query;
};

export default Archives;
