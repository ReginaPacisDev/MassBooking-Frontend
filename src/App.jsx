import React from "react";
import { Routes, Route } from "react-router-dom";

import RouteWithLayout from "./containers/RouteWithLayout";
import Booking from "./pages/Booking";

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
      </Routes>
    </div>
  );
};

export default App;
