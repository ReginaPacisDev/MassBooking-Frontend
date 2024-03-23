import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import {
  validateAuthInputs,
  stringifySnackBarProps,
  getErrorMessage,
} from "../helpers/index";

export const LoginController = (formDetails, setFormDetails, isLogin) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [openLoader, setOpenLoader] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const previousDetails = {
      ...formDetails,
      [name]: {
        value,
        error: "",
      },
    };

    setFormDetails(previousDetails);
  };

  const handleSubmit = async () => {
    const { errorExists, updatedFormDetails } = validateAuthInputs(formDetails);

    const errMessage = `Unable to ${
      isLogin ? "log in" : "sign up"
    } user, please try again`;

    if (errorExists) {
      setFormDetails(updatedFormDetails);
    } else {
      try {
        setOpenLoader(true);

        const data = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/auth/${
            isLogin ? "login" : "signup"
          }`,
          {
            email: formDetails.email.value,
            password: formDetails.password.value,
            ...(!isLogin && { name: formDetails.name.value }),
          }
        );

        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "success",
            message: `Welcome!`,
            title: "Success",
          })
        );

        localStorage.setItem("access-token", data.data.accessToken);

        setOpenLoader(false);

        navigate("/admin/dashboard");
      } catch (error) {
        setOpenLoader(false);

        const errorMessage = getErrorMessage(error);

        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "error",
            message: errMessage,
            title: "Error",
            additionalData: errorMessage,
          })
        );
      }
    }
  };

  return {
    handleSubmit,
    openLoader,
    handleInputChange,
  };
};
