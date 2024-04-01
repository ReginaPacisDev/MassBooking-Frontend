import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export const ADMIN_ACCESS_TOKEN = "access-token";

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
  id: uuidv4(),
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
  let errorExists = false;

  for (const key of keys) {
    if (key === "id") continue;

    const value = intention[key].value;

    if (
      (!dates.includes(key) && (!value || !value.trim())) ||
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
