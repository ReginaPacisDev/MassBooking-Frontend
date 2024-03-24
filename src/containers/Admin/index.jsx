import { useEffect } from "react";
import jwt from "jwt-decode";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { ADMIN_ACCESS_TOKEN } from "../../helpers";

const BASE_ADMIN_URL = "/admin";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === BASE_ADMIN_URL ||
      location.pathname === `${BASE_ADMIN_URL}/login`
    ) {
      const token = localStorage.getItem(ADMIN_ACCESS_TOKEN);

      if (!token) {
        navigate(`${BASE_ADMIN_URL}/login`);
      }

      const decodedToken = jwt(token);
      const currentDate = new Date();

      if (decodedToken.exp * 1000 > currentDate.getTime()) {
        navigate(`${BASE_ADMIN_URL}/dashboard`);
      } else {
        navigate(`${BASE_ADMIN_URL}/login`);
      }
    }
  }, [navigate, location]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Admin;
