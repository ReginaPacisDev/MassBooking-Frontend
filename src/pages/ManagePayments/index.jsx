import PaymentHeaderStat from "../../components/PaymentHeaderStat";
import Dropdown from "../../components/Dropdown";
import { adminFilterOptions } from "../../helpers";
import { ManagePaymentsController } from "../../controllers";
import DatePicker from "../../components/Datepicker";
import PaymentStat from "../../components/PaymentStat";
import { AdminPageLoader } from "../../components/Loader";
import NoIntentions from "../../components/NoIntentions";
import AppPagination from "../../components/Pagination";

const ManagePayments = () => {
  const {
    intentions,
    selectedPeriod,
    handleDropdownChange,
    startDate,
    handleDateChange,
    totalAmountPaidForPeriod,
    totalAmountPaid,
    totalBookingsForPeriod,
    count,
    updatePageNumber,
    pageNumber,
    openLoader,
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

      <div className="flex items-center mb-10 mt-10">
        <h6 className="hidden lg:block mr-5 text-customBlue-200 font-Museo">
          Filter Payments
        </h6>
        <div className="w-[160px]">
          <Dropdown
            dropdownItems={adminFilterOptions}
            selectedValue={selectedPeriod}
            handleDropdownChange={handleDropdownChange}
          />
        </div>

        <div className="w-[300px] ml-5">
          <DatePicker
            addBorder="true"
            value={startDate}
            placeholder="Date"
            handleChange={handleDateChange}
          />
        </div>
      </div>

      {intentions.length === 0 ? (
        <NoIntentions />
      ) : (
        <div className="lg:flex flex-wrap gap-[5%]">
          {intentions.map(({ bookedBy, amountPaid, totalMassesBooked }) => (
            <PaymentStat
              bookedBy={bookedBy}
              amountPaid={amountPaid}
              numberOfIntentions={totalMassesBooked}
              key={`${bookedBy}-${amountPaid}`}
            />
          ))}
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
