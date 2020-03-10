import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getArchiveList } from "../../resources/archive";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Header from "../../src/components/Header";
import Footer from "../../src/components/Footer";
import Search from "../../src/components/Search";
import SearchResult from "../../src/components/SearchResult";
import FilterSearch from "../../src/components/FilterSearch";
import theme from "../../src/theme";

const useStyles = makeStyles(theme => ({
  result: {
    marginTop: "12px"
  },
  pagination: {
    width: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "24px"
  },
  bold: {
    fontWeight: "600"
  },
  container: {
    marginTop: "32px"
  },
  hidden: {
    display: "none"
  }
}));

const SearchPage = props => {
  const classes = useStyles();
  const router = useRouter();
  const { q, page } = router.query;

  const [isSearch, setIsSearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState(q || "");
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [filter, setFilter] = useState({});
  const [header, setHeader] = useState([]);
  const [filterCandidate, setFilterCandidate] = useState({});
  const [totalPage, setTotalPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [archiveList, setArchiveList] = useState([]);

  const fetchArchiveList = async (searchQuery, currentPage, filter) => {
    try {
      const f = [];
      Object.keys(filter).map(key => {
        filter[key].map(val => {
          f.push(`${key}==${val}`);
        });
      });

      router.replace(
        {
          pathname: "/search",
          query: { name: searchQuery, page: currentPage }
        },
        `/search?${searchQuery ? `q=${searchQuery}` : ""}${
          searchQuery && currentPage ? `&page=${currentPage}` : ""
        }`
      );

      const response = await getArchiveList(searchQuery, currentPage, f);

      setArchiveList(response.data);
      setTotalItems(response.count);
      setTotalPage(response.totalPages);
      setCurrentPage(response.currentPage);

      if (isSearch) setFilterCandidate(response.filtersCandidate);

      setIsSearch(false);

      if (header.length === 0) {
        const h = [];
        Object.keys(response.filtersCandidate).map(key => {
          h.push(false);
        });
        setHeader(h);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    fetchArchiveList(searchQuery, currentPage, filter);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [searchQuery, currentPage, filter]);

  const searchResults = archiveList.map((archive, idx) => (
    <SearchResult
      key={`searchResult-${idx}`}
      title={archive.judul}
      code={archive.kode}
      description={archive.keterangan}
      image={archive.file.path}
    />
  ));

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <Container className={classes.container}>
          <Search
            value={searchQuery}
            setValue={setSearchQuery}
            setIsSearch={setIsSearch}
            setHeader={setHeader}
            setFilter={setFilter}
          />
          <Grid container spacing={3} className={classes.result}>
            <Grid
              item
              lg={3}
              xs={12}
              className={searchQuery === "" ? classes.hidden : ""}
            >
              <FilterSearch
                filterCandidate={filterCandidate}
                filter={filter}
                setFilter={setFilter}
                header={header}
                setHeader={setHeader}
              />
            </Grid>
            <Grid item lg={9} xs={12}>
              <Typography
                variant="body1"
                className={searchQuery === "" ? classes.hidden : ""}
              >
                Menampilkan{" "}
                <span className={classes.bold}>{`${totalItems} hasil`}</span>{" "}
                untuk kata kunci{" "}
                <span className={classes.bold}>{`'${searchQuery}'`}</span>
              </Typography>
              {searchResults}
              <Pagination
                count={totalPage}
                page={parseInt(currentPage, 0)}
                onChange={handleChange}
                size={isWidthDown("sm", props.width) ? "small" : "medium"}
                className={
                  searchQuery === "" || totalPage === 0
                    ? classes.hidden
                    : classes.pagination
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

export default withWidth()(SearchPage);
