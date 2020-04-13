import React, { useState, useContext, useEffect } from "react";
import Router from "next/router";
import {
  Box,
  Button,
  TextField,
  Typography,
  Hidden,
  Container,
  Grid,
  Link,
} from "@material-ui/core";
import theme from "../src/theme/home";
import SearchIcon from "@material-ui/icons/Search";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";

import Layout from "../layout";

import { StateUserContext } from "../reducers/user";
import { getLatestArchives } from "../resources/archive";

const useStyles = makeStyles((theme) => ({
  newDocument: {
    paddingLeft: "32px",
  },
  title: {
    marginBottom: "16px",
  },
  title2: {
    marginTop: "32px",
    marginBottom: "16px",
  },
  searchBar: {
    background: "white",
    borderColor: "black",
    [theme.breakpoints.up("md")]: {
      width: "800px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "500px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "250px",
    },
  },
  sideMenu: {
    borderRight: `solid 2px ${theme.palette.common.darkGray}`,
  },
  yellow: {
    color: theme.palette.warning.main,
  },
  pagination: {
    padding: "16px 0",
  },
}));

const Welcome = (props) => {
  const classes = useStyles();
  const data = props.width;

  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    Router.push({
      pathname: "/arsip/search",
      query: { q: searchQuery },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        padding="84px 0 84px 0"
        lineHeight="normal"
        margin="0 0 32px 0"
        style={{
          backgroundImage: "url(./static/img/itb.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box textAlign="center" margin="0 0 24px 0">
          <Typography variant={isWidthDown("xs", data) ? "h4" : "h2"}>
            SELAMAT DATANG DI
          </Typography>
          <Typography variant={isWidthDown("xs", data) ? "h3" : "h1"}>
            ARCHIVE DIGITAL
          </Typography>
          <Typography variant={isWidthDown("xs", data) ? "h3" : "h1"}>
            INFORMATION CENTER
          </Typography>
          <Typography variant={isWidthDown("xs", data) ? "h3" : "h1"}>
            INSTITUT TEKNOLOGI BANDUNG
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <form onSubmit={onSubmitForm}>
            <TextField
              placeholder="Masukkan pencarian anda di sini"
              margin="normal"
              type="search"
              variant="outlined"
              size="small"
              onChange={handleChange}
              className={classes.searchBar}
            />
          </form>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "17px 0" }}
          >
            <SearchIcon />
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const HomepageContent = (props) => {
  const classes = useStyles();
  const data = props.width;

  const { archives } = props;

  const latestArchives = archives.map((val, idx) => (
    <Box className={classes.pagination} key={`archive-${idx}`}>
      <Typography variant="h6" color="primary">
        <Link href={`/arsip/detail/${val._id}`} color="inherit">
          {val.judul.toUpperCase()}
        </Link>
      </Typography>
      <Typography variant="body2" className={classes.yellow}>
        {val.nomor}
      </Typography>
      <Typography variant="body2">{val.keterangan}</Typography>
    </Box>
  ));

  const arrMostSearch = [
    "Administrasi",
    "Surat Keputusan",
    "Publikasi",
    "Sekolah",
    "Rektor",
    "Institut Teknologi Bandung",
    "STEI",
  ];

  const mostSearch = arrMostSearch.map((val, idx) => (
    <Typography variant="body1" key={`search-${idx}`}>
      <Link href={`/arsip/search?q=${val}`} color="inherit">
        {val}
      </Link>
    </Typography>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container>
          <Hidden xsDown>
            <Grid item md={2} sm={3} xs={"auto"} className={classes.sideMenu}>
              <Box>
                <Typography variant="h4" className={classes.title}>
                  PENCARIAN
                </Typography>
                {mostSearch}
                <Typography variant="h4" className={classes.title2}>
                  Kategori
                </Typography>
                {categoryList}
              </Box>
            </Grid>
          </Hidden>
          <Grid
            item
            md={10}
            sm={9}
            xs={12}
            className={isWidthDown("xs", data) ? "" : classes.newDocument}
          >
            <Box>
              <Typography variant="h3" className={classes.title}>
                ARSIP TERBARU
              </Typography>
              {latestArchives}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

const Home = (props) => {
  const { token } = props;
  const userState = useContext(StateUserContext);
  const [latestArchives, setLatestArchives] = useState([]);

  const fetchLatestArchives = async () => {
    try {
      const response = await getLatestArchives();
      setLatestArchives(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLatestArchives();
  }, []);

  return (
    <>
      <Layout token={token}>
        <ThemeProvider theme={theme}>
          <Header user={userState.user} />
          <Welcome width={props.width} />
          <HomepageContent width={props.width} archives={latestArchives} />
          <Footer />
        </ThemeProvider>
      </Layout>
    </>
  );
};

Home.getInitialProps = ({ req }) => {
  if (req && req.cookies) {
    return { token: req.cookies.token };
  } else {
    return {};
  }
};

export default withWidth()(Home);
