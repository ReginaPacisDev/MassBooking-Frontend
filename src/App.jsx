import { Routes, Route } from "react-router-dom";

import RouteWithLayout from "./containers/RouteWithLayout";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";

import ForgotPassword from "./pages/ForgotPassword";
import AccessLayout from "./containers/AccessLayout";
import Admin from "./containers/Admin";
import AdminPagesLayout from "./containers/AdminPagesLayout";

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
          <Route
            path="dashboard"
            element={
              <AdminPagesLayout title="Today's Mass Booking Analytics">
                <Dashboard />
              </AdminPagesLayout>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
