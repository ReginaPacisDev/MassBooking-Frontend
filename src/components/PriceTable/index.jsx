import React from "react";
import TableHeader from "../TableItems/TableHeader";
import TableData from "../TableItems/TableData";

const daysAndPrices = [
  {
    day: "Sunday",
    price: 200,
  },
  {
    day: "Monday",
    price: 100,
  },
  {
    day: "Tuesday",
    price: 100,
  },
  {
    day: "Wednesday",
    price: 100,
  },
  {
    day: "Thursday",
    price: 100,
  },
  {
    day: "Friday",
    price: 100,
  },
  {
    day: "Saturday",
    price: 100,
  },
];

const PriceTable = () => {
  return (
    <div className="bg-customYellow-100 p-5">
      <h3 className="text-2xl text-customBlack-200">
        N/B: This is the price for different masses in the week
      </h3>
      <table className="bg-white mt-4 text-left rounded-lg">
        <thead>
          <tr>
            <TableHeader text="Day" border />
            <TableHeader text="Price" border />
          </tr>
        </thead>

        <tbody>
          {daysAndPrices.map(({ day, price }) => (
            <tr key={`${day}-price`}>
              <TableData text={day} />
              <TableData text={price} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceTable;
