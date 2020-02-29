import React from "react";
import Container from "@material-ui/core/Container";
import Header from "../components/Header";
import Search from "../components/Search";
import theme from "../theme/index";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({}));

export default function SearchPage() {
  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <Container>
          <Search />
        </Container>
      </ThemeProvider>
    </>
  );
}
