import React from "react";
import Input from "../Input";
import InputContainer from "../InputContainer";
import SectionHeader from "../SectionHeader";
import Editable from "../Editable";

const BookedBy = ({
  bookedByName,
  handleChange,
  email,
  phoneNumber,
  mode,
  sectionHeader,
  addMarginTop,
}) => {
  const getWrapper = (children) => {
    if (mode === "create") {
      return <>{children}</>;
    }

    return <Editable>{children}</Editable>;
  };

  return (
    <div className={`${addMarginTop ? "mt-10" : ""}`}>
      <SectionHeader label={sectionHeader || "YOUR DETAILS"} />

      <p className="font-Museo text-sm text-customBlack-200 mb-5">
        Details of the person booking
      </p>

      <InputContainer error={bookedByName.error}>
        {getWrapper(
          <Input
            type="text"
            value={bookedByName.value}
            handleChange={handleChange}
            placeholder="Name *"
            name="bookedByName"
            addborderbottom
          />
        )}
      </InputContainer>

      <div className="lg:flex justify-between">
        <InputContainer error={email.error} halfWidth>
          {getWrapper(
            <Input
              type="email"
              value={email.value}
              handleChange={handleChange}
              placeholder="Email *"
              name="email"
              addborderbottom
            />
          )}
        </InputContainer>

        <InputContainer error={phoneNumber.error} halfWidth>
          {getWrapper(
            <Input
              type="text"
              value={phoneNumber.value}
              handleChange={handleChange}
              placeholder="Phone number *"
              name="phoneNumber"
              addborderbottom
            />
          )}
        </InputContainer>
      </div>
    </div>
  );
};

export default BookedBy;
