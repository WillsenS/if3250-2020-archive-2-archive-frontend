import React from "react";
import {
  makeStyles,
  ThemeProvider,
  withStyles
} from "@material-ui/core/styles";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Paper,
  Typography
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import theme from "../theme/index";

const useStyles = makeStyles(theme => ({
  formLabel: {
    color: theme.palette.common.darkGray
  },
  paper: {
    minWidth: "100%"
  },
  formControl: {
    margin: "10px",
    display: "block"
  },
  formControlLabel: {
    marginTop: "-10px"
  },
  header: {
    display: "inline-flex",
    marginBottom: "10px",
    width: "100%"
  },
  headerTitle: {
    display: "inline-block",
    margin: "auto 0"
  },
  icon: {
    marginLeft: "auto"
  },
  hidden: {
    display: "none"
  }
}));

const CustomCheckbox = withStyles({
  root: {
    color: theme.palette.common.yellow,
    "&$checked": {
      color: theme.palette.common.yellow
    }
  },
  checked: {}
})(props => <Checkbox size="medium" color="default" {...props} />);

const FilterSeach = props => {
  const classes = useStyles();
  const { filterCandidate, filter, setFilter, header, setHeader } = props;

  const handleChange = (key, val) => event => {
    if (event.target.checked) {
      filter[key] ? filter[key].push(val) : (filter[key] = [val]);
      setFilter({ ...filter });
    } else if (filter[key]) {
      const index = filter[key].indexOf(val);
      const obj = filter;

      if (index !== -1) {
        if (obj[key].length === 1) obj[key] = [];
        else obj[key].splice(index, 1);
        setFilter({ ...obj });
      }
    }
  };

  const handleHeaderClick = idx => {
    header[idx] = !header[idx];
    setHeader([...header]);
  };

  console.log(header);

  const filters = Object.keys(filterCandidate).map((key, idx) => (
    <Paper square key={`paper-${idx}`} className={classes.paper}>
      <FormControl component="fieldset" className={classes.formControl}>
        <div className={classes.header} onClick={() => handleHeaderClick(idx)}>
          <Typography variant="h4" className={classes.headerTitle}>
            {key}
          </Typography>
          {header[idx] ? (
            <KeyboardArrowUpIcon className={classes.icon} />
          ) : (
            <KeyboardArrowDownIcon className={classes.icon} />
          )}
        </div>
        <FormGroup className={header[idx] ? "" : classes.hidden}>
          {filterCandidate[key].map((val, idx) => {
            return (
              <FormControlLabel
                control={
                  <CustomCheckbox
                    checked={
                      filter[key] && filter[key].includes(val) ? true : false
                    }
                    onChange={handleChange(key, val)}
                    value={val || ""}
                  />
                }
                label={val}
                className={classes.formControlLabel}
                key={`formCOntrol-${key}-${idx}`}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </Paper>
  ));

  return <ThemeProvider theme={theme}>{filters}</ThemeProvider>;
};

export default FilterSeach;
