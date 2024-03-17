import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ReginaPacisLogo from "../../../assets/images/reginapacis.png";
import VectorIcon from "../../../assets/images/leftArrow.svg";

const Header = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const location = useLocation();

  return (
    <header className="flex justify-between items-center">
      <a href="https://reginapaciscc.org/">
        <div className="flex items-center">
          <img
            src={ReginaPacisLogo}
            alt="regina pacis logo"
            className="w-[34px] lg:w-[70px] h-[34px] lg:h-[70px]"
          />
          <h6 className="font-Museo ml-1 text-sm lg:text-lg text-customBlack-100">
            Regina Pacis Catholic Church
          </h6>
        </div>
      </a>

      {Boolean(location.state) && (
        <button onClick={handleGoBack} className="static z-40">
          <div className="flex items-center bg-red w-full h-full">
            <img
              src={VectorIcon}
              alt="left-caret"
              className="w-[6.81px] h-[11.55px] lg:w-[11.67px] lg:h-[16px]"
            />
            <p className="font-Museo ml-1 text-sm lg:text-base text-customBlack-100">
              Go back
            </p>
          </div>
        </button>
      )}
    </header>
  );
};

export default Header;
