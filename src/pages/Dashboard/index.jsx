import { Link } from "react-router-dom";

import TotalMassesBooked from "../../assets/images/totalMassesBooked.png";
import DailyMassesBooked from "../../assets/images/dailyMassesBooked.png";
import TrackPayment from "../../assets/images/trackPayment.png";
import Loader from "../../components/Loader";
import Stat from "../../components/Stat";
import IntentionCard from "../../components/IntentionCard";
import { DashboardController } from "../../controllers";

const Dashboard = () => {
  const {
    openLoader,
    generateStat,
    stats,
    handleClick,
    handleManagePaymentClick,
    latestBookings,
  } = DashboardController();

  return (
    <div className="mt-[-50px] lg:mt-[-30px]">
      <Loader open={openLoader} />
      {!openLoader && (
        <div className="lg:flex gap-x-10">
          <div className="lg:w-[48%]">
            <h6 className="font-Satoshi text-2xl lg:text-4xl mb-5 text-customBlack-200">
              Mass Booking Overview
            </h6>
            <p className="text-base lg:text-lg mb-5 font-light font-Museo">
              Keep track of all the Mass bookings and payments at a glance.
            </p>
            <div>
              <div className="relative">
                <Stat
                  imgUrl={TotalMassesBooked}
                  imgAlt="Total Masses Bookings"
                  statCount={generateStat(stats.allTime)}
                  handleClick={handleClick}
                />
              </div>
              <div className="lg:flex justify-between">
                <div className="relative lg:w-[48%]">
                  <Stat
                    imgUrl={DailyMassesBooked}
                    imgAlt="Mass Bookings For Today"
                    statCount={generateStat(stats.daily)}
                    handleClick={handleClick}
                    long
                  />
                </div>
                <div className="relative lg:w-[48%]">
                  <Stat
                    imgUrl={TrackPayment}
                    imgAlt="Track Payments"
                    handleClick={handleManagePaymentClick}
                    long
                  />
                </div>
              </div>
            </div>
          </div>

          {latestBookings.length ? (
            <div className="lg:w-[45%] p-5 lg:px-10 bg-white">
              <div className="flex justify-between mb-10">
                <h2 className="lg:text-2xl">Mass Booking Intention</h2>
                <Link className="text-customGreen-100" to="/admin/massBookings">
                  View all
                </Link>
              </div>
              <div>
                <div>
                  {latestBookings.map((booking) => (
                    <IntentionCard
                      name={booking.bookedBy}
                      createdAt={booking.createdAt}
                      startDate={booking.startDate}
                      massIntention={booking.massIntention}
                      key={`${booking.massIntention}-${Math.random()}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
