import React from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core";
import PropTypes from 'prop-types';


const useStyles = makeStyles(() => ({
    input: {
        marginBottom: "1rem"
    }
}));


export default function CustomTextField(props) {
    const classes = useStyles();

    const handleOnChange = (e) => {
        props.handleInput(props.id, e.target.value);
    };
    return (
        <TextField
            autoFocus
            margin="dense"
            id={props.id}
            label={props.label}
            type="text"
            placeholder={props.placeholder}
            fullWidth
            required
            classes={{root: classes.input}}
            onChange={handleOnChange}
            defaultValue={props.defaultValue ? props.defaultValue : ""}
        />
    );
}

CustomTextField.propTypes = {
    defaultValue: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    handleInput: PropTypes.func
};