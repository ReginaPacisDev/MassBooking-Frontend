export const useBooking = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [intentions, setIntentions] = useState([]);

  const [bookedByDetails, setBookedByDetails] = useState(...createBookedBy());

  const [intention, setIntention] = useState(...createIntention());

  const handleIntentionInputChange = (e) => {
    const { name, value } = e.target;

    const updatedIntention = { ...intention, [name]: { value, error: "" } };
    setIntention(updatedIntention);
  };

  const handleBookedByInputChange = (e) => {
    const { name, value } = e.target;

    const updatedDetails = { ...bookedByDetails, [name]: { value, error: "" } };
    setBookedByDetails(updatedDetails);
  };

  const handleDateChange = (type) => (newDate) => {
    const normalizedDate = newDate.utc(true);
    const updatedIntention = { ...intention };

    if (type === "startDate") {
      updatedIntention.startDate.value = normalizedDate;
      updatedIntention.startDate.error = "";
    } else {
      updatedIntention.endDate.value = normalizedDate;
      updatedIntention.endDate.error = "";
    }

    setIntention(updatedIntention);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleUpdateIntentions = (intention) => {
    const existingIntentions = [...intentions, intention];

    setIntentions(existingIntentions);
  };

  const handleSave = () => {
    const { updatedIntention, errorExists } = validateInputs(intention);

    if (errorExists) {
      setIntention(updatedIntention);

      return errorExists;
    }

    handleUpdateIntentions(intention);

    handleCancel();

    if (activeStep === 0) {
      handleNext();
    }
  };

  const handleCancel = () => {
    setIntention(...createIntention());
  };

  const handleReset = () => {
    handleCancel();
    setBookedByDetails(...createBookedBy());
    setIntentions([]);
  };

  return {
    intention,
    bookedByDetails,
    handleIntentionInputChange,
    handleBookedByInputChange,
    handleDateChange,
    handleSave,
    handleCancel,
    handleReset,
    activeStep,
    setActiveStep,
    intentions,
    setIntentions,
    handleNext,
  };
};
