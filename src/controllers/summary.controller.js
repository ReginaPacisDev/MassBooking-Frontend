import axios from "axios";
import moment from "moment-timezone";
import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";

import {
  getErrorMessage,
  getOffering,
  stringifySnackBarProps,
  getTotalPrice,
  getPaystackTotal,
  TIMEZONE,
  weekdayExists,
  sundayExists,
  tuesdayExists,
  saturdayExists,
} from "../helpers";
import { setSuccessResponseData } from "../store/bookings/slice";

export const SummaryController = ({
  intentions,
  bookedBy,
  setIntentions,
  handleNext,
  handleReset,
  admin,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const [openLoader, setOpenLoader] = useState(false);

  const handleIntentionInputChange = (id) => (e) => {
    const { name, value } = e.target;

    const intentionsCopy = [...intentions];

    const index = intentionsCopy.findIndex((intention) => intention.id === id);

    const foundIntention = intentionsCopy[index];

    let updatedIntention = {
      ...foundIntention,
      [name]: { value, error: "" },
    };

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

    intentionsCopy[index] = updatedIntention;

    setIntentions(intentionsCopy);
  };

  const handleSundayDropdownChange = (id) => (e) => {
    const { value } = e.target;

    const intentionsCopy = [...intentions];

    const index = intentionsCopy.findIndex((intention) => intention.id === id);

    const foundIntention = intentionsCopy[index];

    const updatedIntention = {
      ...foundIntention,
      sundayMassTime: { value, error: "" },
    };

    intentionsCopy[index] = updatedIntention;

    setIntentions(intentionsCopy);
  };

  const handleWeekdayDropdownChange = (id) => (e) => {
    const { value } = e.target;

    const intentionsCopy = [...intentions];

    const index = intentionsCopy.findIndex((intention) => intention.id === id);

    const foundIntention = intentionsCopy[index];

    const updatedIntention = {
      ...foundIntention,
      weekdayMassTime: { value, error: "" },
    };

    intentionsCopy[index] = updatedIntention;

    setIntentions(intentionsCopy);
  };

  const handleTuesdayDropdownChange = (id) => (e) => {
    const { value } = e.target;

    const intentionsCopy = [...intentions];

    const index = intentionsCopy.findIndex((intention) => intention.id === id);

    const foundIntention = intentionsCopy[index];

    const updatedIntention = {
      ...foundIntention,
      tuesdayMassTime: { value, error: "" },
    };

    intentionsCopy[index] = updatedIntention;

    setIntentions(intentionsCopy);
  };

  const handleSaturdayDropdownChange = (id) => (e) => {
    const { value } = e.target;

    const intentionsCopy = [...intentions];

    const index = intentionsCopy.findIndex((intention) => intention.id === id);

    const foundIntention = intentionsCopy[index];

    const updatedIntention = {
      ...foundIntention,
      saturdayMassTime: { value, error: "" },
    };

    intentionsCopy[index] = updatedIntention;

    setIntentions(intentionsCopy);
  };

  const handleDateChange = (id) => (type) => (value) => {
    const intentionsCopy = [...intentions];

    const index = intentionsCopy.findIndex((intention) => intention.id === id);

    const foundIntention = intentionsCopy[index];

    let updatedIntention = { ...foundIntention, [type]: { error: "" } };

    const today = moment().utc().tz(TIMEZONE);

    if (!value.isValid()) {
      updatedIntention = {
        ...foundIntention,
        [type]: { error: "Invalid date specified" },
      };
    }

    if (value.isBefore(today, "day")) {
      updatedIntention = {
        ...foundIntention,
        [type]: {
          error: "Selected date must be greater than or equal to today",
        },
      };
    }

    if (type === "startDate") {
      const endDate = foundIntention.endDate;

      if (value.isAfter(endDate.value, "day")) {
        updatedIntention = {
          ...foundIntention,
          [type]: {
            error: "Start date must be less than or equal to end date",
          },
        };
      }

      if (
        endDate.value.isValid() &&
        endDate.value.isSameOrAfter(value, "day") &&
        endDate.error
      ) {
        updatedIntention = {
          ...foundIntention,
          startDate: { error: updatedIntention.startDate.error },
          endDate: {
            error: "",
            value: endDate.value,
          },
        };
      }
    }

    if (type === "endDate") {
      const startDate = foundIntention.startDate;

      if (value.isBefore(startDate.value, "day")) {
        updatedIntention = {
          ...foundIntention,
          [type]: {
            error: "End date must be greater than or equal to start date",
          },
        };
      }

      if (
        startDate.value.isValid() &&
        startDate.value.isSameOrBefore(value, "day") &&
        startDate.error
      ) {
        updatedIntention = {
          ...foundIntention,
          endDate: { error: updatedIntention.endDate.error },
          startDate: {
            error: "",
            value: startDate.value,
          },
        };
      }
    }

    const normalizedDate = value.utc(true);

    updatedIntention = {
      ...updatedIntention,
      [type]: { value: normalizedDate, error: updatedIntention[type].error },
    };

    intentionsCopy[index] = updatedIntention;

    setIntentions(intentionsCopy);
  };

  const totalPriceBase = getTotalPrice(intentions);
  const payStackTotal = getPaystackTotal(totalPriceBase) * 100;

  const initializePayment = usePaystackPayment({
    amount: payStackTotal,
    publicKey: import.meta.env.VITE_APP_PAYSTACK_PUBLIC_KEY,
    email: bookedBy.email.value,
    phone: bookedBy.phoneNumber.value,
  });

  const handleSuccess = () => {
    setOpenLoader(true);
    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/bookings`, {
        bookings: intentions.map((massIntention) => ({
          name: massIntention.name.value,
          massIntention:
            massIntention.textAreaIntention.value ||
            massIntention.massIntention.value,
          startDate: massIntention.startDate.value.unix(),
          endDate: massIntention.endDate.value.unix(),
          bookedBy: bookedBy.bookedByName.value,
          email: bookedBy.email.value,
          phoneNumber: bookedBy.phoneNumber.value,
          ...(massIntention.weekdayMassTime.value &&
            weekdayExists(
              massIntention.startDate.value,
              massIntention.endDate.value
            ) && {
              weekdayMassTime: massIntention.weekdayMassTime.value,
            }),
          ...(massIntention.sundayMassTime.value &&
            sundayExists(
              massIntention.startDate.value,
              massIntention.endDate.value
            ) && {
              sundayMassTime: massIntention.sundayMassTime.value,
            }),
          ...(massIntention.tuesdayMassTime.value &&
            tuesdayExists(
              massIntention.startDate.value,
              massIntention.endDate.value
            ) && {
              tuesdayMassTime: massIntention.weekdayMassTime.value,
            }),
          ...(massIntention.saturdayMassTime.value &&
            saturdayExists(
              massIntention.startDate.value,
              massIntention.endDate.value
            ) && {
              saturdayMassTime: massIntention.sundayMassTime.value,
            }),
          amountPaid: getOffering(
            massIntention.startDate.value,
            massIntention.endDate.value
          ),
          createdBy: admin ? "Admin" : "User",
        })),
      })
      .then(({ data }) => {
        setOpenLoader(false);

        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "success",
            message: "Booking(s) created successfully",
            title: "Success",
          })
        );

        dispatch(
          setSuccessResponseData({
            bookedByName: { value: data.name },
            phoneNumber: { value: data.phoneNumber },
            email: { value: data.email },
            amountPaid: { value: data.amountPaid },
          })
        );

        handleReset();
        handleNext();
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error);
        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "error",
            message:
              "Unable to complete Mass booking, please contact the administrator",
            title: "Error",
            additionalData: errorMessage,
          })
        );
      });
  };

  const triggerPaymentModal = () => {
    initializePayment(handleSuccess);
  };

  return {
    intentions,
    bookedBy,
    handleDateChange,
    handleIntentionInputChange,
    triggerPaymentModal,
    handleSuccess,
    openLoader,
    handleSundayDropdownChange,
    handleWeekdayDropdownChange,
    handleTuesdayDropdownChange,
    handleSaturdayDropdownChange,
  };
};
