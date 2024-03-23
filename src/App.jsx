import React from "react";
import { Routes, Route } from "react-router-dom";

import RouteWithLayout from "./containers/RouteWithLayout";
import Booking from "./pages/Booking";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

import ForgotPassword from "./pages/ForgotPassword";
import AccessLayout from "./containers/AccessLayout";
import Admin from "./containers/Admin";

const App = () => {
  return (
    <div className="3xl:w-[50%] 3xl:mx-auto">
      <Routes>
        <Route
          index
          element={
            <RouteWithLayout>
              <Booking />
            </RouteWithLayout>
          }
        />

        <Route path="admin" element={<Admin />}>
          <Route
            path="login"
            element={
              <AccessLayout>
                <Login />
              </AccessLayout>
            }
          />
          <Route
            path="forgotPassword"
            element={
              <AccessLayout>
                <ForgotPassword />
              </AccessLayout>
            }
          />
          <Route
            path="resetPassword"
            element={
              <AccessLayout>
                <ResetPassword />
              </AccessLayout>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
