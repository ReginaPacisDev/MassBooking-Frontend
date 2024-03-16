import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

import SearchBarIcon from "./SearchBarIcon";

export const StyledTextField = styled(TextField)`
  font-family: Museo;
  width: 100%;

  & .MuiOutlinedInput-input {
    padding: 10px;
    padding-left: 0px;
    font-size: 16px;
  }

  & .MuiOutlinedInput-root {
    border: 1px solid #A5ADBA;
    border-radius: 8px;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  & .MuiButtonBase-root {
    padding: 0;
    margin: 0;
    padding-top: 4px;

    &:hover {
      background: none;
    }
  }

  & .MuiSvgIcon-root {
    width: 20px;
    height: 20px;
    margin: 0;
    margin-top: 5px;
  }

  & .MuiFormLabel-root {
    color: #808080;

    &:focused {
      color: #808080;
    }
  }
`;

const SearchBar = ({ handleChange, value }) => {
  return (
    <StyledTextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchBarIcon />
          </InputAdornment>
        ),
      }}
      onChange={handleChange}
      value={value}
      placeholder="Search by name"
    />
  );
};

export default SearchBar;
