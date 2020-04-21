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

  return (
    <AdminLayout section={section} title="Pengaturan Data Admin">
      <KeywordTable dataKeyword={keywords} />
    </AdminLayout>
  );
};

export default Keyword;
