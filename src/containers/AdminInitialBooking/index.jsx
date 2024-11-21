import BookedBy from "../../components/BookedBy";
import ButtonSection from "../../components/ButtonSection";
import Intention from "../../components/Intention";

const AdminInitialBooking = ({
  intention,
  canUseNextDayDate,
  bookedByDetails,
  handleIntentionInputChange,
  handleBookedByInputChange,
  handleDateChange,
  handleSave,
  handleCancel,
  handleSundayDropdownChange,
  handleWeekdayDropdownChange,
}) => {
  const {
    name,
    massIntention,
    startDate,
    endDate,
    sundayMassTime,
    weekdayMassTime,
    textAreaIntention,
    showTextArea,
  } = intention;

  const { bookedByName, email, phoneNumber } = bookedByDetails;

  return (
    <section className="font-Museo lg:w-[700px] lg:pl-10 mt-[-30px]">
      <BookedBy
        bookedByName={bookedByName}
        email={email}
        phoneNumber={phoneNumber}
        handleChange={handleBookedByInputChange}
        mode="create"
        sectionHeader="REQUESTER INFORMATION"
      />

      <Intention
        name={name}
        handleChange={handleIntentionInputChange}
        massIntention={massIntention}
        startDate={startDate}
        endDate={endDate}
        handleDateChange={handleDateChange}
        textAreaPlaceholder="Write the prayer request *"
        canUseNextDayDate={canUseNextDayDate}
        sundayMassTime={sundayMassTime}
        weekdayMassTime={weekdayMassTime}
        textAreaIntention={textAreaIntention}
        handleSundayDropdownChange={handleSundayDropdownChange}
        handleWeekdayDropdownChange={handleWeekdayDropdownChange}
        showTextArea={showTextArea}
      />

      <ButtonSection handleCancel={handleCancel} handleSave={handleSave} />
    </section>
  );
};

export default AdminInitialBooking;
