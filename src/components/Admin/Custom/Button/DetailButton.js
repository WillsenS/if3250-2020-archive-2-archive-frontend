import React from "react";
import FindInPageIcon from "@material-ui/icons/FindInPage";
//PropTypes validation
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";

export default function DetailButton(props) {
    return (
        <IconButton aria-label="archive detail" size="small" color="primary" onClick={() => {
            props.handleClick(props.data)
        }} style={{margin: "0 .5rem"}}>
            <FindInPageIcon/>
        </IconButton>
    );
}

DetailButton.propTypes = {
    data: PropTypes.object,
    handleClick: PropTypes.func
};