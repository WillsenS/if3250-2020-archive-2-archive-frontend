import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Typhograpy from '@material-ui/core/Typography'

import Header from "../components/Header";
import Footer from "../components/Footer";
import theme from "../theme/index";

const ContentStyles = makeStyles(() => ({
  newDocument:{
    flexGrow : 1,
    padding : "32px 32px"
  },
  title: {
    marginBottom : "16px"
  },
  title2:{
    marginTop : "32px",
    marginBottom : "16px"
  },
  yellow:{
    color: theme.palette.warning.main
  },
  pagination:{
    padding: "16px 0"
  }
}))

const searchBarStyle = {
  background: 'white',
  width : "800px",
  borderColor : 'black'
}

function Welcome() {
  const classes = ContentStyles();

  return(
    <ThemeProvider theme={theme}>
      <Box bgcolor="primary.bg" padding="32px 0" lineHeight="normal">
        <Box textAlign="center" >
          <Typhograpy variant="h2" >
            SELAMAT DATANG DI
          </Typhograpy>
          <Typhograpy variant="h1" >
            WEBSITE ARSIP STATIS <br />
            INSTITUT TEKNOLOGI BANDUNG
          </Typhograpy>
        </Box>
        <Box display="flex" justifyContent="center">
          <form>
            <TextField placeholder="Masukkan pencarian anda disini" 
              margin="normal" type="search" 
              variant="outlined" size="small"
              style={searchBarStyle} />
          </form>
          <Button variant="contained" color="primary" style={{margin: '17px 0'}}>
            <SearchIcon/>
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function HomepageContent(){
  const classes = ContentStyles();

  return(
    <Box marginTop="16px" display = "flex">
      <ThemeProvider theme={theme}>
        <Box padding = "32px 32px" borderRight={1}>
          <Typhograpy variant="h4" className={classes.title} >
            PENCARIAN
          </Typhograpy>
          <Typhograpy variant="body1">
            Administrasi <br/>
            Sekolah/Fakultas <br/>
            Surat Keputusan (SK) <br/>
            Publikasi <br />
          </Typhograpy>
          <Typhograpy variant="h4" className={classes.title2} >
            Kategori
          </Typhograpy>
          <Typhograpy variant="body1">
            Dokumen Cetak <br/>
            Foto/Gambar <br/>
            Video<br/>
          </Typhograpy>
          </Box>
          <Box className={classes.newDocument}>
            <Typhograpy variant="h3" className={classes.title}>
              DOKUMEN TERBARU
            </Typhograpy>
            <Box className={classes.pagination}>
              <Typhograpy variant="h6" color="primary">
                KEPUTUSAN MENTERI SYARAT MAHASISWA ASING UNTUK MENJADI<br />
                MAHASISWA PERGURUAN TINGGI DI INDONESIA
              </Typhograpy>
              <Typhograpy variant="body2" className={classes.yellow}>
                11/K TAHUN 1998
              </Typhograpy>
              <Typhograpy variant="body2">
                Bagian dari <Box component="span" color="primary.light">Kantor Arsip Institut Teknologi Bandung</Box>
              </Typhograpy>
            </Box>
            <Box className={classes.pagination}>
              <Typhograpy variant="h6" color="primary">
                KEPUTUSAN MENTERI SYARAT MAHASISWA ASING UNTUK MENJADI<br />
                MAHASISWA PERGURUAN TINGGI DI INDONESIA
              </Typhograpy>
              <Typhograpy variant="body2" className={classes.yellow}>
                12/K TAHUN 1998
              </Typhograpy>
              <Typhograpy variant="body2">
                Bagian dari <Box component="span" color="primary.light">Kantor Arsip Institut Teknologi Bandung</Box>
              </Typhograpy>
            </Box>
            <Typhograpy variant="h6" color="primary">
              SURAT KEPUTUSAN PENERIMAAN MAHASISWA BARU ITB TAHUN 1998
            </Typhograpy>
            <Typhograpy variant="body2" className={classes.yellow}>
              13/K TAHUN 1998
            </Typhograpy>
            <Typhograpy variant="body2">
              Bagian dari <Box component="span" color="primary.light">Kantor Arsip Institut Teknologi Bandung</Box>
            </Typhograpy>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

const HomePage = () => {
    return(
      <div>
          <Header />
          <Welcome />
          <HomepageContent />
          <Footer />
      </div>
    );
};

export default HomePage;