import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { getArchiveList } from "../../../resources/archive";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Header from "../../../src/components/Header";
import Footer from "../../../src/components/Footer";
import Search from "../../../src/components/Search";
import SearchResult from "../../../src/components/SearchResult";
import FilterSearch from "../../../src/components/FilterSearch";
import theme from "../../../src/theme";
import { defaultPublicURL } from "../../../config";

import Layout from "../../../layout";
import { StateUserContext } from "../../../reducers/user";

const useStyles = makeStyles((theme) => ({
  result: {
    marginTop: "12px",
  },
  pagination: {
    width: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "24px",
  },
  bold: {
    fontWeight: "600",
  },
  container: {
    marginTop: "32px",
  },
  hidden: {
    display: "none",
  },
}));

const SearchPage = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { q, page, tipe } = router.query;

  const [isSearch, setIsSearch] = useState(true);
  const [searchQuery, setSearchQuery] = useState(q || "");
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [type, setType] = useState(tipe || "");
  const [filter, setFilter] = useState({});
  const [header, setHeader] = useState([]);
  const [filterCandidate, setFilterCandidate] = useState({});
  const [totalPage, setTotalPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [archiveList, setArchiveList] = useState([]);

  const fetchArchiveList = async (searchQuery, currentPage, filter) => {
    try {
      const arrFilter = [];
      Object.keys(filter).map((key) => {
        filter[key].map((val) => {
          arrFilter.push(`${key}==${val}`);
        });
      });

      router.replace(
        {
          pathname: "/arsip/search",
          query: { name: searchQuery, page: currentPage },
        },
        `/arsip/search?${searchQuery ? `q=${searchQuery}` : ""}${
          searchQuery && currentPage ? `&page=${currentPage}` : ""
        }`
      );

      const response = await getArchiveList(
        searchQuery,
        currentPage,
        arrFilter
      );

      setArchiveList(response.data);
      setTotalItems(response.count);
      setTotalPage(response.totalPages);
      setCurrentPage(response.currentPage);

      if (isSearch) setFilterCandidate(response.filtersCandidate);

      setIsSearch(false);

      if (header.length === 0) {
        const h = [];
        Object.keys(response.filtersCandidate).map((key) => {
          if (filter["tipe"] && key === "tipe") h.push(true);
          else h.push(false);
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
    if (tipe) {
      let obj = { tipe: [tipe] };
      setFilter({ ...obj });
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  useEffect(() => {
    fetchArchiveList(searchQuery, currentPage, filter);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [searchQuery, currentPage, filter]);

  const searchResults = archiveList.map((archive, idx) => (
    <SearchResult
      key={`searchResult-${idx}`}
      id={archive._id}
      title={archive.judul}
      code={archive.nomor}
      description={archive.keamanan_terbuka ? archive.keterangan : null}
      image={
        archive.keamanan_terbuka
          ? `${defaultPublicURL}${archive.file.path}`
          : "/static/img/thumbnail.jpg"
      }
    />
  ));

  const { token } = props;
  const userState = useContext(StateUserContext);

  return (
    <>
      <Layout token={token}>
        <ThemeProvider theme={theme}>
          <Header user={userState.user} />
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
      </Layout>
    </>
  );
};

SearchPage.getInitialProps = ({ req, query }) => {
  if (req && req.cookies) return { ...query, token: req.cookies.token };
  else return query;
};

export default withWidth()(SearchPage);
