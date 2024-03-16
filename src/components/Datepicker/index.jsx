import * as React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import DatePickerIcon from "./DatepickerIcon";
import { StyledTextField } from "../Input/style";

const DatePicker = ({
  handleChange,
  value,
  placeholder,
  minDate,
  disabled,
  addborderbottom,
  addBorder,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DesktopDatePicker
        openTo="day"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            inputProps={{
              ...params.inputProps,
              placeholder,
            }}
            addborderbottom={addborderbottom}
            addborder={addBorder}
          />
        )}
        inputFormat="MM-DD-YYYY"
        components={{
          OpenPickerIcon: DatePickerIcon,
        }}
        InputAdornmentProps={{ position: "start" }}
        minDate={minDate}
        className="w-full border-b border-black"
        disabled={disabled}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
