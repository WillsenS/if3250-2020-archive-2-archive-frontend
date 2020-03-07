import React from "react";
import { useState } from "react";
import { Paper, InputBase, IconButton, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import theme from "../theme/index";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0 auto"
  },
  form: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    color: theme.palette.common.darkGray
  },
  input: {
    flex: 1,
    borderBottom: "2px solid rgba(0,0,0,.4)",
    borderRadius: "0"
  },
  inputFocused: {
    borderBottom: "2px solid #175389"
  },
  iconButton: {
    marginLeft: "12px",
    padding: "10px",
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main
    }
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

const Search = props => {
  const classes = useStyles();
  const { value, setValue, setIsSearch, setFilter, setHeader } = props;
  const [searchQuery, setSearchQUery] = useState(value);

  const onChangeSearch = event => {
    setSearchQUery(event.target.value);
  };

  const onSubmitForm = event => {
    const obj = {};
    const header = [];

    setFilter({ ...obj });
    setHeader([...header]);
    setIsSearch(true);
    setValue(searchQuery);
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0}>
        <Grid item lg={6} xs={12} className={classes.root}>
          <Paper
            elevation={0}
            component="form"
            className={classes.form}
            onSubmit={onSubmitForm}
          >
            <InputBase
              name="q"
              className={classes.input}
              classes={{ focused: classes.inputFocused }}
              placeholder="Cari Arsip"
              value={searchQuery}
              onChange={onChangeSearch}
            />
            <IconButton type="submit" className={classes.iconButton}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Search;
