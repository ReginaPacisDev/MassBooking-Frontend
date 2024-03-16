import React from "react";
import UpArrow from "../../../../assets/images/upArrow.svg";

const BottomSection = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="border-t-[1px] border-customGray-200">
      <div className="py-5 font-Museo lg:flex lg:justify-between lg:items-center lg:w-[90%] lg:mx-auto">
        <p className="text-center lg:text-left text-base text-customBlack-400">
          All rights reserved. © 2022 ReginaPacis.
        </p>

        <button className="hidden lg:flex items-center" onClick={handleClick}>
          <p className="text-sm text-customBlack-400 mr-5">Back to Top</p>
          <img src={UpArrow} alt="Back to Top" className="w-[50px] h-[50px]" />
        </button>
      </div>
    </div>
  );
};

export default BottomSection;
