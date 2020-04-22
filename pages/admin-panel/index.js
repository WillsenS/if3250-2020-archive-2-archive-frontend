import React, {useEffect, useState} from "react";

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


function Admin({token}) {
    const classes = useStyles();
    const [users, setUsers] = useState({});
    const [archives, setArchives] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        (async() => {
            try {
                const res = await getStatistic(token);
                if (res.status === 200) {
                    const { payload } = res.data;
                    setUsers(payload.users);
                    setArchives(payload.archives);
                } else {
                    setError(true);
                }
            } catch (e) {
                setError(true);
            }
            finally {
                setLoading(false);
            }

        })();
    }, []);

    return error ? (
        <span>Terjadi kesalahan pada saat mengambil data</span>
    ) : (
       <>
           <AdminLayout section={1} title="Home Admin Panel">
               <Container component="div" className={classes.root}>
                   <Grid container spacing={5}>
                       <HomeTable title="Statistik User" dataList={users} loading={loading}/>
                       <HomeTable title="Statistik Arsip" dataList={archives} loading={loading}/>
                   </Grid>
               </Container>
           </AdminLayout>
       </>

  ) ;
}



Admin.getInitialProps = ({ req, query }) => {
    if (req && req.cookies) return { ...query, token: req.cookies.token };
    else return query;
};

export default Admin;
