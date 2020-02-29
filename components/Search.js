import React from "react";
import theme from "../theme/index";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 600,
    marginTop: "48px",
    marginLeft: "auto",
    marginRight: "auto",
    borderBottom: "2px solid rgba(0,0,0,.4)",
    color: theme.palette.common.darkGray
  },
  input: {
    flex: 1
  },
  iconButton: {
    padding: 10,
    color: theme.palette.primary.main
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

export default function Search() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} component="form" className={classes.root}>
        <InputBase
          name="q"
          className={classes.input}
          placeholder="Cari Arsip"
        />
        <IconButton type="submit" className={classes.iconButton}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </ThemeProvider>
  );
}
