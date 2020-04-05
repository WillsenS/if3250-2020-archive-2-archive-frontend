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
                handleInput={props.handleInput}/>
            {
                props.showWorkUnitForm ? (
                    <InputMultipleSelectChips
                        id="accessRightsForWorkUnit"
                        title={"Akses Unit Kerja"}
                        data={props.workUnitData}
                        slug={"hak-akses-unit-kerja"}
                        handleInput={props.handleInput}/>
                ) : (<></>)
            }
        </>


    );
}


DoubleMultiSelect.propTypes = {
    accessData: PropTypes.array,
    workUnitData: PropTypes.array,
    showWorkUnitForm: PropTypes.bool,
    handleInput: PropTypes.func
};