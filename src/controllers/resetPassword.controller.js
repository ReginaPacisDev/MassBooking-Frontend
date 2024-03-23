import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useSearchParams, useNavigate } from "react-router-dom";

import {
  validateAuthInputs,
  getErrorMessage,
  stringifySnackBarProps,
} from "../helpers";

const BASE_ADMIN_URL = "/admin";

export const resetPasswordController = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      navigate(`${BASE_ADMIN_URL}/login`);
    }
  }, [email]);

  const [resetPasswordDetails, setResetPasswordDetails] = useState({
    password: {
      value: "",
      error: "",
    },
    confirmPassword: {
      value: "",
      error: "",
    },
  });

  const [openLoader, setOpenLoader] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const previousDetails = {
      ...resetPasswordDetails,
      [name]: {
        value,
        error: "",
      },
    };

    setResetPasswordDetails(previousDetails);
  };

  const handleResetPassword = async () => {
    const { errorExists, updatedFormDetails } =
      validateAuthInputs(resetPasswordDetails);

    if (errorExists) {
      setResetPasswordDetails(updatedFormDetails);
    } else {
      try {
        await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/users/reset-password/${email}`,
          {
            password: resetPasswordDetails.password.value,
          }
        );

        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "success",
            message: `Password Reset Successfully`,
            title: "Success",
          })
        );

        setResetPasswordDetails({
          password: {
            value: "",
            error: "",
          },
          confirmPassword: {
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
            message: "An Error occurred while resetting the password",
            title: "Error",
            additionalData: errorMessage,
          })
        );
      }
    }
  };

  return {
    resetPasswordDetails,
    openLoader,
    handleInputChange,
    handleResetPassword,
  };
};
