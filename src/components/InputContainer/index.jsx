import React from "react";

const InputContainer = ({ error, children, halfWidth }) => {
  return (
    <div className={`mb-7 relative ${halfWidth && "lg:w-[45%]"}`}>
      {children}
      <p className="absolute text-xs text-red-500 pt-1">{error}</p>
    </div>
  );
};

export default InputContainer;
