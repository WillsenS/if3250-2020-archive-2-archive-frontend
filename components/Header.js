import React from "react";
import theme from "../theme/index";
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Grid
} from "@material-ui/core";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  title: {
    marginTop: "auto",
    marginBottom: "auto"
  },
  yellow: {
    color: theme.palette.warning.main
  },
  imageLg: {
    maxWidth: "75%"
  },
  imageXs: {
    maxWidth: "90%"
  },
  grid: {
    display: "inline-flex"
  },
  toolbar: {
    padding: "16px 0"
  },
  login: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto"
  }
}));

function Header(props) {
  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static" className={classes.root}>
          <Container>
            <Toolbar className={classes.toolbar}>
              <Grid container spacing={0}>
                <Grid item xs={2} lg={1} className={classes.grid}>
                  <img
                    src="./static/img/logo-itb.png"
                    alt="logo ITB"
                    className={
                      isWidthDown("sm", props.width)
                        ? classes.imageXs
                        : classes.imageLg
                    }
                  />
                </Grid>
                <Grid item xs={8} className={classes.grid}>
                  <Box className={classes.title}>
                    <Box>
                      <Typography
                        variant={isWidthDown("sm", props.width) ? "h4" : "h3"}
                        className={classes.yellow}
                      >
                        SISTEM ARSIP
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant={isWidthDown("sm", props.width) ? "h4" : "h3"}
                      >
                        INSTITUT TEKNOLOGI BANDUNG
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={3} xs={2} className={classes.grid}>
                  <div className={classes.login}>
                    <Typography variant="h4">LOGIN</Typography>
                  </div>
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
}

export default withWidth()(Header);
