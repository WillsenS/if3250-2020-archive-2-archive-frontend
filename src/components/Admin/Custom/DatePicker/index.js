import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
//PropTypes validation
import PropTypes from "prop-types";

export default function DatePicker(props) {
  const [selectedDate, setSelectedDate] = React.useState(
    props.defaultDateObj || new Date()
  );

  const { label } = props;

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const timeRemovedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).toLocaleDateString();
    props.handleInput(props.id, timeRemovedDate); //not using selectedDate because async
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id={props.id}
        label={label}
        format="MM/dd/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

DatePicker.propTypes = {
  // defaultDateObj: PropTypes.instanceOf(Date),
  id: PropTypes.string,
  handleInput: PropTypes.func,
};
