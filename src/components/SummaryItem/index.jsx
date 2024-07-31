import converter from "number-to-words";

import SectionHeader from "../SectionHeader";
import DisabledInput from "../DisabledInput";
import Input from "../Input";
import InputContainer from "../InputContainer";
import Editable from "../Editable";
import DatePicker from "../Datepicker";
import {
  getOffering,
  numberWithCommas,
  sundayMasses,
  weekdayMasses,
} from "../../helpers";
import { IntentionController } from "../../controllers/intention.controller";
import InputSelect from "../InputSelect";

const Item = ({
  intention,
  handleInputChange,
  handleDateChange,
  index,
  handleDeleteIntention,
  intentions,
  handleSundayDropdownChange,
  handleWeekdayDropdownChange,
}) => {
  const { sundayFound, weekdayFound } = IntentionController(
    intention.startDate,
    intention.endDate
  );

  const offering = getOffering(
    intention.startDate.value,
    intention.endDate.value
  );

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

      {sundayFound && (
        <InputContainer error={intention.sundayMassTime.error}>
          <Editable>
            <InputSelect
              dropdownItems={sundayMasses}
              selectedValue={intention.sundayMassTime.value}
              handleDropdownChange={handleSundayDropdownChange(intention.id)}
              placeholder="Sunday Mass Time *"
            />
          </Editable>
        </InputContainer>
      )}

      {weekdayFound && (
        <InputContainer error={intention.weekdayMassTime.error}>
          <Editable>
            <InputSelect
              dropdownItems={weekdayMasses}
              selectedValue={intention.weekdayMassTime.value}
              handleDropdownChange={handleWeekdayDropdownChange(intention.id)}
              placeholder="Weekday / Saturday Mass Time *"
            />
          </Editable>
        </InputContainer>
      )}

      <div>
        <SectionHeader label="Price" />

        <DisabledInput value={`₦ ${numberWithCommas(offering)}`} />
      </div>
      {intentions.length > 1 && (
        <div className="flex justify-end">
          <button
            className="rounded-lg border-[1px] border-red-600 py-2 px-3 text-red-600 text-base"
            onClick={() => handleDeleteIntention(intention.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Item;
