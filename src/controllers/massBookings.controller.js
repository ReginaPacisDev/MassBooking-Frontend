import { useState, useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Excel from "exceljs";
import saveAs from "file-saver";

import {
  formatTime,
  getErrorMessage,
  stringifySnackBarProps,
  getCount,
  ADMIN_ACCESS_TOKEN,
  getFileName,
  TIMEZONE,
} from "../helpers";

const PAGE_SIZE = 10;

const defaultPeriod = "month";

export const MassBookingsController = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);
  const [pageNumber, setPageNumber] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [intentions, setIntentions] = useState([]);
  const [totalForPeriod, setTotalForPeriod] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [search, setSearch] = useState("");
  const [usedPeriod, setUsedPeriod] = useState();
  const [openLoader, setOpenLoader] = useState(true);
  const [count, setCount] = useState(0);
  const [openExportLoader, setOpenExportLoader] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const updatePageNumber = (_e, pageNo) => {
    setStartIndex(pageNo - 1);
  };

  const handleDateChange = (type) => (newDate) => {
    const normalizedDate = newDate.utc().tz(TIMEZONE);

    if (type === "startDate") {
      setStartDate(normalizedDate);
      setEndDate(null);
    } else {
      setEndDate(normalizedDate);
    }
  };

  const handleDropdownChange = (e) => {
    const newValue = e.target.value;

    setSelectedPeriod(newValue);
    setStartDate(null);
    setEndDate(null);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;

    setSearch(value);
  };

  const handleClick = (id) => {
    return navigate(`/admin/massBookings/${id}`);
  };

  const handleGetIntentions = useCallback(async () => {
    if (usedPeriod) {
      try {
        setOpenLoader(true);

        const {
          data: { bookings, total },
        } = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/bookings${usedPeriod}&skip=${
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

        setIntentions(bookings);

        setTotalForPeriod(total);

        setOpenLoader(false);
      } catch (error) {
        setOpenLoader(false);

        const errorMessage = getErrorMessage(error);

        enqueueSnackbar(
          stringifySnackBarProps({
            variant: "error",
            message: "Unable to fetch intentions, please contact the developer",
            title: "Error",
            additionalData: errorMessage,
          })
        );
      }
    }
  }, [enqueueSnackbar, startIndex, usedPeriod]);

  const handleExportToExcel = async () => {
    try {
      setOpenExportLoader(true);
      const {
        data: { bookings },
      } = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/bookings${usedPeriod}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ADMIN_ACCESS_TOKEN)}`,
          },
        }
      );

      const normalizedIntentions = bookings.map((intention) => ({
        ...intention,
        startDate: formatTime(intention.startDate),
        endDate: formatTime(intention.endDate),
      }));

      const workbook = new Excel.Workbook();
      const fileName = getFileName();
      const worksheet = workbook.addWorksheet("Mass Bookings");

      const intentionsColumns = [
        { key: "bookedBy", header: "Intention Booked By" },
        { key: "name", header: "Intention Created For" },
        { key: "startDate", header: "Start Date" },
        { key: "endDate", header: "End Date" },
        { key: "massIntention", header: "Mass Intention" },
        { key: "sundayMassTime", header: "Sunday Mass Time" },
        { key: "weekdayMassTime", header: "Weekday Mass Time" },
        { key: "tuesdayMassTime", header: "Tuesday Mass Time" },
        { key: "saturdayMassTime", header: "Saturday Mass Time" },
      ];

      worksheet.columns = intentionsColumns;

      normalizedIntentions.forEach((intention) => {
        const intentionCopy = { ...intention };

        delete intentionCopy.amountPaid;

        worksheet.addRow(intentionCopy);
      });

      worksheet.columns.forEach((sheetColumn) => {
        sheetColumn.font = {
          size: 12,
        };
        sheetColumn.width = 30;
      });

      worksheet.getRow(1).font = {
        bold: true,
        size: 13,
      };

      const buffer = await workbook.xlsx.writeBuffer();

      await saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        `${fileName}.xlsx`
      );
      setOpenExportLoader(false);
    } catch (error) {
      setOpenExportLoader(false);
      const errorMessage = getErrorMessage(error);
      enqueueSnackbar(
        stringifySnackBarProps({
          variant: "error",
          message: "Unable to export to excel, please retry",
          title: "Error",
          additionalData: errorMessage,
        })
      );
    }
  };

  useEffect(() => {
    const updatedCount = getCount(totalForPeriod, PAGE_SIZE);

    setCount(updatedCount);
  }, [totalForPeriod]);

  useEffect(() => {
    if (selectedPeriod) {
      setStartDate(null);
      setEndDate(null);
      setStartIndex(0);
      setSearch("");
      setUsedPeriod(`?type=${selectedPeriod}`);
    }
  }, [selectedPeriod]);

  useEffect(() => {
    if (![startDate, endDate].includes(null)) {
      setSelectedPeriod("");
      setStartIndex(0);
      setSearch("");

      const format = "DD-MM-YYYY";

      const normalizedStartDate = formatTime(startDate, format);
      const normalizedEndDate = formatTime(endDate, format);

      setUsedPeriod(
        `?startDate=${normalizedStartDate}&endDate=${normalizedEndDate}`
      );
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (search) {
      setStartDate(null);
      setEndDate(null);
      setStartIndex(0);
      setSelectedPeriod("");

      setUsedPeriod(`?name=${search}`);
    }
  }, [search]);

  useEffect(() => {
    setPageNumber(startIndex + 1);
  }, [startIndex]);

  useEffect(() => {
    handleGetIntentions();
  }, [handleGetIntentions]);

  return {
    selectedPeriod,
    updatePageNumber,
    pageNumber,
    handleExportToExcel,
    handleDropdownChange,
    startDate,
    endDate,
    handleDateChange,
    search,
    handleInputChange,
    handleClick,
    pageSize: PAGE_SIZE,
    intentions,
    openLoader,
    count,
    openExportLoader,
  };
};
