import DatePicker from "../Datepicker";
import Input from "../Input";
import InputContainer from "../InputContainer";
import SectionHeader from "../SectionHeader";
import InputSelect from "../InputSelect";
import { IntentionController } from "../../controllers/intention.controller";
import {
  sundayMasses,
  weekdayMasses,
  saturdayMasses,
  tuesdayMasses,
  massIntentions,
} from "../../helpers";

const Intention = ({
  name,
  massIntention,
  startDate,
  endDate,
  handleChange,
  handleDateChange,
  textAreaPlaceholder,
  minDate,
  sundayMassTime,
  weekdayMassTime,
  tuesdayMassTime,
  saturdayMassTime,
  textAreaIntention,
  showTextArea,
  handleSundayDropdownChange,
  handleWeekdayDropdownChange,
  handleTuesdayDropdownChange,
  handleSaturdayDropdownChange,
}) => {
  const { sundayFound, weekdayFound, saturdayFound, tuesdayFound } =
    IntentionController(startDate, endDate);

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
        <InputSelect
          dropdownItems={massIntentions.map((intention) => ({
            label: intention,
            value: intention,
          }))}
          selectedValue={massIntention.value}
          handleDropdownChange={handleChange}
          placeholder="Select An Intention"
          name="massIntention"
        />
      </InputContainer>

      {showTextArea && (
        <InputContainer error={textAreaIntention.error}>
          <textarea
            name="textAreaIntention"
            onChange={handleChange}
            value={textAreaIntention.value}
            placeholder={textAreaPlaceholder || "Write your prayer request *"}
            maxLength={500}
            className="p-3 pb-0 mt-4 border-solid border border-customBlack-300 w-full text-customGray-100 placeholder-customGray-100 text-base rounded-lg h-[183px]"
          />
        </InputContainer>
      )}

      <p className="text-sm text-customBlack-200 mb-2">
        Select a start and end date for the Mass intention to be read
      </p>

      <div className="lg:flex justify-between">
        <InputContainer error={startDate.error} halfWidth>
          <DatePicker
            value={startDate.value}
            handleChange={handleDateChange("startDate")}
            placeholder="Start Date"
            minDate={minDate}
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

      {sundayFound && (
        <InputContainer error={sundayMassTime.error}>
          <InputSelect
            dropdownItems={sundayMasses}
            selectedValue={sundayMassTime.value}
            handleDropdownChange={handleSundayDropdownChange}
            placeholder="Sunday Mass Time *"
          />
        </InputContainer>
      )}

      {weekdayFound && (
        <InputContainer error={weekdayMassTime.error}>
          <InputSelect
            dropdownItems={weekdayMasses}
            selectedValue={weekdayMassTime.value}
            handleDropdownChange={handleWeekdayDropdownChange}
            placeholder="Weekday Mass Time *"
          />
        </InputContainer>
      )}

      {tuesdayFound && (
        <InputContainer error={tuesdayMassTime.error}>
          <InputSelect
            dropdownItems={tuesdayMasses}
            selectedValue={tuesdayMassTime.value}
            handleDropdownChange={handleTuesdayDropdownChange}
            placeholder="Tuesday Mass Time *"
          />
        </InputContainer>
      )}

      {saturdayFound && (
        <InputContainer error={saturdayMassTime.error}>
          <InputSelect
            dropdownItems={saturdayMasses}
            selectedValue={saturdayMassTime.value}
            handleDropdownChange={handleSaturdayDropdownChange}
            placeholder="Saturday Mass Time *"
          />
        </InputContainer>
      )}
    </div>
  );
};

export default Intention;
