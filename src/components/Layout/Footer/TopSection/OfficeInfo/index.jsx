import React from "react";

const OfficeInfo = ({ imgUrl, imgAlt, children }) => {
  return (
    <div className="flex items-start mb-4">
      <img src={imgUrl} alt={imgAlt} className="mr-3 lg:mt-[6px]" />
      {children}
    </div>
  );
};

export default OfficeInfo;
