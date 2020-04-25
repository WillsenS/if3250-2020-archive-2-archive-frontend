import React from "react";
//PropTypes validation
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    zIndex: 1000,
    boxShadow: theme.shadows[2],
    borderRadius: "50%",
    color: "#fff",
    backgroundColor: "#175389",
    borderColor: "#175389",
    "&:hover": {
      backgroundColor: "#1565c0",
      borderColor: "#1565c0",
    },
    // Add admin panel button positioning here, because for some reason adding it on the parent component wasn't working
    position: "sticky",
    top: 10,
    right: 10,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default function NavButton(props) {
  const classes = useStyles();
  return (
    <IconButton
      aria-label="navigation"
      onClick={() => {
        props.handleClick(props.data);
      }}
      className={classes.button}
    >
      <MenuIcon />
    </IconButton>
  );
}

NavButton.propTypes = {
  data: PropTypes.object,
  handleClick: PropTypes.func,
};
