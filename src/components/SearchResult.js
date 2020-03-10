import React from "react";
import theme from "../theme/index";
import { Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { defaultPublicURL } from "../../config";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "18px"
  },
  title: {
    color: theme.palette.primary.light
  },
  subtitle: {
    color: theme.palette.common.yellow
  },
  frame: {
    width: "100%"
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
    objectFit: "contain"
  }
}));

const SearchResult = props => {
  const { title, code, description, image } = props;

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} className={classes.root}>
        <Grid container spacing={2}>
          <Grid item lg={2} xs={3}>
            <div className={classes.frame}>
              <img
                className={classes.image}
                src={`${defaultPublicURL}${image}`}
              />
            </div>
          </Grid>
          <Grid item lg={10} xs={9}>
            <Typography variant="h4" className={classes.title}>
              {title}
            </Typography>
            <Typography variant="h4" className={classes.subtitle}>
              {code}
            </Typography>
            <Typography variant="body1">{description}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

export default SearchResult;
