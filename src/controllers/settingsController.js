import { useState, useEffect } from "react";
import jwt from "jwt-decode";

import { ADMIN_ACCESS_TOKEN } from "../helpers";

export const SettingsController = () => {
  const [value, setValue] = useState(0);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(ADMIN_ACCESS_TOKEN);
    const user = jwt(token);

    setIsSuperAdmin(user.isSuperAdmin || false);
  }, []);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return {
    value,
    isSuperAdmin,
    handleChange,
  };
};
