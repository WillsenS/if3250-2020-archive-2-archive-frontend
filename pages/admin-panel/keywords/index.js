import React, { useEffect, useState } from "react";

import AdminLayout from "../../../src/components/Admin/Layout";
import KeywordTable from "../../../src/components/Admin/KeywordTable";

import {
  getMostSearchKeywordOnFile,
  changeMostSearchKeywordOnFile,
} from "../../../resources/archive";

const Keyword = (props) => {
  const [keywords, setKeywords] = useState([]);

  const section = 2; //Section: Admin

  async function getData() {
    const response = await getMostSearchKeywordOnFile();
    const dataKeyword = [];
    const dataMostSearch = response.data;

    dataMostSearch.map((data) => {
      dataKeyword.push(data.keyword);
    });

    setKeywords([...dataKeyword]);
  }

  useEffect(() => {
    getData();
  }, []);

  const handleEditKeywordRequest = async (index, keyword) => {
    const data = [];

    keywords.map((key, idx) => {
      if (idx !== index) data.push({ keyword: key });
      else data.push({ keyword });
    });

    await changeMostSearchKeywordOnFile(data);

    keywords[index] = keyword;
    setKeywords([...keywords]);
  };

  return (
    <AdminLayout section={section} title="Pengaturan Data Admin">
      <KeywordTable
        dataKeyword={keywords}
        handleEditDataRequest={handleEditKeywordRequest}
      />
    </AdminLayout>
  );
};

export default Keyword;
