import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt from "jwt-decode";

import { ADMIN_ACCESS_TOKEN } from "../helpers";
import { useInterval } from "../hooks";
import DashboardIcon from "../assets/images/dashboard.svg";
import MassBookings from "../assets/images/massBookings.svg";
import Settings from "../assets/images/settings.svg";
import ManagePayments from "../assets/images/managePayments.svg";
import CreateBooking from "../assets/images/create.svg";

const LOGIN_ROUTE = "/admin/login";

export const AdminPagesLayoutController = () => {
  const accessToken = localStorage.getItem(ADMIN_ACCESS_TOKEN);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const adminLinks = [
    {
      imgUrl: DashboardIcon,
      text: "Dashboard",
      to: "/admin/dashboard",
    },
    {
      imgUrl: CreateBooking,
      text: "Create Booking",
      to: "/admin/createBooking",
    },
    {
      imgUrl: MassBookings,
      text: "Mass Bookings",
      to: "/admin/massBookings",
    },
    {
      imgUrl: ManagePayments,
      text: "Manage Payments",
      to: "/admin/managePayments",
    },
    {
      imgUrl: Settings,
      text: "Settings",
      to: "/admin/settings",
    },
  ];

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_ACCESS_TOKEN);
    setOpenModal(false);
  };

  const toggleNav = () => {
    setShowNav((prev) => !prev);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setShowNav((prev) => !prev);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate(LOGIN_ROUTE);
    }
  }, [accessToken, navigate]);

  useInterval(() => {
    const decodedToken = jwt(accessToken);
    const currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      handleLogout();
      navigate(LOGIN_ROUTE);
    }
  }, 1000);

  return {
    dispatch,
    location,
    openModal,
    showNav,
    toggleModal,
    toggleNav,
    handleNavClick,
    handleLogout,
    adminLinks,
  };
};
