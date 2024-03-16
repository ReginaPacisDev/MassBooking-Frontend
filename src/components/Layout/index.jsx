import React from "react";

import Header from "./Header";
import TopSection from "./Footer/TopSection";
import BottomSection from "./Footer/BottomSection";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      <Header />

      <div className="lg:w-[90%] lg:mx-auto">
        <div>{children}</div>
      </div>

      <div>
        <div className="lg:w-[90%] lg:mx-auto">
          <TopSection />
        </div>
        <BottomSection />
      </div>
    </div>
  );
};

export default Layout;
