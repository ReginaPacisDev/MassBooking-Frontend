import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

export const StyledTextField = styled(TextField)`
  font-family: Museo;
  width: 100%;

  & .MuiOutlinedInput-input {
    padding: 10px;
    padding-left: 0px;
    font-size: 16px;
  }

  & .MuiOutlinedInput-root {
    border-bottom: ${(props) =>
      props.addborderbottom ? "1px solid #424242" : ""};
    border: ${(props) => (props.addborder ? "1px solid #007464" : "")};
    border-radius: ${(props) => (props.addborder ? "8px" : "0px")};
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

  & .MuiFormLabel-root {
    color: #808080;

    &:focused {
      color: #808080;
    }
  }
`;
