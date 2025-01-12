import Background from "../../components/Background";
import BookedBy from "../../components/BookedBy";
import ButtonSection from "../../components/ButtonSection";
import Intention from "../../components/Intention";

const InitialBooking = ({
  intention,
  minDate,
  bookedByDetails,
  handleIntentionInputChange,
  handleBookedByInputChange,
  handleDateChange,
  handleSave,
  handleCancel,
  handleSundayDropdownChange,
  handleWeekdayDropdownChange,
  handleTuesdayDropdownChange,
  handleSaturdayDropdownChange,
}) => {
  const {
    name,
    massIntention,
    startDate,
    endDate,
    sundayMassTime,
    weekdayMassTime,
    tuesdayMassTime,
    saturdayMassTime,
    textAreaIntention,
    showTextArea,
  } = intention;

  const { bookedByName, email, phoneNumber } = bookedByDetails;

  return (
    <section className="pt-4 font-Museo lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
      <Background />
      <h3 className="mt-5 text-xl lg:text-3xl mb-3 text-customBlack-200">
        Please fill this form to book Mass
      </h3>

      <p className="text-sm lg:text-base text-customBlack-200">
        Ensure you fill the details correctly to avoid error when reading your
        Mass intention.
      </p>

      <BookedBy
        bookedByName={bookedByName}
        email={email}
        phoneNumber={phoneNumber}
        handleChange={handleBookedByInputChange}
        mode="create"
        addMarginTop
      />

      <Intention
        name={name}
        handleChange={handleIntentionInputChange}
        massIntention={massIntention}
        startDate={startDate}
        endDate={endDate}
        sundayMassTime={sundayMassTime}
        weekdayMassTime={weekdayMassTime}
        tuesdayMassTime={tuesdayMassTime}
        saturdayMassTime={saturdayMassTime}
        handleDateChange={handleDateChange}
        minDate={minDate}
        handleSundayDropdownChange={handleSundayDropdownChange}
        handleWeekdayDropdownChange={handleWeekdayDropdownChange}
        handleTuesdayDropdownChange={handleTuesdayDropdownChange}
        handleSaturdayDropdownChange={handleSaturdayDropdownChange}
        textAreaIntention={textAreaIntention}
        showTextArea={showTextArea}
      />

      <ButtonSection handleCancel={handleCancel} handleSave={handleSave} />
    </section>
  );
};

export default InitialBooking;
