import React from "react";
import InputMultipleSelectChips from "./InputMultipleSelectChips";

import PropTypes from 'prop-types';


export default function DoubleMultiSelect(props) {

    return (
        <>
            <InputMultipleSelectChips
                id="accessRightsList"
                title={"Akses Keamanan Arsip"}
                data={props.accessData}
                slug={"hak-akses"}
                handleInput={props.handleInput}
                defaultValue={props.defaultValue}
            />

        </>


    );
}


DoubleMultiSelect.propTypes = {
    accessData: PropTypes.array,
    handleInput: PropTypes.func,
    editMode: PropTypes.bool,
    defaultValue: PropTypes.array

};