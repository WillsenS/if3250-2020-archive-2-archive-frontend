import React from "react";

import AdminLayout from "../../src/components/Admin/Layout";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import HomeTable from "../../src/components/Admin/Home/HomeTable";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    }
}));

const userStatistic = [
    {nama: 'Terdaftar', jumlah: 20},
    {nama: 'Admin', jumlah: 5},
    {nama: 'Non-Admin', jumlah: 15},
];

const archiveStatistic = [
    {nama: 'Total', jumlah: 60},
    {nama: 'Foto', jumlah: 15},
    {nama: 'Audio', jumlah: 15},
    {nama: 'Video', jumlah: 15},
    {nama: 'Tesktual', jumlah: 15},
];


export default function Admin() {
    const classes = useStyles();
  return (
      <AdminLayout section={1} title="Home Admin Panel">
          <Container component="div" className={classes.root}>
              <Grid container spacing={5}>
                  <HomeTable title="Statistik User" dataList={userStatistic}/>
                  <HomeTable title="Statistik Arsip" dataList={archiveStatistic}/>
              </Grid>
          </Container>
      </AdminLayout>
  );


}
