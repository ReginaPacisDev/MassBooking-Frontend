import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

import {
  formatTime,
  getCount,
  getErrorMessage,
  stringifySnackBarProps,
  ADMIN_ACCESS_TOKEN,
  TIMEZONE,
} from "../helpers";

const PAGE_SIZE = 9;

const defaultPeriod = "day";

export const ManagePaymentsController = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [intentions, setIntentions] = useState([]);
  const [openLoader, setOpenLoader] = useState(true);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useState();
  const [totalForPeriod, setTotalForPeriod] = useState(0);
  const [totalAmountPaidForPeriod, setTotalAmountPaidForPeriod] = useState(0);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);
  const [totalBookingsForPeriod, setTotalBookingsForPeriod] = useState(0);

  const [filters, setFilters] = useState({
    selectedPeriod: defaultPeriod,
    startDate: null,
    createdBy: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const updatePageNumber = (_e, pageNo) => {
    setStartIndex(pageNo - 1);
  };

  const handleDateChange = (newDate) => {
    const normalizedDate = newDate.utc().tz(TIMEZONE);

    setFilters({ ...filters, startDate: normalizedDate, selectedPeriod: "" });
    setStartIndex(0);
  };

  const handleDropdownChange = (e) => {
    const newValue = e.target.value;
    setFilters({ ...filters, startDate: null, selectedPeriod: newValue });

    setStartIndex(0);
  };

  useEffect(() => {
    setPageNumber(startIndex + 1);
  }, [startIndex]);

  useEffect(() => {
    const updatedCount = getCount(totalForPeriod, PAGE_SIZE);

    setCount(updatedCount);
  }, [totalForPeriod]);

  useEffect(() => {
    setSearchParams(`?type=${defaultPeriod}`);
  }, []);

  const handleCreatedByDropdownChange = (e) => {
    const newValue = e.target.value;

    setFilters({
      ...filters,
      createdBy: newValue,
    });
  };

  const handleUpdateSearchParams = () => {
    const validPropertyExists = Object.values(filters).some((val) =>
      [null, undefined, ""].includes(val)
    );

    if (!validPropertyExists) return;

    let filtersToParamString = "";

    if (filters.selectedPeriod) {
      filtersToParamString += `?type=${filters.selectedPeriod}`;
    }

    const format = "DD-MM-YYYY";

    if (filters.startDate !== null) {
      const normalizedStartDate = formatTime(filters.startDate, format);
      filtersToParamString = `?date=${normalizedStartDate}`;
    }

    if (filters.createdBy) {
      filtersToParamString += `&createdBy=${filters.createdBy}`;
    }

    setSearchParams(filtersToParamString);
  };

  const handleGetStats = useCallback(async () => {
    if (searchParams) {
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
          }/bookings/stats${searchParams}&skip=${
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
  }, [enqueueSnackbar, startIndex, searchParams]);

  useEffect(() => {
    handleGetStats();
  }, [handleGetStats]);

  return {
    openLoader,
    filters,
    intentions,
    count,
    updatePageNumber,
    pageNumber,
    handleDropdownChange,
    handleDateChange,
    totalAmountPaidForPeriod,
    totalAmountPaid,
    totalBookingsForPeriod,
    handleUpdateSearchParams,
    handleCreatedByDropdownChange,
  };
};
