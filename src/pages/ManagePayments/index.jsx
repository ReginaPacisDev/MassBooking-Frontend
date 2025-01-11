import PaymentHeaderStat from "../../components/PaymentHeaderStat";
import Dropdown from "../../components/Dropdown";
import { adminFilterOptions, createdByOptions } from "../../helpers";
import { ManagePaymentsController } from "../../controllers";
import DatePicker from "../../components/Datepicker";
import PaymentStat from "../../components/PaymentStat";
import { AdminPageLoader } from "../../components/Loader";
import NoIntentions from "../../components/NoIntentions";
import AppPagination from "../../components/Pagination";

const ManagePayments = () => {
  const {
    intentions,
    handleDropdownChange,
    filters,
    handleDateChange,
    totalAmountPaidForPeriod,
    totalAmountPaid,
    totalBookingsForPeriod,
    count,
    updatePageNumber,
    pageNumber,
    openLoader,
    handleCreatedByDropdownChange,
    handleUpdateSearchParams,
  } = ManagePaymentsController();

  if (openLoader) {
    return (
      <div className="w-full h-[300px]">
        <AdminPageLoader />
      </div>
    );
  }

  return (
    <div className="mt-[-50px] lg:mt-[-25px]">
      <h1 className="text-lg lg:text-2xl mb-10">
        See all payments made for Mass booking
      </h1>
      <div className="md:flex justify-between flex-wrap">
        <PaymentHeaderStat
          header="Total Masses Booked"
          value={totalBookingsForPeriod}
          showImage
        />
        <PaymentHeaderStat
          header="Total Payments Made"
          value={totalAmountPaidForPeriod}
        />
        <PaymentHeaderStat
          header="Your Total Balance"
          value={totalAmountPaid}
        />
      </div>
      <div className="flex justify-between items-center mb-10 mt-10">
        <div className="md:flex items-center mb-5">
          <h6 className="hidden lg:block mr-5 text-customBlue-200 font-Museo">
            Filter Payments
          </h6>
          <div className="w-full md:w-[160px] mt-5 md:mt-0">
            <Dropdown
              dropdownItems={adminFilterOptions}
              selectedValue={filters.selectedPeriod}
              handleDropdownChange={handleDropdownChange}
            />
          </div>

          <div className="w-full md:w-[160px] mt-5 md:mt-0 ml-3">
            <Dropdown
              dropdownItems={createdByOptions}
              selectedValue={filters.createdBy}
              handleDropdownChange={handleCreatedByDropdownChange}
            />
          </div>

          <div className="w-full md:w-[160px] mt-5 md:mt-0 ml-3">
            <DatePicker
              addBorder="true"
              value={filters.startDate}
              placeholder="Date"
              handleChange={handleDateChange}
            />
          </div>
        </div>

        <button
          className="bg-customGreen-100 text-white p-3 rounded-lg cursor-pointer"
          onClick={handleUpdateSearchParams}
        >
          Apply Filter
        </button>
      </div>

      {intentions.length === 0 ? (
        <NoIntentions />
      ) : (
        <div className="lg:flex flex-wrap gap-[5%]">
          {intentions.map(
            ({ bookedBy, amountPaid, totalMassesBooked, createdBy }) => (
              <PaymentStat
                bookedBy={bookedBy}
                amountPaid={amountPaid}
                numberOfIntentions={totalMassesBooked}
                key={`${bookedBy}-${amountPaid}`}
                createdBy={createdBy}
              />
            )
          )}
        </div>
      )}

      {count > 0 && (
        <div className="flex justify-end pt-5">
          <AppPagination
            count={count}
            handleChange={updatePageNumber}
            pageNumber={pageNumber}
          />
        </div>
      )}
    </div>
  );
};

export default ManagePayments;
