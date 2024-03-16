import React from "react";

import Line from "../Line";

const SectionHeader = ({ label, greyLine }) => {
  return (
    <div className="flex mb-5 items-center">
      <h6
        className={`text-base ${
          greyLine ? "text-customBlack-100" : "text-customBlack-200"
        }`}
      >
        {label}
      </h6>
      <Line />
    </div>
  );
};

export default SectionHeader;
