import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';

export default function CustomRadio(props) {

    const handleChange = (event) => {
        props.handleInput(props.id, parseInt(event.target.value));
    };
    return (
        <FormControl component="fieldset" style={{marginTop: '2rem'}}>
            <FormLabel component="legend">{props.label}</FormLabel>
            <RadioGroup aria-label="terbuka-untuk-umum" name="opsi-terbuka-untuk-umum" value={props.value} onChange={handleChange}>
                <FormControlLabel value={1} control={<Radio />} label="Ya" />
                <FormControlLabel value={0} control={<Radio />} label="Tidak" />
            </RadioGroup>
        </FormControl>
    );
}

CustomRadio.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    handleInput: PropTypes.func,
    value: PropTypes.number
};