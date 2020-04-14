import React, {useState} from "react";
import {InputAdornment, TextField} from "@material-ui/core";
import PropTypes from 'prop-types';
import SearchIcon from "@material-ui/icons/Search";



export default function Search(props) {
  const [val, setVal] = useState('');

  const handleChange = (e) => {
    console.log(e.target.value);
    setVal(e.target.value);
  };

  const handleSearch = () => {
      props.handleSearch(val);
  };

  const InputCustomProps = {
    endAdornment: (
        <InputAdornment position="end">
          <SearchIcon style={{cursor: "pointer"}} onClick={handleSearch(val)}/>
        </InputAdornment>
    )
  };

  return <TextField
      label={props.label}
      placeholder={props.placeholder}
      type={props.type}
      onChange={handleChange}
      value={val}
      InputProps={InputCustomProps}/>;
}


Search.propTypes = {
  handleSearch: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};