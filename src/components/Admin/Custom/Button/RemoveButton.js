import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";


export default function RemoveButton(props) {
    const {handleClick, data} = props;
    return (
        <IconButton
            size="small"
            aria-label="archive remove"
            style={{margin: "0 .5rem", color: "#cb2431"}}
            onClick={() => {
                handleClick(data)
            }}
        >
            <DeleteIcon/>
        </IconButton>
    );
}


RemoveButton.propTypes = {
    handleClick: PropTypes.func,
    data: PropTypes.object
};