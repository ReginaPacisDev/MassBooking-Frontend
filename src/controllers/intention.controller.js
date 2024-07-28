import { useEffect, useState } from "react";
import { sundayExists, weekdayExists } from "../helpers";

export const IntentionController = (startDate, endDate) => {
  const [weekdayFound, setWeekdayFound] = useState(false);
  const [sundayFound, setSundayFound] = useState(false);

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
    }
  }, [endDate.value, startDate.value]);

  return {
    weekdayFound,
    sundayFound,
  };
};
