import { useState } from "react";
import moment from "moment-timezone";

import {
  createBookedBy,
  createIntention,
  validateInputs,
  TIMEZONE,
} from "../helpers";
import { useInterval } from "../hooks";

export const BookingController = (admin) => {
  const [activeStep, setActiveStep] = useState(0);

  const [intentions, setIntentions] = useState([]);

  const [bookedByDetails, setBookedByDetails] = useState(createBookedBy());

  const [intention, setIntention] = useState(createIntention());

  const [minDate, setMinDate] = useState(
    moment().utc().tz(TIMEZONE).add(1, "days").toDate()
  );

  const handleIntentionInputChange = (e) => {
    let { name, value } = e.target;

    let updatedIntention = { ...intention, [name]: { value, error: "" } };

    if (name === "massIntention" && value === "Others (please state)") {
      updatedIntention = { ...updatedIntention, showTextArea: true };
    }

    if (name === "massIntention" && value !== "Others (please state)") {
      updatedIntention = {
        ...updatedIntention,
        showTextArea: false,
        textAreaIntention: { value: "", error: "" },
      };
    }

    setIntention(updatedIntention);
  };

  const handleBookedByInputChange = (e) => {
    const { name, value } = e.target;

    const updatedDetails = { ...bookedByDetails, [name]: { value, error: "" } };
    setBookedByDetails(updatedDetails);
  };

  const handleDateChange = (type) => (newDate) => {
    const normalizedDate = newDate.utc().tz(TIMEZONE);
    const updatedIntention = {
      ...intention,
    };

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

  const handleTuesdayDropdownChange = (e) => {
    const { value } = e.target;

    const updatedIntention = {
      ...intention,
      tuesdayMassTime: {
        value,
        error: "",
      },
    };

    setIntention(updatedIntention);
  };

  const handleSaturdayDropdownChange = (e) => {
    const { value } = e.target;

    const updatedIntention = {
      ...intention,
      saturdayMassTime: {
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
    const currentTime = moment().tz(TIMEZONE);
    const currentDay = currentTime.day();
    const currentTimeInMinutes =
      currentTime.hours() * 60 + currentTime.minutes();
    const cutOffTimeInMinutes = 14 * 60;

    const cannotBookMass = currentTimeInMinutes > cutOffTimeInMinutes;

    const dayOffsets = {
      0: 2,
      1: cannotBookMass ? 2 : 1,
      2: cannotBookMass ? 2 : 1,
      3: cannotBookMass ? 3 : 1,
      4: 2,
      5: cannotBookMass ? 4 : 1,
      6: 3,
    };

    const daysToAdd = dayOffsets[currentDay];

    const minimumDate = currentTime
      .clone()
      .add(daysToAdd, "days")
      .startOf("day")
      .toDate();

    setMinDate(minimumDate);
  }, 1000);

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
    handleDeleteIntention,
    handleSundayDropdownChange,
    handleWeekdayDropdownChange,
    handleTuesdayDropdownChange,
    handleSaturdayDropdownChange,
    minDate,
  };
};
