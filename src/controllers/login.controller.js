import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import {
  validateAuthInputs,
  stringifySnackBarProps,
  getErrorMessage,
} from "../helpers/index";

import { useLogin } from "../hooks";

export const loginController = (formDetails, setFormDetails, isLogin) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [{ isValidating }, loginOrSignup] = useLogin(isLogin);

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

  const handleSubmit = async (itemsToSend) => {
    const { errorExists, updatedFormDetails } = validateAuthInputs(formDetails);

    const errMessage = `Unable to ${
      isLogin ? "log in" : "sign up"
    } user, please try again`;

    if (errorExists) {
      setFormDetails(updatedFormDetails);
    } else {
      try {
        await loginOrSignup(itemsToSend);

        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "success",
            message: `Welcome!`,
            title: "Success",
          })
        );

        navigate("/admin/dashboard");
      } catch (error) {
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
    openLoader: isValidating,
    handleInputChange,
  };
};
