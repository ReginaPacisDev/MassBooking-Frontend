import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

import {
  validateAuthInputs,
  getErrorMessage,
  stringifySnackBarProps,
} from "../helpers";

export const forgotPasswordController = () => {
  const [forgotPasswordDetails, setForgotPasswordDetails] = useState({
    email: {
      value: "",
      error: "",
    },
  });

  const [openLoader, setOpenLoader] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const previousDetails = {
      ...forgotPasswordDetails,
      [name]: {
        value,
        error: "",
      },
    };

    setForgotPasswordDetails(previousDetails);
  };

  const handleSetPasswordResetEmail = async () => {
    const { errorExists, updatedFormDetails } = validateAuthInputs(
      forgotPasswordDetails
    );

    if (errorExists) {
      setForgotPasswordDetails(updatedFormDetails);
    } else {
      try {
        setOpenLoader(true);

        await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/users/send-password-reset-link/${
            forgotPasswordDetails.email.value
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        );

        await enqueueSnackbar(
          stringifySnackBarProps({
            variant: "success",
            message: `Mail Sent Successfully, please check your inbox`,
            title: "Success",
          })
        );

        setForgotPasswordDetails({
          email: {
            value: "",
            error: "",
          },
        });

        setOpenLoader(false);
      } catch (error) {
        setOpenLoader(false);

        const errorMessage = getErrorMessage(error);
        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "error",
            message:
              "An Error occurred while fetching sending password reset email",
            title: "Error",
            additionalData: errorMessage,
          })
        );
      }
    }
  };

  return {
    forgotPasswordDetails,
    openLoader,
    handleInputChange,
    handleSetPasswordResetEmail,
  };
};
