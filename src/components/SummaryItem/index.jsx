import React from "react";
import converter from "number-to-words";
import { useDispatch } from "react-redux";

import SectionHeader from "../SectionHeader";
import DisabledInput from "../DisabledInput";
import Input from "../Input";
import InputContainer from "../InputContainer";
import Editable from "../Editable";
import DatePicker from "../Datepicker";
import { getOffering, numberWithCommas } from "../../helpers";
import { deleteIntention } from "../../store/bookings/slice";

const Item = ({ intention, handleInputChange, handleDateChange, index }) => {
  const dispatch = useDispatch();

  const offering = getOffering(
    intention.startDate.value,
    intention.endDate.value
  );

  const handleDeleteIntention = () => {
    dispatch(deleteIntention(intention));
  };

  return (
    <div className="w-full lg:w-[48%]">
      <h6 className="mb-5 capitalize text-sm">
        {converter.toWordsOrdinal(index + 1)} Intention
      </h6>
      <InputContainer error={intention.name.error}>
        <Editable>
          <Input
            name="name"
            type="text"
            placeholder="Name*"
            value={intention.name.value}
            handleChange={handleInputChange(intention.id)}
            addborderbottom
          />
        </Editable>
      </InputContainer>

      <InputContainer error={intention.massIntention.error}>
        <Editable textArea>
          <textarea
            name="massIntention"
            onChange={handleInputChange(intention.id)}
            value={intention.massIntention.value}
            placeholder="Write your prayer request *"
            maxLength={500}
            className="p-3 pb-0 mt-4 border-solid border border-customBlack-300 w-full text-customGray-100 placeholder-customGray-100 text-base rounded-lg h-[183px]"
          />
        </Editable>
      </InputContainer>

      <div className="lg:flex justify-between mb-3">
        <InputContainer error={intention.startDate.error} halfWidth>
          <Editable>
            <DatePicker
              value={intention.startDate.value}
              handleChange={handleDateChange(intention.id)("startDate")}
              placeholder="Start Date"
              minDate={Date.now()}
              addborderbottom="true"
            />
          </Editable>
        </InputContainer>

        <InputContainer error={intention.endDate.error} halfWidth>
          <Editable>
            <DatePicker
              value={intention.endDate.value}
              handleChange={handleDateChange(intention.id)("endDate")}
              placeholder="End Date"
              minDate={intention.startDate.value}
              disabled={intention.startDate.value === null}
              addborderbottom="true"
            />
          </Editable>
        </InputContainer>
      </div>
      <div>
        <SectionHeader label="Price" />

        <DisabledInput value={`₦ ${numberWithCommas(offering)}`} />
      </div>
      <div className="flex justify-end">
        <button
          className="rounded-lg border-[1px] border-red-600 py-2 px-3 text-red-600 text-base"
          onClick={handleDeleteIntention}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
