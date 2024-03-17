import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const BASE_ADMIN_URL = "/admin";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === BASE_ADMIN_URL) {
      navigate(`${BASE_ADMIN_URL}/signin`);
    }
  }, [navigate, location]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Admin;
