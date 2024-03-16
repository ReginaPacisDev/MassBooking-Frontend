import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/system";

export const StyledDropdown = styled(Select)`
  font-family: Museo;
  width: 100%;

  & .MuiOutlinedInput-input {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 16px;
    background: #fff;
    border-radius: 8px;
    padding-left: 15px;
    padding-right: 15px;
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
`;

const Dropdown = ({ dropdownItems, selectedValue, handleDropdownChange }) => {
  return (
    <StyledDropdown
      value={selectedValue}
      displayEmpty
      onChange={handleDropdownChange}
    >
      <MenuItem value="" disabled>Select A Period</MenuItem>
      {dropdownItems.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </StyledDropdown>
  );
};

export default Dropdown;
