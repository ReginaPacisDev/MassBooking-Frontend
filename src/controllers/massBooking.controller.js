import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

import {
  formatTime,
  ADMIN_ACCESS_TOKEN,
  getErrorMessage,
  stringifySnackBarProps,
} from "../helpers";

export const MassBookingController = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const id = params.id;

  const [intention, setIntention] = useState();
  const [startEndDate, setStartEndDate] = useState();
  const [openLoader, setOpenLoader] = useState(false);

  const handleClick = useCallback(() => {
    return navigate("/admin/massBookings");
  }, [navigate]);

  const handleGetIntention = useCallback(async () => {
    try {
      setOpenLoader(true);

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/bookings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ADMIN_ACCESS_TOKEN)}`,
          },
        }
      );

      setIntention(data);
      setOpenLoader(false);
    } catch (error) {
      setOpenLoader(false);

      const errorMessage = getErrorMessage(error);

      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "error",
          message: "Unable to fetch the requested intention",
          title: "Error",
          additionalData: errorMessage,
        })
      );
    }
  }, [enqueueSnackbar, id]);

  useEffect(() => {
    if (intention) {
      const normalizedStartDate = formatTime(intention.startDate);
      const normalizedEndDate = formatTime(intention.endDate);

      setStartEndDate(`${normalizedStartDate} - ${normalizedEndDate}`);
    }
  }, [intention]);

  useEffect(() => {
    handleGetIntention();
  }, [handleGetIntention]);

  useEffect(() => {
    if (!id) {
      handleClick();
    }
  }, [handleClick, id, navigate]);

  return {
    intention,
    startEndDate,
    openLoader,
    handleClick,
  };
};
