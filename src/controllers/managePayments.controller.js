import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

import {
  formatTime,
  getCount,
  getErrorMessage,
  stringifySnackBarProps,
  ADMIN_ACCESS_TOKEN,
} from "../helpers";

const PAGE_SIZE = 9;

const defaultPeriod = "day";

export const ManagePaymentsController = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);
  const [pageNumber, setPageNumber] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [intentions, setIntentions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [usedPeriod, setUsedPeriod] = useState();
  const [openLoader, setOpenLoader] = useState(true);
  const [count, setCount] = useState(0);
  const [totalForPeriod, setTotalForPeriod] = useState(0);
  const [totalAmountPaidForPeriod, setTotalAmountPaidForPeriod] = useState(0);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);
  const [totalBookingsForPeriod, setTotalBookingsForPeriod] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

  const updatePageNumber = (_e, pageNo) => {
    setStartIndex(pageNo - 1);
  };

  const handleDateChange = (newDate) => {
    const normalizedDate = newDate.utc(true);
    setStartDate(normalizedDate);
    setSelectedPeriod("");
    setStartIndex(0);
  };

  const handleDropdownChange = (e) => {
    const newValue = e.target.value;
    setSelectedPeriod(newValue);
    setStartDate(null);
    setStartIndex(0);
  };

  useEffect(() => {
    setPageNumber(startIndex + 1);
  }, [startIndex]);

  useEffect(() => {
    if (selectedPeriod) {
      setUsedPeriod(`?type=${selectedPeriod}`);
    }
  }, [selectedPeriod]);

  useEffect(() => {
    if (startDate !== null) {
      const format = "DD-MM-YYYY";

      const normalizedStartDate = formatTime(startDate, format);

      setUsedPeriod(`?date=${normalizedStartDate}`);
    }
  }, [startDate]);

  useEffect(() => {
    const updatedCount = getCount(totalForPeriod, PAGE_SIZE);

    setCount(updatedCount);
  }, [totalForPeriod]);

  const handleGetStats = useCallback(async () => {
    if (usedPeriod) {
      try {
        setOpenLoader(true);

        const {
          data: {
            bookings,
            total,
            totalAmountPaid: apiTotalAmountPaid,
            totalAmountPaidForPeriod: apiTotalAmountPaidForPeriod,
            totalBookingsForPeriod: apiTotalBookingsForPeriod,
          },
        } = await axios.get(
          `${
            import.meta.env.VITE_APP_API_URL
          }/bookings/stats${usedPeriod}&skip=${
            startIndex * PAGE_SIZE
          }&limit=${PAGE_SIZE}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                ADMIN_ACCESS_TOKEN
              )}`,
            },
          }
        );

        setTotalForPeriod(total);
        setIntentions(bookings);
        setTotalAmountPaidForPeriod(Math.floor(apiTotalAmountPaidForPeriod));
        setTotalAmountPaid(Math.floor(apiTotalAmountPaid));
        setTotalBookingsForPeriod(apiTotalBookingsForPeriod);

        setOpenLoader(false);
      } catch (error) {
        setOpenLoader(false);

        const errorMessage = getErrorMessage(error);
        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "error",
            message:
              "Unable to fetch payment stats, please contact the developer",
            title: "Error",
            additionalData: errorMessage,
          })
        );
      }
    }
  }, [enqueueSnackbar, startIndex, usedPeriod]);

  useEffect(() => {
    handleGetStats();
  }, [handleGetStats]);

  return {
    openLoader,
    selectedPeriod,
    intentions,
    count,
    updatePageNumber,
    pageNumber,
    handleDropdownChange,
    startDate,
    handleDateChange,
    totalAmountPaidForPeriod,
    totalAmountPaid,
    totalBookingsForPeriod,
  };
};
