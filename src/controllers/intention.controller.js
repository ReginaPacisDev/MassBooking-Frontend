import { useEffect, useState } from "react";
import {
  sundayExists,
  weekdayExists,
  tuesdayExists,
  saturdayExists,
} from "../helpers";

export const IntentionController = (startDate, endDate) => {
  const [weekdayFound, setWeekdayFound] = useState(false);
  const [sundayFound, setSundayFound] = useState(false);
  const [tuesdayFound, setTuesdayFound] = useState(false);
  const [saturdayFound, setSaturdayFound] = useState(false);

  useEffect(() => {
    const startDateValue = startDate.value;
    const endDateValue = endDate.value;

    if (startDate.value && endDate.value) {
      setWeekdayFound(
        weekdayExists(startDateValue.toDate(), endDateValue.toDate())
      );

      setSundayFound(
        sundayExists(startDateValue.toDate(), endDateValue.toDate())
      );

      setTuesdayFound(
        tuesdayExists(startDateValue.toDate(), endDateValue.toDate())
      );

      setSaturdayFound(
        saturdayExists(startDateValue.toDate(), endDateValue.toDate())
      );
    }
  }, [endDate.value, startDate.value]);

  return {
    weekdayFound,
    sundayFound,
    tuesdayFound,
    saturdayFound,
  };
};
