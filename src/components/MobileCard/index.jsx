import React from "react";
import { formatTime, numberWithCommas } from "../../helpers";

const MobileCard = ({
  bookedBy,
  startDate,
  endDate,
  amountPaid,
  handleClick,
}) => {
  return (
    <div className="relative w-full bg-white block lg:hidden p-4 rounded-xl mb-4 font-Satoshi text-customBlack-200">
      <button
        className="absolute top-[20px] right-[15px]"
        onClick={handleClick}
      >
        <p className="text-xs text-customGreen-100 font-semibold">View</p>
      </button>
      <div>
        <h4 className="text-xs text-customGreen-100">Name</h4>
        <p>{bookedBy}</p>
      </div>
      <div className="flex mt-3 justify-between items-center">
        <p>{`₦ ${numberWithCommas(amountPaid)}`}</p>
        <p className="text-xs">{`${formatTime(startDate)} - ${formatTime(
          endDate
        )}`}</p>
      </div>
    </div>
  );
};

export default MobileCard;
