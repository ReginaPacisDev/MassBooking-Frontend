import Background from "../../components/Background";
import BookedBy from "../../components/BookedBy";
import ButtonSection from "../../components/ButtonSection";
import Intention from "../../components/Intention";

const InitialBooking = ({
  intention,
  canUseCurrentDate,
  bookedByDetails,
  handleIntentionInputChange,
  handleBookedByInputChange,
  handleDateChange,
  handleSave,
  handleCancel,
}) => {
  const { name, massIntention, startDate, endDate } = intention;

  const { bookedByName, email, phoneNumber } = bookedByDetails;

  return (
    <section className="pt-4 font-Museo lg:w-[50%] 2xl:w-[40%]">
      <Background />
      <h3 className="mt-5 text-xl lg:text-3xl mb-3 text-customBlack-200">
        Please fill this form to book mass
      </h3>

      <p className="text-sm lg:text-base text-customBlack-200">
        Ensure you fill the details correctly to avoid error when reading your
        mass intention.
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
        handleDateChange={handleDateChange}
        canUseCurrentDate={canUseCurrentDate}
      />

      <ButtonSection handleCancel={handleCancel} handleSave={handleSave} />
    </section>
  );
};

export default InitialBooking;
