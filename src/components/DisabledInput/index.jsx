import React from "react";

const DisabledInput = ({ value, smallBox, greyborder }) => {
  return (
    <input
      disabled
      defaultValue={value}
      className={`border-[1px] p-3 w-full mb-5 ${
        greyborder ? "border-customGray-500" : "border-customBlack-700"
      } bg-white rounded-lg ${smallBox && "lg:w-[252px]"}`}
    />
  );
};

export default DisabledInput;
