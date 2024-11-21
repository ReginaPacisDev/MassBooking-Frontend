import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/system";

export const StyledDropdown = styled(Select)`
  font-family: Museo;
  width: 100%;

  & .MuiOutlinedInput-input {
    padding: 10px;
    padding-left: 0px;
    font-size: 16px;
    border-radius: 0px !important;
    color: #808080;
    border-bottom: 1px solid #424242;
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
  }
`;

const InputSelect = ({
  dropdownItems,
  selectedValue,
  handleDropdownChange,
  placeholder,
  name,
}) => {
  return (
    <StyledDropdown
      value={selectedValue}
      displayEmpty
      onChange={handleDropdownChange}
      name={name}
    >
      <MenuItem value="" disabled>
        {placeholder}
      </MenuItem>

      {dropdownItems.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </StyledDropdown>
  );
};

export default InputSelect;
