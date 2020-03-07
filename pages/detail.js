import React from 'react';
import { makeStyles, ThemeProvider} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import sampleDocument from '../public/static/img/sample-document.png';
import Header from '../components/Header';
import Footer from '../components/Footer';
import theme from '../theme/index';
import { Typography } from '@material-ui/core';

const DetailStyles = makeStyles(theme =>({
  title: {
    padding : "16px"
  },
  title2: {
    width: "250px"
  },
  oneLineContainer: {
    display: 'flex'
  },
  archiveImg: {
    display: "block", 
    marginLeft : "auto",
    marginRight : "auto",
    width : "200px",
    height : "240px"
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '16px 200px'
  },
  buttonArea: {
    marginTop: '16px',
  },
  buttonKembali: {
    marginRight: "16px"
  },
  buttonEdit: {
    marginLeft: "75.3%"
  }
}));

export default function Detail() {
  var rawData = [
    "Kode Arsip","0183/U/1992",
    "Judul Dokumen", "Keputusan menteri syarat mahasiswa asing untuk menjadi mahasiswa perguruan tinggi di indonesia",
    "Jenis Dokumen", "Digital(D) dan Cetak(C)",
    "Kondisi Dokumen", "Baik",
    "Lokasi Simpan", "Ruang Arsip PPID ITB",
    "Keterangan", "Dokumen ini berisi peraturan yang mengatur syarat mahasiswa asing menjadi mahasiswa Indonesia"  
  ]
  function labelingRawData(){
    var result = [];
    for (var i=0; i<rawData.length; i+=2){
      result.push({
        title: rawData[i],
        content: rawData[i+1]
      })
    }
    return result;
  }
  var metadata = labelingRawData();

  const classes = DetailStyles();

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Typography variant="h3" className={classes.title} >
          ARSIP DOKUMEN
      </Typography>
      <img src={sampleDocument} className={classes.archiveImg}></img>
      <Box className = {classes.contentContainer}>
        {metadata.map((line) => (
          <Box borderBottom={1} className={classes.oneLineContainer}>
            <Typography variant="h6" className={classes.title2}>
              {line.title}
            </Typography>
            <Typography variant="body2">
              {line.content}
            </Typography>
          </Box>
        ))}
        <Box className={classes.buttonArea}>
          <Button variant="contained" color="primary" size="small" className={classes.buttonKembali}>Kembali</Button>
          <Button variant="contained" color="primary" size="small">Unduh</Button>
          <Button variant="contained" color="primary" size="small" className={classes.buttonEdit}>Edit</Button>
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}