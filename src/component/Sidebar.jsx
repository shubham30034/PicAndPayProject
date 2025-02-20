import React from "react";
import { useDispatch } from "react-redux";
import { setPrizeRange } from "../utils/PrizeRangeSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const prices = [1999, 2999, 3999, 4999, 5999, 6999, 7999, 8999, 9999, 11999, 12999];

  const selectPrizeRange = (index) => {
    const selectedPrice = prices[index];
    console.log("Selected Price:", selectedPrice);
    dispatch(setPrizeRange(selectedPrice)); 
  };

  return (
    <div className="bg-white border-r border-gray-200   w-32 sm:w-40  md:w-64 lg:w-72 h-screen sticky top-0 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Filter by Price</h2>
        <p className="text-sm text-gray-500 mt-1">Select a price range</p>
      </div>

      <div className="flex flex-col space-y-2 md:p-4">
        {prices.map((price, index) => (
          <button
            onClick={() => selectPrizeRange(index)}
            key={price}
            className="w-full px-4 py-3 text-left rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm font-medium">Price Range</span>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                ₹{price}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
