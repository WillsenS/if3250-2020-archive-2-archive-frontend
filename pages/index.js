import React, { useState } from "react";
import Router from "next/router";
import {
  Box,
  Button,
  TextField,
  Typography,
  Hidden,
  Container,
  Grid
} from "@material-ui/core";
import theme from "../theme/home";
import SearchIcon from "@material-ui/icons/Search";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";

const useStyles = makeStyles(() => ({
  newDocument: {
    paddingLeft: "32px"
  },
  title: {
    marginBottom: "16px"
  },
  title2: {
    marginTop: "32px",
    marginBottom: "16px"
  },
  searchBar: {
    background: "white",
    borderColor: "black",
    [theme.breakpoints.up("md")]: {
      width: "800px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "500px"
    },
    [theme.breakpoints.down("xs")]: {
      width: "250px"
    }
  },
  sideMenu: {
    borderRight: `solid 2px ${theme.palette.common.darkGray}`
  },
  yellow: {
    color: theme.palette.warning.main
  },
  pagination: {
    padding: "16px 0"
  }
}));

const Welcome = props => {
  const classes = useStyles();
  const data = props.width;

  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = event => {
    setSearchQuery(event.target.value);
  };

  const onSubmitForm = event => {
    event.preventDefault();
    Router.push({
      pathname: "/search",
      query: { q: searchQuery }
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
          backgroundSize: "cover"
        }}
      >
        <Box textAlign="center" margin="0 0 24px 0">
          <Typography variant={isWidthDown("xs", data) ? "h4" : "h2"}>
            SELAMAT DATANG DI
          </Typography>
          <Typography variant={isWidthDown("xs", data) ? "h3" : "h1"}>
            WEBSITE ARSIP STATIS
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

const HomepageContent = props => {
  const classes = useStyles();
  const data = props.width;

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
                <Typography variant="body1">
                  Administrasi <br />
                  Sekolah/Fakultas <br />
                  Surat Keputusan (SK) <br />
                  Publikasi{" "}
                </Typography>
                <Typography variant="h4" className={classes.title2}>
                  Kategori
                </Typography>
                <Typography variant="body1">
                  Dokumen Cetak <br />
                  Foto/Gambar <br />
                  Video{" "}
                </Typography>
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
                DOKUMEN TERBARU
              </Typography>
              <Box className={classes.pagination}>
                <Typography variant="h6" color="primary">
                  KEPUTUSAN MENTERI SYARAT MAHASISWA ASING UNTUK MENJADI
                  MAHASISWA PERGURUAN TINGGI DI INDONESIA
                </Typography>
                <Typography variant="body2" className={classes.yellow}>
                  11/K TAHUN 1998
                </Typography>
                <Typography variant="body2">
                  Bagian dari{" "}
                  <Box component="span" color="primary.light">
                    Kantor Arsip Institut Teknologi Bandung
                  </Box>
                </Typography>
              </Box>
              <Box className={classes.pagination}>
                <Typography variant="h6" color="primary">
                  KEPUTUSAN MENTERI SYARAT MAHASISWA ASING UNTUK MENJADI
                  MAHASISWA PERGURUAN TINGGI DI INDONESIA
                </Typography>
                <Typography variant="body2" className={classes.yellow}>
                  12/K TAHUN 1998
                </Typography>
                <Typography variant="body2">
                  Bagian dari{" "}
                  <Box component="span" color="primary.light">
                    Kantor Arsip Institut Teknologi Bandung
                  </Box>
                </Typography>
              </Box>
              <Box className={classes.pagination}>
                <Typography variant="h6" color="primary">
                  KEPUTUSAN MENTERI SYARAT MAHASISWA ASING UNTUK MENJADI
                  MAHASISWA PERGURUAN TINGGI DI INDONESIA
                </Typography>
                <Typography variant="body2" className={classes.yellow}>
                  12/K TAHUN 1998
                </Typography>
                <Typography variant="body2">
                  Bagian dari{" "}
                  <Box component="span" color="primary.light">
                    Kantor Arsip Institut Teknologi Bandung
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

const Index = props => {
  return (
    <div>
      <Header />
      <Welcome width={props.width} />
      <HomepageContent width={props.width} />
      <Footer />
    </div>
  );
};

export default withWidth()(Index);
