import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/system";

export const StyledOutlinedInput = styled(OutlinedInput)`
  font-family: Satoshi;
  width: 100%;
  background: ${(props) => (props.addborder ? "inherit" : "#f8fafb")};
  border: ${(props) => (props.addborder ? "2px solid #DBE0E1" : "none")};

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  & .MuiOutlinedInput-input {
    padding: 15px;
  }
`;

export const StyledFormControl = styled(FormControl)`
  width: 100%;
`;

export const StyledFormHelperText = styled(FormHelperText)`
  margin-left: 0;
  font-size: 14px;
  color: #1d2e3d;
  font-family: Museo;
`;

const FormInput = ({
  label,
  error,
  value,
  password,
  inputId,
  handleInputChange,
  addborder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getInputAdornment = () => {
    if (password) {
      return (
        <InputAdornment position="end">
          <IconButton
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      );
    }

    return undefined;
  };

  const inputType = password ? (showPassword ? "text" : "password") : "text";

  return (
    <StyledFormControl variant="outlined">
      <StyledFormHelperText id={inputId}>{label}</StyledFormHelperText>

      <div className="w-full mb-7">
        <StyledOutlinedInput
          id={inputId}
          type={inputType}
          endAdornment={getInputAdornment()}
          value={value}
          name={inputId}
          onChange={handleInputChange}
          addborder={addborder ? "true" : ""}
        />
        <p className="absolute text-xs text-red-500 pt-1">{error}</p>
      </div>
    </StyledFormControl>
  );
};

export default FormInput;
