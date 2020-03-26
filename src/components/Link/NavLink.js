import React from "react";
import Link from 'next/link'
import {makeStyles} from "@material-ui/core/styles";
//PropTypes validation
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
    link: {
        textDecoration: "none",
        color: "#fff",
        "&:hover": {
            textDecoration: "none"
        }
    }
}));

export default function NavLink({href, children}) {
    // Must add passHref to Link
    //Reference: https://nextjs.org/docs/api-reference/next/link
    const classes = useStyles();
    return (
        <Link href={href} passHref>
            <a className={classes.link}>{children}</a>
        </Link>
    )
}


NavLink.propTypes = {
    href: PropTypes.string,
    children: PropTypes.string
};