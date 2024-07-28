import { numberWithCommas } from "../../helpers";
import Circle from "../Circle";

const PaymentStat = ({
  bookedBy,
  amountPaid,
  numberOfIntentions,
  createdBy,
}) => {
  return (
    <div className="lg:w-[30%] bg-white rounded-lg p-5 font-Satoshi mb-10 relative">
      <Circle type={createdBy} />
      <h3 className="text-xl font-bold mb-4">{bookedBy}</h3>
      <div className="flex justify-between">
        <p className="font-light">{`Booked ${numberOfIntentions} intention${
          numberOfIntentions > 1 ? "s" : ""
        }`}</p>
        <h2 className="text-customGreen-100 font-bold text-lg">
          ₦ {numberWithCommas(Math.floor(amountPaid))}
        </h2>
      </div>
    </div>
  );
};

export default PaymentStat;
