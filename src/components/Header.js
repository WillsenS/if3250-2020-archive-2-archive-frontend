import React from "react";
import theme from "../theme";
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Grid,
  Link,
} from "@material-ui/core";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

//PropTypes validation
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  yellow: {
    color: theme.palette.warning.main,
  },
  image: {
    [theme.breakpoints.down("md")]: {
      maxWidth: "90%",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "60%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  grid: {
    display: "inline-flex",
  },
  toolbar: {
    padding: "16px 0",
  },
  login: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { user } = props;

  let navbarUser;

  if (!user) {
    navbarUser = (
      <Grid container spacing={0}>
        <Grid item lg={8} className={classes.grid}>
          <div className={classes.login}>
            <Link href="/login" color="inherit">
              <Typography variant="h4">LOGIN</Typography>
            </Link>
          </div>
        </Grid>
      </Grid>
    );
  } else if (user.role === 1 || user.role === 2) {
    navbarUser = (
      <Grid container spacing={0}>
        <Grid item lg={4} className={classes.grid}>
          <div className={classes.login}>
            <Typography variant="h4">{user.fullname}</Typography>
          </div>
        </Grid>
        <Grid item lg={4} className={classes.grid}>
          <div className={classes.login}>
            <Link href="/admin-panel" color="inherit">
              <Typography variant="h4">ADMIN PANEL</Typography>
            </Link>
          </div>
        </Grid>
        <Grid item lg={4} className={classes.grid}>
          <div className={classes.login}>
            <Link href="/logout" color="inherit">
              <Typography variant="h4">LOGOUT</Typography>
            </Link>
          </div>
        </Grid>
      </Grid>
    );
  } else {
    navbarUser = (
      <Grid container spacing={0}>
        <Grid item lg={4} className={classes.grid}>
          <div className={classes.login}>
            <Typography variant="h4">{user.fullname}</Typography>
          </div>
        </Grid>
        <Grid item lg={4} className={classes.grid}>
          <div className={classes.login}>
            <Link href="/logout" color="inherit">
              <Typography variant="h4">LOGOUT</Typography>
            </Link>
          </div>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static" className={classes.root}>
          <Container>
            <Toolbar className={classes.toolbar}>
              <Grid container spacing={0}>
                <Grid item xs={2} sm={1} lg={1} className={classes.grid}>
                  <Link href="/">
                    <img
                      src="/static/img/logo-itb.png"
                      alt="logo ITB"
                      className={classes.image}
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                </Grid>
                <Grid item xs={6} className={classes.grid}>
                  <Box className={classes.title}>
                    <Box>
                      <Link href="/" color="inherit">
                        <Typography
                          variant={isWidthDown("sm", props.width) ? "h4" : "h3"}
                          className={classes.yellow}
                        >
                          SISTEM ARSIP
                        </Typography>
                      </Link>
                    </Box>
                    <Box>
                      <Link href="/" color="inherit">
                        <Typography
                          variant={isWidthDown("sm", props.width) ? "h4" : "h3"}
                        >
                          INSTITUT TEKNOLOGI BANDUNG
                        </Typography>
                      </Link>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={4} className={classes.grid}>
                  {navbarUser}
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default withWidth()(Header);

Header.propTypes = {
  width: PropTypes.string,
};
