import { useState } from "react";
import moment from "moment";

import { createBookedBy, createIntention, validateInputs } from "../helpers";
import { useInterval } from "../hooks";

export const BookingController = (admin) => {
  const [activeStep, setActiveStep] = useState(0);

  const [intentions, setIntentions] = useState([]);

  const [bookedByDetails, setBookedByDetails] = useState(createBookedBy());

  const [intention, setIntention] = useState(createIntention());

  const [canUseCurrentDate, setCanUseCurrentDate] = useState(true);

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

  const handleSundayDropdownChange = (e) => {
    const { value } = e.target;

    const updatedIntention = {
      ...intention,
      sundayMassTime: {
        value,
        error: "",
      },
    };

    setIntention(updatedIntention);
  };

  const handleWeekdayDropdownChange = (e) => {
    const { value } = e.target;

    const updatedIntention = {
      ...intention,
      weekdayMassTime: {
        value,
        error: "",
      },
    };

    setIntention(updatedIntention);
  };

  const handleNext = () => {
    if (admin && activeStep === 1) {
      setActiveStep(0);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleUpdateIntentions = (intention) => {
    const existingIntentions = [...intentions, intention];

    setIntentions(existingIntentions);
  };

  const handleDeleteIntention = (id) => {
    setIntentions(
      intentions.filter((currIntention) => currIntention.id !== id)
    );
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
    setIntention(createIntention());
  };

  const handleReset = () => {
    handleCancel();
    setBookedByDetails(createBookedBy());
    setIntentions([]);
  };

  useInterval(() => {
    const currentTime = moment();

    if (currentTime.isAfter(moment("14:00:00", "HH:mm:ss"))) {
      setCanUseCurrentDate(false);
    }
  }, 1000);

  return {
    intention,
    canUseCurrentDate,
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
    handleDeleteIntention,
    handleSundayDropdownChange,
    handleWeekdayDropdownChange,
  };
};
