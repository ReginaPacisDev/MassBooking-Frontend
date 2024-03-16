import React from "react";
import BackgroundImage from "../../assets/images/background.svg";

const Background = () => {
  return (
    <div className="absolute right-0 top-10 h-full hidden lg:block">
      <img src={BackgroundImage} alt="background" className="w-full h-[90vh]" />
    </div>
  );
};

export default Background;
