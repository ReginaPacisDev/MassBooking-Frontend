import { Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

import DatePicker from "../../components/Datepicker";
import ExportButton from "../../components/ExportButton";
import SearchBar from "../../components/SearchBar";
import {
  adminFilterOptions,
  massTimesOptions,
  massIntentionsOptions,
} from "../../helpers";
import { AdminPageLoader } from "../../components/Loader";
import IntentionsTable from "../../components/IntentionsTable";
import AppPagination from "../../components/Pagination";
import { MassBookingsController } from "../../controllers";
import Dropdown from "../../components/Dropdown";
import NoIntentions from "../../components/NoIntentions";
import MobileCard from "../../components/MobileCard";

const StyledBox = styled(Box)`
  width: 10px;
  text-align: center;
  margin: 0 auto;
`;

const MassBookings = () => {
  const {
    updatePageNumber,
    pageNumber,
    handleExportToExcel,
    handlePeriodDropdownChange,
    handleDateChange,
    search,
    handleInputChange,
    handleClick,
    intentions,
    openLoader,
    count,
    openExportLoader,
    handleMassTimeDropdownChange,
    handleMassIntentionDropdownChange,
    handleUpdateSearchParams,
    filters,
  } = MassBookingsController();

  const showIntentionsOrLoader = () => {
    if (openLoader) {
      return (
        <div className="w-full h-[300px]">
          <AdminPageLoader />
        </div>
      );
    }

    if (!intentions.length && !openLoader) {
      return <NoIntentions />;
    }

    return (
      <>
        <div className="lg:hidden">
          {intentions.map(
            ({ bookedBy, startDate, endDate, amountPaid, id }) => (
              <MobileCard
                bookedBy={bookedBy}
                key={id}
                amountPaid={amountPaid}
                startDate={startDate}
                endDate={endDate}
                handleClick={() => handleClick(id)}
              />
            )
          )}
        </div>
        <div className="hidden lg:block">
          <IntentionsTable
            intentions={intentions}
            handleActionClick={handleClick}
          />
        </div>

        {count > 0 && (
          <div className="flex justify-end pt-5">
            <AppPagination
              count={count}
              handleChange={updatePageNumber}
              pageNumber={pageNumber}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="relative font-Museo mt-[-30px] lg:mt-0">
      <div className="lg:flex w-[100%] justify-between pb-10 items-center">
        <div className="lg:w-[65%] xl:w-[70%] mb-5 lg:mb-0">
          <SearchBar value={search} handleChange={handleInputChange} />
        </div>
        {openExportLoader ? (
          <StyledBox>
            <CircularProgress size={30} sx={{ color: "#007464" }} />
          </StyledBox>
        ) : (
          <ExportButton
            text="Export Mass Intentions"
            handleClick={handleExportToExcel}
            disabled={!intentions.length}
          />
        )}
      </div>
      <div className="mb-5 md:flex justify-between items-center">
        <div className="md:flex items-center">
          <h6 className="mr-5 text-customBlue-200 font-Museo mb-5 md:mb-0">
            Filter Mass booking
          </h6>
          <div className="md:w-[160px] mb-5 md:mb-0">
            <Dropdown
              dropdownItems={adminFilterOptions}
              selectedValue={filters.selectedPeriod}
              handleDropdownChange={handlePeriodDropdownChange}
            />
          </div>

          <div className="md:w-[160px] md:mx-5 mb-5 md:mb-0">
            <Dropdown
              dropdownItems={massTimesOptions}
              selectedValue={filters.massTime}
              handleDropdownChange={handleMassTimeDropdownChange}
            />
          </div>

          <div className="md:w-[160px] md:ml-5 mb-5 md:mb-0">
            <DatePicker
              addBorder="true"
              value={filters.startDate}
              placeholder="Start Date"
              handleChange={handleDateChange("startDate")}
            />
          </div>
          <div className="md:w-[160px] md:ml-5 mb-5 md:mb-0">
            <DatePicker
              addBorder="true"
              value={filters.endDate}
              placeholder="End Date"
              minDate={filters.startDate}
              disabled={filters.startDate === null}
              handleChange={handleDateChange("endDate")}
            />
          </div>
        </div>
        <div className="hidden md:block">
          <button
            className="bg-customGreen-100 text-white p-3 rounded-lg cursor-pointer"
            onClick={handleUpdateSearchParams}
          >
            Apply Filter
          </button>
        </div>
      </div>

      <div className="md:flex items-center mb-10">
        <div className="md:w-[500px] mb-5 md:mb-0">
          <Dropdown
            dropdownItems={massIntentionsOptions}
            selectedValue={filters.massIntention}
            handleDropdownChange={handleMassIntentionDropdownChange}
          />
        </div>
      </div>

      <div className="md:hidden mb-5">
        <button
          className="bg-customGreen-100 text-white p-3 rounded-lg cursor-pointer"
          onClick={handleUpdateSearchParams}
        >
          Apply Filter
        </button>
      </div>

      {showIntentionsOrLoader()}
    </div>
  );
};

export default MassBookings;
