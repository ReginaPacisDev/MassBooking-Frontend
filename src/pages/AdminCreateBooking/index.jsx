import Box from "@mui/material/Box";

import InitialBooking from "../../containers/AdminInitialBooking";
import Checkout from "../../containers/Checkout";
import { BookingController } from "../../controllers";

export default function AdminCreateBooking() {
  const {
    intention,
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
  } = BookingController(true);

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
            admin
          />
        )}
      </>
    </Box>
  );
}
