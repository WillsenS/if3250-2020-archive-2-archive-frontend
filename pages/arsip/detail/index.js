import React, { useState, useEffect, useContext } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Header from "../../../src/components/Header";
import Footer from "../../../src/components/Footer";
import theme from "../../../src/theme/home";
import { getArchiveDetail, downloadArchive } from "../../../resources/archive";

import Layout from "../../../layout";
import { StateUserContext } from "../../../reducers/user";
import { defaultPublicURL } from "../../../config";

import _ from "lodash";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: "16px",
  },
  title2: {
    flexShrink: "0",
    [theme.breakpoints.up("md")]: {
      width: "250px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "150px",
    },
  },
  oneLineContainer: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      marginTop: "6px",
      padding: "2px",
    },
  },
  content: {
    marginTop: "32px",
  },
  frame: {
    width: "100%",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
    objectFit: "contain",
    marginLeft: "auto",
    marginRight: "auto",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      margin: "16px 200px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      margin: "16px 100px",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "16px 16px",
    },
  },
  buttonArea: {
    marginTop: "16px",
  },
}));

const Detail = (props) => {
  const classes = useStyles();
  const { archiveId, token } = props;
  const [archive, setArchive] = useState({});
  const [file, setFile] = useState({});

  const handleDownload = async () => {
    await downloadArchive(archiveId, token, file.filename);
  };

  const fetchArchiveDetail = async (archiveId, token) => {
    try {
      const response = await getArchiveDetail(archiveId, token);
      setFile(response.data.file);

      const notIncludedKey = [
        "_id",
        "file",
        "createdAt",
        "updatedAt",
        "__v",
        "keamanan_terbuka",
      ];

      notIncludedKey.map((key) => {
        delete response.data[key];
      });

      const types = ["photo", "audio", "video", "text"];

      types.map((type) => {
        if (response.data[type]) {
          const data = response.data[type];

          notIncludedKey.map((key) => {
            delete data[key];
          });

          response.data = { ...response.data, ...data };
        }
        delete response.data[type];
      });

      moment.locale("id");
      const date = moment(response.data["waktu_kegiatan"]).format("LL");

      if (date) {
        response.data["waktu_kegiatan"] = date;
      }

      setArchive(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchArchiveDetail(archiveId, token);
  }, []);

  const userState = useContext(StateUserContext);

  return (
    <>
      <Layout token={token}>
        <ThemeProvider theme={theme}>
          <Header user={userState.user} />
          <div className={classes.content}>
            <div className={classes.frame}>
              <img
                src={`${defaultPublicURL}${file.path}`}
                className={classes.image}
              />
            </div>
            <Box className={classes.contentContainer}>
              {Object.keys(archive).map((key, idx) => (
                <Box
                  borderBottom={1}
                  className={classes.oneLineContainer}
                  key={idx}
                >
                  <Typography variant="h6" className={classes.title2}>
                    {_.startCase(key)}
                  </Typography>
                  <Typography variant="body2">{archive[key]}</Typography>
                </Box>
              ))}
              <Box className={classes.buttonArea}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleDownload}
                >
                  Unduh
                </Button>
              </Box>
            </Box>
          </div>
          <Footer />
        </ThemeProvider>
      </Layout>
    </>
  );
};

Detail.getInitialProps = ({ req, query }) => {
  if (req && req.cookies) return { ...query, token: req.cookies.token };
  else return query;
};

export default Detail;
