import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export const ADMIN_ACCESS_TOKEN = "access-token";

export const TIMEZONE = "Africa/Lagos";

export const sundayExists = (date1, date2) => {
  let sundayFound = false;

  while (date1 <= date2) {
    var day = date1.getDay();
    sundayFound = day === 0;

    if (sundayFound) {
      return true;
    }

    date1.setDate(date1.getDate() + 1);
  }
  return false;
};

export const weekdayExists = (date1, date2) => {
  let weekdayFound = false;

  while (date1 <= date2) {
    var day = date1.getDay();

    weekdayFound = day > 0;

    if (weekdayFound) {
      return true;
    }

    date1.setDate(date1.getDate() + 1);
  }

  return false;
};

export const createIntention = () => ({
  massIntention: {
    value: "",
    error: "",
  },
  name: {
    value: "",
    error: "",
  },
  startDate: {
    value: null,
    error: "",
  },
  endDate: {
    value: null,
    error: "",
  },
  weekdayMassTime: {
    value: "",
    error: "",
  },
  sundayMassTime: {
    value: "",
    error: "",
  },
  id: uuidv4(),
  showTextArea: false,
  textAreaIntention: {
    value: "",
    error: "",
  },
});

export const createBookedBy = () => ({
  email: {
    value: "",
    error: "",
  },
  phoneNumber: {
    value: "",
    error: "",
  },
  bookedByName: {
    value: "",
    error: "",
  },
});

export const sundayMasses = [
  {
    label: "06:30am",
    value: "06:30am",
  },
  {
    label: "08:30am",
    value: "08:30am",
  },
  {
    label: "11:00am",
    value: "11:00am",
  },
  {
    label: "06:30pm",
    value: "06:30pm",
  },
];

export const weekdayMasses = [
  {
    label: "06:30am",
    value: "06:30am",
  },
  {
    label: "12:30pm",
    value: "12:30pm",
  },
  {
    label: "06:30pm",
    value: "06:30pm",
  },
];

export const massIntentions = [
  "Birthday Thanksgiving",
  "Child Thanksgiving",
  "Wedding Anniversary Thanksgiving",
  "Special Intentions",
  "God's Blessings, Guidance and Protection",
  "Divine Healing",
  "Journey Mercies",
  "Repose of the Souls Departed",
  "Novena Mass",
  "Others (please state)",
];

export const ERRORS = {
  name: "Who is this Intention being booked for?",
  email: "Email is required",
  startDate: "Start date is required",
  endDate: "End date is required",
  phoneNumber: "Please enter a valid phone number",
  massIntention: "Mass Intention is required",
  bookedByName: "Name is required",
  password: "Password is required",
  confirmPassword:
    "Confirm Password is required and must be equal to the password",
  weekdayMassTime: "Please select a mass for your intention to be read",
  sundayMassTime: "Please select a mass for your intention to be read",
  textAreaIntention: "Mass Intention is required",
};

export const isValidEmail = (text) => {
  return String(text)
    .toLowerCase()
    .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};

export const isValidPhoneNumber = (phoneNumber) => {
  return String(phoneNumber)
    .toLowerCase()
    .match(
      /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d+)\)?)[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?)+)(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i
    );
};

export const validateInputs = (intention) => {
  const updatedIntention = { ...intention };
  const keys = Object.keys(intention);
  const dates = ["startDate", "endDate"];
  const massTimes = ["weekdayMassTime", "sundayMassTime"];
  let errorExists = false;

  for (const key of keys) {
    if (
      key === "id" ||
      (key === "textAreaIntention" && !intention.showTextArea) ||
      key === "showTextArea"
    )
      continue;

    const value = intention[key].value;

    if (
      (!dates.includes(key) &&
        (!value || !value.trim()) &&
        !massTimes.includes(key)) ||
      (dates.includes(key) && value === null)
    ) {
      updatedIntention[key].error = ERRORS[key];
      errorExists = true;
    }

    if (key === "email" && value) {
      if (!isValidEmail(value)) {
        updatedIntention[key].error = "Please Enter a valid email";
        errorExists = true;
      }
    }

    if (key === "phoneNumber" && value) {
      if (!isValidPhoneNumber(value)) {
        updatedIntention[key].error = ERRORS[key];
        errorExists = true;
      }
    }

    if (key === "sundayMassTime") {
      if (intention.startDate.value && intention.startDate.value) {
        if (
          sundayExists(
            intention.startDate.value.toDate(),
            intention.endDate.value.toDate()
          ) &&
          value === ""
        ) {
          updatedIntention[key].error = ERRORS[key];
          errorExists = true;
        }
      }
    }

    if (key === "weekdayMassTime") {
      if (intention.startDate.value && intention.startDate.value) {
        if (
          weekdayExists(
            intention.startDate.value.toDate(),
            intention.endDate.value.toDate()
          ) &&
          value === ""
        ) {
          updatedIntention[key].error = ERRORS[key];
          errorExists = true;
        }
      }
    }
  }

  return { updatedIntention, errorExists };
};

export const getOffering = (startDate, endDate) => {
  let price = 0;

  if (startDate === null || endDate === null) return price;

  const endDateToMoment = moment(endDate);

  let newDateToMoment = moment(startDate);

  while (endDateToMoment.diff(newDateToMoment) >= 0) {
    if (newDateToMoment.day() === 0) {
      price += 200;
    } else {
      price += 100;
    }

    newDateToMoment = newDateToMoment.add(1, "day");
  }

  return price;
};

export const getTotalPrice = (intentions) => {
  let totalPrice = 0;

  intentions.forEach((intention) => {
    totalPrice += getOffering(
      intention.startDate.value,
      intention.endDate.value
    );
  });

  return totalPrice;
};

export const getPaystackTotal = (price) => {
  if (price < 2500) {
    return price * 0.021 + price;
  }
  return Math.round(((price + 100) / (1 - 0.015) + 0.01) * 100) / 100;
};

export const stringifySnackBarProps = (props) => {
  return JSON.stringify(props);
};

export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getErrorMessage = (error) => {
  let errorMessage;
  if (error.response) {
    errorMessage = error.response.data.message;
  } else {
    errorMessage = error.message;
  }
  return errorMessage;
};

export const SIGN_UP_ERRORS = {
  name: "Name is required",
  email: "Email is required",
  password: "Password is required",
  confirmPassword:
    "Confirm Password is required and must be equal to the password",
};

export const validateAuthInputs = (formDetails) => {
  const updatedFormDetails = { ...formDetails };
  const keys = Object.keys(formDetails);
  let errorExists = false;

  for (const key of keys) {
    const value = formDetails[key].value;

    if (!value || !value.trim()) {
      updatedFormDetails[key].error = SIGN_UP_ERRORS[key];
      errorExists = true;
    }

    if (key === "email" && value) {
      if (!isValidEmail(value)) {
        updatedFormDetails[key].error = "Please Enter a valid email";
        errorExists = true;
      }
    }

    if (key === "confirmPassword" && value) {
      if (value !== formDetails.password.value) {
        updatedFormDetails[key].error =
          "Password must be equal to the password";
        errorExists = true;
      }
    }
  }

  return { updatedFormDetails, errorExists };
};

export const adminFilterOptions = [
  {
    label: "Today",
    value: "day",
  },
  {
    label: "This Week",
    value: "week",
  },
  {
    label: "This Month",
    value: "month",
  },
];

export const formatTime = (date, format) => {
  if (typeof date === "number") {
    return moment.unix(date).format(format || "Do MMM YYYY");
  }

  return moment(date, format).format(format || "Do MMM YYYY");
};

export const getCount = (
  intentionsLength,
  numberOfIntentionsToDisplayPerPage
) => {
  if (
    intentionsLength === 0 ||
    intentionsLength <= numberOfIntentionsToDisplayPerPage
  )
    return 0;

  const quotient = Math.floor(
    intentionsLength / numberOfIntentionsToDisplayPerPage
  );
  const remainder = intentionsLength % numberOfIntentionsToDisplayPerPage;

  if (remainder > 0) {
    return quotient + 1;
  }

  return quotient;
};

export const getFileName = () => {
  return `Intentions-${moment().unix()}.xlsx`;
};
