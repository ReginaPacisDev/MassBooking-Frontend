import React from "react";
import RightArrow from "../../assets/images/rightArrow.svg";

const ButtonSection = ({ handleCancel, handleSave }) => {
  return (
    <div className="flex items-center lg:justify-end lg:py-2">
      <button
        onClick={handleCancel}
        className="rounded-lg border-[1px] border-customGreen-100 py-2 px-3 text-customGreen-100 text-base mr-6"
      >
        Cancel
      </button>
      <button
        onClick={handleSave}
        className="flex rounded-lg bg-customGreen-100 py-2 px-3 text-base items-center"
      >
        <p className="text-white mr-3">Save</p>
        <img
          src={RightArrow}
          alt="right-arrow"
          className="w-[9.33px] h-[9.33px]"
        />
      </button>
    </div>
  );
};

export default ButtonSection;
