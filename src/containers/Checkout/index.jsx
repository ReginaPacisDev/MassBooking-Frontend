import { useState } from "react";
import { useSnackbar } from "notistack";

import Intention from "../../components/Intention";
import ButtonSection from "../../components/ButtonSection";
import Accordion from "../../components/Accordion";
import { stringifySnackBarProps } from "../../helpers";

import Summary from "../Summary";
import PriceTable from "../../components/PriceTable";
import Background from "../../components/Background";

const Checkout = ({
  intention,
  intentions,
  bookedByDetails,
  handleIntentionInputChange,
  handleBookedByInputChange,
  handleDateChange,
  handleSave,
  handleCancel,
  handleNext,
  setIntentions,
  handleDeleteIntention,
  handleReset,
  handleSundayDropdownChange,
  handleWeekdayDropdownChange,
  admin,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [yesExpanded, setYesExpanded] = useState(false);
  const [noExpanded, setNoExpanded] = useState(false);

  const toggleExpanded = (type) => {
    if (type === "yes") {
      setYesExpanded((prev) => !prev);
    } else {
      setNoExpanded((prev) => !prev);
    }
  };

  const handleNewIntention = () => {
    const errorExists = handleSave();

    if (!errorExists) {
      setYesExpanded(false);
      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "info",
          message: "Intention Saved",
          title: "Info",
        })
      );
    }
  };

  const {
    name,
    startDate,
    endDate,
    massIntention,
    sundayMassTime,
    weekdayMassTime,
  } = intention;

  return (
    <div className="mt-5 pt-5 font-Museo">
      {!noExpanded && !admin && <Background />}
      <h3 className="text-lg lg:text-3xl mb-2 font-normal text-customBlack-200">
        Your Mass intention intention has been saved.
      </h3>
      <p className="text-xs lg:text-base">
        Before we proceed, would you like to book another intention?
      </p>

      <div className="mt-3 lg:mt-5 lg:pt-5">
        <div className="mb-10">
          <Accordion
            summary="Yes"
            expanded={yesExpanded}
            toggleExpanded={() => toggleExpanded("yes")}
          >
            <Intention
              name={name}
              handleChange={handleIntentionInputChange}
              massIntention={massIntention}
              startDate={startDate}
              endDate={endDate}
              sundayMassTime={sundayMassTime}
              weekdayMassTime={weekdayMassTime}
              handleDateChange={handleDateChange}
              handleSundayDropdownChange={handleSundayDropdownChange}
              handleWeekdayDropdownChange={handleWeekdayDropdownChange}
            />

            <ButtonSection
              handleCancel={handleCancel}
              handleSave={handleNewIntention}
            />
          </Accordion>
        </div>

        <Accordion
          summary="No"
          fullwidth
          expanded={noExpanded}
          toggleExpanded={toggleExpanded}
        >
          <Summary
            intentions={intentions}
            bookedBy={bookedByDetails}
            handleNext={handleNext}
            setIntentions={setIntentions}
            handleBookedByInputChange={handleBookedByInputChange}
            handleDeleteIntention={handleDeleteIntention}
            handleReset={handleReset}
            admin={Boolean(admin)}
          />
        </Accordion>
      </div>

      {noExpanded && (
        <div className="xl:absolute top-[100px] mb-5 right-[4%] w-full lg:w-[446px]">
          <PriceTable />
        </div>
      )}
    </div>
  );
};

export default Checkout;
