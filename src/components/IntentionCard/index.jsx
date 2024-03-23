import moment from "moment";

import { formatTime } from "../../helpers";
import Calendar from "../../assets/images/calendar.svg";

const generateIntentionOrTruncate = (intention) => {
  return intention.length > 100 ? `${intention.slice(0, 99)}...` : intention;
};

const IntentionCard = ({ name, startDate, massIntention, createdAt }) => {
  return (
    <div className="border border-customGray-600 rounded-lg p-3 mb-5">
      <div className="flex justify-between mb-3">
        <h5 className="text-customBlack-200 text-base font-Museo">{name}</h5>
        <p className="text-customBlack-400 text-sm font-Satoshi font-light">
          {moment(createdAt).fromNow()}
        </p>
      </div>
      <span className="text-sm font-light font-Satoshi text-customBlack-200 px-2 py-1 mb-3 bg-customPink-100 rounded-xl">{`Scheduled to be read on ${formatTime(
        startDate
      )}`}</span>
      <div className="mb-3 mt-3">
        <p className="font-Satoshi text-customBlack-200 font-light text-base">
          {generateIntentionOrTruncate(massIntention)}
        </p>
      </div>
      <div className="flex items-center">
        <img src={Calendar} alt="calendar" />
        <p className="font-Satoshi text-customBlack-200 font-light text-sm ml-3">
          {formatTime(createdAt)}
        </p>
      </div>
    </div>
  );
};

export default IntentionCard;
