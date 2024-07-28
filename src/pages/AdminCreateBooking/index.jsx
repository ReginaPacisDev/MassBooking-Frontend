import Box from "@mui/material/Box";

import AdminInitialBooking from "../../containers/AdminInitialBooking";
import Checkout from "../../containers/Checkout";
import { BookingController } from "../../controllers";

export default function AdminCreateBooking() {
  const {
    intention,
    canUseCurrentDate,
    intentions,
    bookedByDetails,
    handleIntentionInputChange,
    handleBookedByInputChange,
    handleDateChange,
    handleSave,
    handleReset,
    handleCancel,
    handleNext,
    setIntentions,
    activeStep,
    handleDeleteIntention,
    handleSundayDropdownChange,
    handleWeekdayDropdownChange,
  } = BookingController(true);

  return (
    <Box>
      <>
        {activeStep === 0 && (
          <AdminInitialBooking
            intention={intention}
            bookedByDetails={bookedByDetails}
            handleIntentionInputChange={handleIntentionInputChange}
            handleBookedByInputChange={handleBookedByInputChange}
            handleDateChange={handleDateChange}
            handleSave={handleSave}
            handleCancel={handleReset}
            canUseCurrentDate={canUseCurrentDate}
            handleSundayDropdownChange={handleSundayDropdownChange}
            handleWeekdayDropdownChange={handleWeekdayDropdownChange}
          />
        )}
        {activeStep === 1 && (
          <Checkout
            intention={intention}
            intentions={intentions}
            bookedByDetails={bookedByDetails}
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
            admin
          />
        )}
      </>
    </Box>
  );
}
