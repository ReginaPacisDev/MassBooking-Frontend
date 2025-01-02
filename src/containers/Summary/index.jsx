import { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";

import SectionHeader from "../../components/SectionHeader";
import DisabledInput from "../../components/DisabledInput";
import SummaryItem from "../../components/SummaryItem";
import PaystackIcon from "../../assets/images/paystack.svg";
import BookedBy from "../../components/BookedBy";
import { SummaryController } from "../../controllers";
import Loader from "../../components/Loader";
import {
  getTotalPrice,
  getPaystackTotal,
  numberWithCommas,
} from "../../helpers";

const Summary = ({
  intentions,
  bookedBy,
  canUseNextDayDate,
  setIntentions,
  handleNext,
  handleBookedByInputChange,
  handleDeleteIntention,
  admin,
  handleReset,
}) => {
  const {
    handleDateChange,
    handleIntentionInputChange,
    triggerPaymentModal,
    handleSuccess,
    openLoader,
    handleSundayDropdownChange,
    handleWeekdayDropdownChange,
    handleTuesdayDropdownChange,
    handleSaturdayDropdownChange,
  } = SummaryController({
    intentions,
    bookedBy,
    setIntentions,
    handleNext,
    handleReset,
    admin,
  });

  const [errorExists, setErrorExists] = useState(false);

  const totalPriceBase = getTotalPrice(intentions);
  const payStackTotal = getPaystackTotal(totalPriceBase);
  const displayedPrice = admin ? totalPriceBase : payStackTotal;

  useEffect(() => {
    setErrorExists(false);

    if (intentions && intentions.length > 0) {
      const intentionKeys = Object.keys(intentions[0]);

      for (const intention of intentions) {
        for (const key of intentionKeys) {
          if (intention[key].error) {
            setErrorExists(true);
          }
        }
      }
    }

    if (bookedBy) {
      const bookedByKeys = Object.keys(bookedBy);

      for (const key of bookedByKeys) {
        if (bookedBy[key].error) {
          setErrorExists(true);
        }
      }
    }
  }, [bookedBy, intentions]);

  return (
    <div className="mt-4">
      <Loader open={openLoader} />
      <>
        <SectionHeader label="SUMMARY" />

        <div className="w-full xl:w-[48%]">
          <BookedBy
            bookedByName={bookedBy.bookedByName}
            handleChange={handleBookedByInputChange}
            email={bookedBy.email}
            phoneNumber={bookedBy.phoneNumber}
            mode="update"
          />
        </div>

        <div className="mt-3">
          <SectionHeader label="Masses Booked" greyLine />
        </div>

        <div className="mt-3">
          <DisabledInput value={intentions.length} smallBox />
        </div>

        <div className="my-3">
          <SectionHeader label="Please check your intentions and edit where necessary" />
        </div>

        <div className="flex flex-wrap justify-between">
          {intentions.map((intention, index) => (
            <SummaryItem
              intention={intention}
              handleDateChange={handleDateChange}
              handleInputChange={handleIntentionInputChange}
              key={intention.id}
              index={index}
              handleDeleteIntention={handleDeleteIntention}
              intentions={intentions}
              canUseNextDayDate={canUseNextDayDate}
              handleSundayDropdownChange={handleSundayDropdownChange}
              handleWeekdayDropdownChange={handleWeekdayDropdownChange}
              handleTuesdayDropdownChange={handleTuesdayDropdownChange}
              handleSaturdayDropdownChange={handleSaturdayDropdownChange}
            />
          ))}
        </div>

        <div
          className={`${intentions.length > 1 ? "w-full" : "xl:w-[48%]"} py-4`}
        >
          <SectionHeader label={`Total${admin ? "" : " + Bank Charges"}`} />
          <DisabledInput value={`₦ ${numberWithCommas(displayedPrice)}`} />
        </div>

        <Tooltip
          title={errorExists ? "Please resolve all errors to continue" : ""}
          placement="top"
        >
          {admin ? (
            <button
              onClick={handleSuccess}
              disabled={errorExists}
              className="mb-8 bg-customBlue-100 p-3 text-white text-base rounded-lg"
            >
              Book Mass
            </button>
          ) : (
            <button
              onClick={triggerPaymentModal}
              disabled={errorExists}
              className="mb-8 bg-customBlue-100 p-3 text-white text-base rounded-lg"
            >
              Pay Now
            </button>
          )}
        </Tooltip>

        {!admin && (
          <div className="mb-5">
            <SectionHeader label="PAYMENT METHOD" />

            <div className="flex text-left items-center border-[1px] p-3 w-full xl:w-[48%] mb-4 border-customBlack-700 rounded-lg">
              <img src={PaystackIcon} alt="Pay Stack Icon" />
              <div className="ml-3">
                <h6 className="text-lg">Paystack</h6>
                <p className="text-sm text-customBlack-200 font-light">
                  We do not store your payment details
                </p>
              </div>
            </div>
            <p className="text-sm font-light">
              We protect your payment information using encryption to provide
              bank-level security
            </p>
          </div>
        )}
      </>
    </div>
  );
};

export default Summary;
