import React from "react";

const FormContainer = ({ backgroundImage, children, formText }) => {
  return (
    <div>
      <img
        src={backgroundImage}
        alt="background"
        className="absolute w-[100vw] h-[100vh] top-0 left-0 z-0 object-cover"
      />
      <div className="absolute w-full h-[100vh] bg-customYellow-200 z-10 top-0 left-0" />
      <div className="absolute w-full h-[100vh] bg-customGray-400 z-20 top-0 left-0" />
      <div className="m-auto md:w-[430px] relative z-30 bg-white p-5 rounded-lg font-Satoshi">
        <h1 className="text-2xl mb-5 font-medium text-customBlack-600">
          {formText}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
