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


function Admin(props) {
    const classes = useStyles();
    return props.data ? (
      <AdminLayout section={1} title="Home Admin Panel">
          <Container component="div" className={classes.root}>
              <Grid container spacing={5}>
                  <HomeTable title="Statistik User" dataList={props.data.users}/>
                  <HomeTable title="Statistik Arsip" dataList={props.data.archives}/>
              </Grid>
          </Container>
      </AdminLayout>
  ) : (
      <span>{ props.errorText }</span>
  );
}

export async function getStaticProps() {

    const errorText = 'Gagal memuat admin panel';
    try {
        const res = await getStatistic();
        if (res.status === 200) {
            const data = res.data.payload;
            return { props: { data } };
        } else {
            return { props: { error: errorText } };
        }
    }   catch (e) {
        return { props: { error: errorText } };
    }

}


export default Admin;
