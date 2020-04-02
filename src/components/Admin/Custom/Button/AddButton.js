import React from "react";
import {Button, makeStyles} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
//PropTypes validation
import PropTypes from 'prop-types';


const useStyles = makeStyles(theme => ({
    button: {
        marginLeft: "1rem",
        color: theme.palette.getContrastText("#1aaa55"),
        backgroundColor: "#1aaa55",
        borderColor: "#168f48",
        "&:hover": {
            backgroundColor: "#168f48",
            borderColor: "#12753a"
        }
    }
}));

export default function AddButton(props) {
    const classes = useStyles();
    return (
        <Button
            startIcon={<AddIcon/>}
            variant="contained"
            color="primary"
            disableElevation
            className={classes.button}
            onClick={props.handleClick}
        >
            {props.children}
        </Button>
    );
}

AddButton.propTypes = {
    children: PropTypes.string,
    handleClick: PropTypes.func
};
