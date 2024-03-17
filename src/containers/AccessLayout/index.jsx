import React from "react";
import ReginaPacisLogo from "../../assets/images/reginapacis.png";

const AccessLayout = ({ children }) => {
  return (
    <div className="py-7 px-4">
      <header>
        <a href="https://reginapaciscc.org/">
          <div className="flex flex-col lg:w-[300px] text-center relative z-40">
            <img
              src={ReginaPacisLogo}
              alt="regina pacis logo"
              className="w-[34px] lg:w-[70px] h-[34px] lg:h-[70px] mx-auto"
            />
            <h6 className="font-Satoshi ml-1 text-base lg:text-l text-white font-medium">
              Regina Pacis Catholic Church
            </h6>
          </div>
        </a>
      </header>

      <div className="my-[50px]">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AccessLayout;
