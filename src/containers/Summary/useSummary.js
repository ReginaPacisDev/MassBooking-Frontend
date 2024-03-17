import axios from "axios";
import moment from "moment";
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
} from "../../helpers";
import { setSuccessResponseData } from "../../store/bookings/slice";

export const useSummary = ({
  intentions,
  bookedBy,
  setIntentions,
  handleNext,
  handleReset,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const [openLoader, setOpenLoader] = useState(false);

  const handleIntentionInputChange = (id) => (e) => {
    const { name, value } = e.target;

    let index = 0;
    let foundIntention;

    const intentionsCopy = [...intentions];

    intentionsCopy.forEach((intention, idx) => {
      if (intention.id === id) {
        index = idx;
      }

      foundIntention = intention;
    });

    let updatedIntention = { ...foundIntention, [name]: { value, error: "" } };

    intentionsCopy[index] = updatedIntention;

    setIntentions(intentionsCopy);
  };

  const handleDateChange = (id) => (type) => (value) => {
    let index = 0;
    let foundIntention;

    const intentionsCopy = [...intentions];

    intentionsCopy.forEach((intention, idx) => {
      if (intention.id === id) {
        index = idx;
      }

      foundIntention = intention;
    });

    let updatedIntention = { ...foundIntention, [type]: { error: "" } };

    const today = moment();

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
          massIntention: massIntention.massIntention.value,
          startDate: massIntention.startDate.value.unix(),
          endDate: massIntention.endDate.value.unix(),
          bookedBy: bookedBy.bookedByName.value,
          email: bookedBy.email.value,
          phoneNumber: bookedBy.phoneNumber.value,
          amountPaid: getOffering(
            massIntention.startDate.value,
            massIntention.endDate.value
          ),
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
              "Unable to complete mass booking, please contact the administrator",
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
  };
};
