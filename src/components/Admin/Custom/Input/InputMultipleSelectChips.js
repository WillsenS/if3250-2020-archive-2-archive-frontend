import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";

import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: "1rem 0",
        minWidth: "100%",
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));


function getStyles(name, data, theme) {
    return {
        fontWeight:
            data.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


export default function InputMultipleSelectChips(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [data, setData] = React.useState([]);

    const handleChange = (event) => {
        setData(event.target.value);
        props.handleInput(props.id, event.target.value);
    };

    return (


        <FormControl className={classes.formControl}>
            <InputLabel id={`${props.slug}-arsip`}>{props.title}</InputLabel>
            <Select
                labelId={`select-${props.slug}`}
                id={`select-${props.slug}`}
                multiple
                value={data}
                onChange={handleChange}
                input={<Input id={`${props.slug}`}/>}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={props.data[value - 1].nama} className={classes.chip}/>
                        ))}
                    </div>
                )}
            >
                {/*ID dan Nama adalah object properti dari data */}
                {props.data.map((item) => (
                    <MenuItem key={item.id} value={item.id} style={getStyles(item.nama, data, theme)}>
                        {item.nama}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    );
}


InputMultipleSelectChips.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.array,
    slug: PropTypes.string,
    handleInput: PropTypes.func
};