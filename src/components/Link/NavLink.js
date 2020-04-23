import React from "react";
import { Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//PropTypes validation
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "#fff",
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

export default function NavLink({ href, children }) {
  return <Link href={href}>{children}</Link>;
}

NavLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.string,
};
