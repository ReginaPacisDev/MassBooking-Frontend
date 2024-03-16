import React from "react";
import DisabledInput from "../DisabledInput";

const DisabledInputContainer = ({ label, value, fullwidth, bigText }) => {
  return (
    <div className={`${fullwidth ? "w-full" : "lg:w-[45%]"}`}>
      <p className="mb-2 font-Satoshi text-customBlack-900">{label}</p>
      {bigText ? (
        <textarea
          defaultValue={value}
          className="border-[1px] p-3 w-full mb-5 border-customGray-500 bg-white rounded-lg text-customBlack-800"
          rows={5}
          disabled
        />
      ) : (
        <DisabledInput value={value} greyborder />
      )}
    </div>
  );
};

export default DisabledInputContainer;
