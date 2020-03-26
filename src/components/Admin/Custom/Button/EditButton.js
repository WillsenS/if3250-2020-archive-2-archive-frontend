import React from "react";
import EditIcon from "@material-ui/icons/Edit";

//PropTypes validation
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";

export default function EditButton(props) {
    return (
        <IconButton
            aria-label="archive edit"
            color="default"
            size="small"
            onClick={() => {
            props.handleClick(props.data)
        }}
            style={{margin: "0 .5rem"}}
        >
            <EditIcon/>
        </IconButton>
    );
}


EditButton.propTypes = {
    data: PropTypes.object,
    handleClick: PropTypes.func
};