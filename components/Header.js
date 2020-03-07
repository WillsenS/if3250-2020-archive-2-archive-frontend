import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import theme from "../theme/index";
import { Box } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    marginLeft: "22px"
  },
  yellow: {
    color: theme.palette.warning.main
  },
  toolbar: {
    padding: "16px 0"
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Container>
            <Toolbar className={classes.toolbar}>
              <img
                src="./static/img/logo-itb.png"
                alt="logo ITB"
                width="72"
                height="72"
              />
              <Box className={classes.title}>
                <Box>
                  <Typography variant="h4" className={classes.yellow}>
                    SISTEM ARSIP
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4">
                    INSTITUT TEKNOLOGI BANDUNG
                  </Typography>
                </Box>
              </Box>
              <a color="inherit">
                <Typography variant="h5">LOGIN</Typography>
              </a>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
}

export default Header;
