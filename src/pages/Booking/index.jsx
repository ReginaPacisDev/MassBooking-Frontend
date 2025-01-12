import Box from "@mui/material/Box";

import InitialBooking from "../../containers/InitialBooking";
import Checkout from "../../containers/Checkout";
import Confirmation from "../../containers/Confirmation";
import { BookingController } from "../../controllers";

export default function Booking() {
  const {
    intention,
    intentions,
    bookedByDetails,
    minDate,
    handleIntentionInputChange,
    handleBookedByInputChange,
    handleDateChange,
    handleSave,
    handleReset,
    handleCancel,
    handleNext,
    setIntentions,
    activeStep,
    setActiveStep,
    handleDeleteIntention,
    handleSundayDropdownChange,
    handleWeekdayDropdownChange,
    handleTuesdayDropdownChange,
    handleSaturdayDropdownChange,
  } = BookingController();

  return (
    <Box>
      <>
        {activeStep === 0 && (
          <InitialBooking
            intention={intention}
            bookedByDetails={bookedByDetails}
            handleIntentionInputChange={handleIntentionInputChange}
            handleBookedByInputChange={handleBookedByInputChange}
            handleDateChange={handleDateChange}
            handleSave={handleSave}
            handleCancel={handleReset}
            minDate={minDate}
            handleSundayDropdownChange={handleSundayDropdownChange}
            handleWeekdayDropdownChange={handleWeekdayDropdownChange}
            handleTuesdayDropdownChange={handleTuesdayDropdownChange}
            handleSaturdayDropdownChange={handleSaturdayDropdownChange}
          />
        )}
        {activeStep === 1 && (
          <Checkout
            intention={intention}
            intentions={intentions}
            bookedByDetails={bookedByDetails}
            minDate={minDate}
            handleIntentionInputChange={handleIntentionInputChange}
            handleBookedByInputChange={handleBookedByInputChange}
            handleDateChange={handleDateChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleNext={handleNext}
            setIntentions={setIntentions}
            handleDeleteIntention={handleDeleteIntention}
            handleReset={handleReset}
            handleSundayDropdownChange={handleSundayDropdownChange}
            handleWeekdayDropdownChange={handleWeekdayDropdownChange}
            handleTuesdayDropdownChange={handleTuesdayDropdownChange}
            handleSaturdayDropdownChange={handleSaturdayDropdownChange}
          />
        )}
        {activeStep === 2 && (
          <Confirmation resetStepper={() => setActiveStep(0)} />
        )}
      </>
    </Box>
  );
}
