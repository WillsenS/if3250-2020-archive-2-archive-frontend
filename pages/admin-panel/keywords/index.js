import React, { useEffect, useState } from "react";

import AdminLayout from "../../../src/components/Admin/Layout";
import KeywordTable from "../../../src/components/Admin/KeywordTable";

import {
  getMostSearchKeywordOnFile,
  changeMostSearchKeywordOnFile,
} from "../../../resources/archive";

const Keyword = (props) => {
  const [keywords, setKeywords] = useState([]);

  const section = 5;

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
    <AdminLayout
      section={section}
      title="Pengaturan Data Keyword"
      token={props.token}
    >
      <KeywordTable
        dataKeyword={keywords}
        handleEditDataRequest={handleEditKeywordRequest}
      />
    </AdminLayout>
  );
};

Keyword.getInitialProps = ({ req }) => {
  if (req && req.cookies) {
    return { token: req.cookies.token };
  } else {
    return {};
  }
};

export default Keyword;
