import React from "react";

import AdminLayout from "../../src/components/Admin/Layout";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import HomeTable from "../../src/components/Admin/Home/HomeTable";
import {getStatistic} from "../../resources/archive";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    }
}));


export default function Admin({data}) {
    const classes = useStyles();
  return (
      <AdminLayout section={1} title="Home Admin Panel">
          <Container component="div" className={classes.root}>
              <Grid container spacing={5}>
                  <HomeTable title="Statistik User" dataList={data.users}/>
                  <HomeTable title="Statistik Arsip" dataList={data.archives}/>
              </Grid>
          </Container>
      </AdminLayout>
  );
}

export async function getServerSideProps() {
    const errorText = 'Gagal mengambil statistik website';
    try {
        const res = await getStatistic();
        if (res.status === 200) {
            const data = res.data.payload;
            return { props: { data } };
        } else {
            console.log(errorText);
        }
    }   catch (e) {
        console.log(errorText);
    }
}

