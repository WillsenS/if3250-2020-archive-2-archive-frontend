import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getArchiveList } from "../resources/archive";
import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import SearchResult from "../components/SearchResult";
import theme from "../theme/index";

const useStyles = makeStyles(() => ({
  result: {
    marginTop: "32px"
  },
  pagination: {
    marginTop: "32px"
  },
  bold: {
    fontWeight: "600"
  },
  disabled: {
    display: "none"
  }
}));

const SearchPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const { q, page } = router.query;

  const [searchQuery, setSearchQuery] = useState(q || "");
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [archiveList, setArchiveList] = useState([]);

  const fetchArchiveList = async (searchQuery, currentPage) => {
    try {
      router.replace(
        {
          pathname: "/search",
          query: { name: searchQuery, page: currentPage }
        },
        `/search?${searchQuery ? `q=${searchQuery}` : ""}${
          searchQuery && currentPage ? `&page=${currentPage}` : ""
        }`
      );

      const response = await getArchiveList(searchQuery, currentPage);

      setArchiveList(response.data);
      setTotalItems(response.count);
      setTotalPage(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(searchQuery);
    fetchArchiveList(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const searchResults = archiveList.map((archive, idx) => (
    <SearchResult
      key={`searchResult-${idx}`}
      title={archive.judul}
      code={archive.kode}
      description={archive.keterangan}
      image={archive.file.path}
    />
  ));

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <Container>
          <Search value={searchQuery} setValue={setSearchQuery} />
          <Grid container spacing={3} className={classes.result}>
            <Grid item lg={4}></Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                className={searchQuery === "" ? classes.disabled : ""}
              >
                Menampilkan{" "}
                <span className={classes.bold}>{`${totalItems} hasil`}</span>{" "}
                untuk kata kunci{" "}
                <span className={classes.bold}>{`'${searchQuery}'`}</span>
              </Typography>
              {searchResults}
              <Pagination
                count={totalPage}
                page={currentPage}
                onChange={handleChange}
                className={
                  searchQuery === "" ? classes.disabled : classes.pagination
                }
                color="primary"
              />
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </ThemeProvider>
    </>
  );
};

SearchPage.getInitialProps = ({ query }) => {
  return query;
};

export default SearchPage;
