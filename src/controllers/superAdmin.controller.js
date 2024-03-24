import { useSnackbar } from "notistack";
import { useState } from "react";
import axios from "axios";

import {
  ADMIN_ACCESS_TOKEN,
  validateAuthInputs,
  stringifySnackBarProps,
  getErrorMessage,
} from "../helpers";

export const SuperAdminController = () => {
  const [info, setInfo] = useState({
    email: {
      value: "",
      error: "",
    },
  });

  const [openLoader, setOpenLoader] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedInfo = {
      ...info,
      [name]: {
        value,
        error: "",
      },
    };

    setInfo(updatedInfo);
  };

  const handleSubmit = async () => {
    const { errorExists, updatedFormDetails } = validateAuthInputs(info);

    if (errorExists) {
      setInfo(updatedFormDetails);

      return;
    }

    try {
      setOpenLoader(true);

      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/users/createUser`,
        {
          email: info.email.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ADMIN_ACCESS_TOKEN)}`,
          },
        }
      );

      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "info",
          message: "User created successfully and email invitation sent",
          title: "User Updated",
        })
      );
      setOpenLoader(false);
    } catch (error) {
      setOpenLoader(false);
      const errorMessage = getErrorMessage(error);
      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "error",
          message: "Error while creating admin",
          title: "Error",
          additionalData: errorMessage,
        })
      );
    }
  };

  return {
    openLoader,
    info,
    handleChange,
    handleSubmit,
  };
};
