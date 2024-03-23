import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

import { getErrorMessage, stringifySnackBarProps } from "../helpers";

export const DashboardController = () => {
  const [stats, setStats] = useState({
    daily: 0,
    allTime: 0,
  });

  const [latestBookings, setLatestBookings] = useState([]);

  const [openLoader, setOpenLoader] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const fetchStats = useCallback(async () => {
    try {
      setOpenLoader(true);

      const token = localStorage.getItem("access-token");

      const [dailyQueryResponse, allTimeQueryResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_APP_API_URL}/bookings?type=day`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`${import.meta.env.VITE_APP_API_URL}/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const {
        data: { total: daily },
      } = dailyQueryResponse;

      const {
        data: { total: allTime, bookings },
      } = allTimeQueryResponse;

      const recentBookings = [...bookings].slice(0, 4);

      setStats({
        daily,
        allTime,
      });

      setLatestBookings(recentBookings);

      setOpenLoader(false);
    } catch (error) {
      setOpenLoader(false);

      const errorMessage = getErrorMessage(error);

      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "error",
          message: "Error occurred while fetching dashboard data",
          title: "Error",
          additionalData: errorMessage,
        })
      );
    }
  }, [enqueueSnackbar]);

  const generateStat = (statCount) => {
    if (statCount > 1000) {
      return `${statCount}+`;
    }

    return statCount.toString();
  };

  const handleClick = () => {
    navigate("/admin/massBookings");
  };

  const handleManagePaymentClick = () => {
    navigate("/admin/managePayments");
  };

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    latestBookings,
    openLoader,
    generateStat,
    handleClick,
    handleManagePaymentClick,
  };
};
