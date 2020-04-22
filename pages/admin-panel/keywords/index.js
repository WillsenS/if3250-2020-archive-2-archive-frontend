import React, { useEffect, useState } from "react";

import AdminLayout from "../../../src/components/Admin/Layout";
import KeywordTable from "../../../src/components/Admin/KeywordTable";

const Keyword = (props) => {
  const [keywords, setKeywords] = useState([]);

  const section = 2; //Section: Admin

  useEffect(() => {
    const dataKeyword = [];
    const dataMostSearch = require("../../../config/mostSearch.json");

    dataMostSearch.map((data) => {
      dataKeyword.push(data.keyword);
    });

    setKeywords([...dataKeyword]);
  }, []);

  const handleEditKeywordRequest = (index, keyword) => {
    const data = [];

    keywords.map((key, idx) => {
      if (idx !== index) data.push({ keyword: keywords[idx] });
      else data.push({ keyword });
    });

    console.log(data);
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
