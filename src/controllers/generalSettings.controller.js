import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import jwt from "jwt-decode";
import axios from "axios";

import {
  validateAuthInputs,
  stringifySnackBarProps,
  getErrorMessage,
  ADMIN_ACCESS_TOKEN,
} from "../helpers";

const initialPasswords = {
  password: {
    value: "",
    error: "",
  },
  confirmPassword: {
    value: "",
    error: "",
  },
};

export const GeneralSettingsController = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [openLoader, setOpenLoader] = useState(false);
  const [userId, setUserId] = useState(undefined);

  const token = localStorage.getItem(ADMIN_ACCESS_TOKEN);

  const [user, setUser] = useState({
    email: {
      value: "",
      error: "",
    },
    name: {
      value: "",
      error: "",
    },
  });

  const [passwords, setPasswords] = useState(initialPasswords);

  const fetchUser = useCallback(async () => {
    try {
      if (userId) {
        setOpenLoader(true);

        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser({
          email: {
            value: data.email,
            error: "",
          },
          name: {
            value: data.name,
            error: "",
          },
        });

        setOpenLoader(false);
      }
    } catch (error) {
      setOpenLoader(false);
      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "error",
          message: "Unable to fetch user",
          title: "User",
        })
      );
    }
  }, [enqueueSnackbar, token, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedUser = {
      ...user,
      [name]: {
        value,
        error: "",
      },
    };

    setUser(updatedUser);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    const updatedPasswords = {
      ...passwords,
      [name]: {
        value,
        error: "",
      },
    };

    setPasswords(updatedPasswords);
  };

  const handleSubmit = async (password) => {
    const { errorExists, updatedFormDetails } = validateAuthInputs(
      password ? passwords : user
    );

    if (errorExists) {
      password ? setPasswords(updatedFormDetails) : setUser(updatedFormDetails);

      return;
    }

    try {
      setOpenLoader(true);
      if (password) {
        const token = localStorage.getItem(ADMIN_ACCESS_TOKEN);
        const { email } = jwt(token);

        await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/users/reset-password/${email}`,
          {
            password: passwords.password.value,
          }
        );
      } else {
        await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/users/${userId}`,
          {
            email: user.email.value,
            name: user.name.value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "info",
          message: "User details saved successfully",
          title: "User Updated",
        })
      );

      setOpenLoader(false);

      if (password) {
        setPasswords(initialPasswords);
      }
    } catch (error) {
      setOpenLoader(false);
      const errorMessage = getErrorMessage(error);
      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "error",
          message: "Error while trying to update user data",
          title: "Error",
          additionalData: errorMessage,
        })
      );
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const userInToken = jwt(token);
    setUserId(userInToken.id);
  }, [token]);

  return {
    openLoader,
    user,
    handleChange,
    handleSubmit,
    passwords,
    handlePasswordChange,
  };
};
