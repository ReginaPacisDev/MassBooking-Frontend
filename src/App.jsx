import React from "react";
import { Routes, Route } from "react-router-dom";

import NotFound from "./components/NotFound";
import InitialBooking from "./containers/InitialBooking";
import RouteWithLayout from "./containers/RouteWithLayout";

const App = () => {
  return (
    <div className="3xl:w-[50%] 3xl:mx-auto">
      <Routes>
        <Route
          index
          element={
            <RouteWithLayout>
              <InitialBooking />
            </RouteWithLayout>
          }
        />
        <Route
          path="*"
          element={
            <RouteWithLayout>
              <NotFound />
            </RouteWithLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
