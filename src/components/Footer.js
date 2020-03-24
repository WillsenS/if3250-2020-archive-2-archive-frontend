import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import theme from "../theme/index";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { Box, Grid, Toolbar, Typography, Link } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "32px"
  },
  toolbar: {
    padding: "28px 0"
  },
  grid: {
    margin: "10px 0"
  },
  image: {
    display: "block",
    maxWidth: "70%"
  },
  image100Tahun: {
    display: "block",
    maxWidth: "75%",
    margin: "0 auto"
  },
  description: {
    marginTop: "14px"
  },
  icon: {
    display: "inline-block"
  },
  link: {
    color: `${theme.palette.common.white} !important`,
    display: "inline-block",
    paddingLeft: "4px"
  }
}));

function Footer() {
  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="secondary" className={classes.root}>
          <Container>
            <Toolbar className={classes.toolbar}>
              <Grid container spacing={0}>
                <Grid item lg={2} sm={2} xs={8} className={classes.grid}>
                  <img
                    src="./static/img/ppid.png"
                    alt="logo PPID"
                    className={classes.image}
                  />
                </Grid>
                <Grid item lg={4} sm={4} xs={12} className={classes.grid}>
                  <Box>
                    <Typography variant="h4">
                      <Link href="https://ppid.itb.ac.id/" color="inherit">
                        PPID Institut Teknologi Bandung
                      </Link>
                    </Typography>
                  </Box>
                  <Box className={classes.description}>
                    <Typography variant="body2">
                      Pusat Informasi Kampus (Information Center) ITB
                    </Typography>
                    <Typography variant="body2">
                      Jalan Ganesha No. 10, Bandung, Jawa Barat, Indonesia.
                    </Typography>
                    <Typography variant="body2">
                      Telp. +62-22-2504252 | Fax. +62-22-2504252
                    </Typography>
                    <Typography variant="body2">
                      Email. ppid@itb.ac.id
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={4} sm={4} xs={12} className={classes.grid}>
                  <Box>
                    <Typography variant="h4">Media Sosial</Typography>
                  </Box>
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={7}>
                      <Box className={classes.description}>
                        <Grid container spacing={0}>
                          <TwitterIcon
                            fontSize="small"
                            className={classes.icon}
                          />
                          <a className={classes.linkGroup} href="https://twitter.com/PPID_ITB">
                            <Typography
                              variant="body2"
                              className={classes.link}
                            >
                              @PPID_ITB
                            </Typography>
                          </a>
                        </Grid>
                        <Grid container spacing={0}>
                          <FacebookIcon
                            fontSize="small"
                            className={classes.icon}
                          />
                          <a className={classes.linkGroup} href="https://www.facebook.com/PPID.ITB.Bandung/">
                            <Typography
                              variant="body2"
                              className={classes.link}
                            >
                              PPID.ITB.Bandung
                            </Typography>
                          </a>
                        </Grid>
                        <Grid container spacing={0}>
                          <WhatsAppIcon
                            fontSize="small"
                            className={classes.icon}
                          />
                          <a className={classes.linkGroup} href="https://api.whatsapp.com/send?phone=+6281290401959">
                            <Typography
                              variant="body2"
                              className={classes.link}
                            >
                              +62-812-9040-1959
                            </Typography>
                          </a>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={5}>
                      <Box className={classes.description}>
                        <Grid container spacing={0}>
                          <InstagramIcon
                            fontSize="small"
                            className={classes.icon}
                          />
                          <a className={classes.linkGroup} href="https://www.instagram.com/ppid.itb/?hl=en">
                            <Typography
                              variant="body2"
                              className={classes.link}
                            >
                              @ppid.itb
                            </Typography>
                          </a>
                        </Grid>
                        <Grid container spacing={0}>
                          <YouTubeIcon
                            fontSize="small"
                            className={classes.icon}
                          />
                          <a className={classes.linkGroup} href="https://www.youtube.com/channel/UCxlYLLsK5YdsrGCtVBU3kYQ">
                            <Typography
                              variant="body2"
                              className={classes.link}
                            >
                              PPID ITB
                            </Typography>
                          </a>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={2} sm={2} xs={12} className={classes.grid}>
                   <Link href="http://seabaditb.id/">
                    <img
                        src="./static/img/100-tahun-itb.png"
                        alt="100 Tahun ITB"
                        className={classes.image100Tahun}
                      />
                   </Link>
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
}

export default Footer;
