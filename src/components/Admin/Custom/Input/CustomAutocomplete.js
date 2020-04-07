import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

//PropTypes validation
import PropTypes from 'prop-types';


export default function CustomAutocomplete(props) {

    const handleChange = (event, val) => {
        props.handleAutoComplete(props.id, val);
    };

    return (
        <Autocomplete
            //Get the selected classification pattern, for example DD.00.00.01
            id={props.id}
            value={props.value}
            options={props.classificationList}
            getOptionLabel={(option) => option.kode ? `${option.kode} ${option.nama}` : ''}
            renderInput={(params) => <TextField {...params} label={props.label}/>}
            onChange={(event, value) => {
                handleChange(event, value);
            }}
            onInputChange={(event, value, reason) => {
                if (reason === 'clear') {
                    props.handleAutoComplete(props.id, null);
                }
            }}
        />
    );
}

CustomAutocomplete.propTypes = {
    id: PropTypes.string,
    classificationList: PropTypes.array,
    handleAutoComplete: PropTypes.func,
    value: PropTypes.object,
    label: PropTypes.string
};