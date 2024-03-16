import React from "react";

import DatePicker from "../Datepicker";
import Input from "../Input";
import InputContainer from "../InputContainer";
import SectionHeader from "../SectionHeader";

const Intention = ({
  name,
  massIntention,
  startDate,
  endDate,
  handleChange,
  handleDateChange,
  textAreaPlaceholder,
}) => {
  return (
    <div className="pt-4">
      <SectionHeader label="INTENTION FOR" />

      <InputContainer error={name.error}>
        <Input
          type="text"
          value={name.value}
          handleChange={handleChange}
          placeholder="Name *"
          name="name"
          addborderbottom
        />
      </InputContainer>

      <InputContainer error={massIntention.error}>
        <textarea
          name="massIntention"
          onChange={handleChange}
          value={massIntention.value}
          placeholder={textAreaPlaceholder || "Write your prayer request *"}
          maxLength={500}
          className="p-3 pb-0 mt-4 border-solid border border-customBlack-300 w-full text-customGray-100 placeholder-customGray-100 text-base rounded-lg h-[183px]"
        />
      </InputContainer>

      <p className="text-sm text-customBlack-200 mb-5">
        Select a start and end date for the mass intention to be read
      </p>

      <div className="pb-5 lg:flex justify-between">
        <InputContainer error={startDate.error} halfWidth>
          <DatePicker
            value={startDate.value}
            handleChange={handleDateChange("startDate")}
            placeholder="Start Date"
            minDate={Date.now()}
            addborderbottom="true"
          />
        </InputContainer>

        <InputContainer error={endDate.error} halfWidth>
          <DatePicker
            value={endDate.value}
            handleChange={handleDateChange("endDate")}
            placeholder="End Date"
            minDate={startDate.value}
            disabled={startDate.value === null}
            addborderbottom="true"
          />
        </InputContainer>
      </div>
    </div>
  );
};

export default Intention;
