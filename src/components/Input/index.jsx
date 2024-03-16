import React from "react";

import { StyledTextField } from "./style";

const Input = ({
  type,
  value,
  handleChange,
  placeholder,
  name,
  addborderbottom,
  addborder,
}) => {
  return (
    <StyledTextField
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      name={name}
      required
      addborderbottom={addborderbottom ? "true" : ""}
      addborder={addborder ? "true" : ""}
    />
  );
};

export default Input;
