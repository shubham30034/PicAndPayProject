import React, { useEffect, useState } from "react";
import products from "../utils/Products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProducts } from "../utils/ProductSlice";

const MainSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const prizeRange = useSelector((store) => {
    console.log("Redux prizeRange:", store.prizeRange);
    return typeof store.prizeRange === "number"
      ? store.prizeRange
      : store.prizeRange?.pize || 199;
  });

  const [product, setProduct] = useState([]);
  const [cost, setCost] = useState(199);
  const [paymentMessage, setPaymentMessage] = useState("");

  const [selectedProducts, setSelectedProducts] = useState({
    row1: null,
    row2: null,
    row3: null,
  });

  const getAllRanges = async () => {
    try {
      const productList = await products(prizeRange);
      console.log(productList, "products fetched");
      setProduct(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    setCost(prizeRange);
    getAllRanges();
    dispatch(removeProducts());
  }, [prizeRange, dispatch]);

  if (!product.length)
    return <p className="text-center mt-10">Loading products...</p>;

  const row1 = product.slice(0, Math.min(40, product.length));
  const row2 = product.slice(40, Math.min(80, product.length));
  const row3 = product.slice(80, Math.min(120, product.length));

  const handleSelect = (row, index) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [row]: prev[row] === index ? null : index,
    }));
  };

  const handlePayment = () => {
    if (Object.values(selectedProducts).some((value) => value === null)) {
      setPaymentMessage("Please select 3 products");
      return;
    }

    const selectedItems = [
      row1[selectedProducts.row1],
      row2[selectedProducts.row2],
      row3[selectedProducts.row3],
    ];

    selectedItems.forEach((item) => dispatch(addProduct(item)));

    setPaymentMessage("");
    navigate("/invoice");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-4 pb-24">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        {cost} products
      </h1>

      {/* Desktop: Inline Continue to Payment Button */}
      <div className="text-center mt-6 hidden md:block">
        {paymentMessage && <p className="text-red-800">{paymentMessage}</p>}
        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
          disabled={Object.values(selectedProducts).some(
            (value) => value === null
          )}
        >
          Continue to Payment
        </button>
      </div>

      {/* Main container for rows */}
      <div className="flex flex-row flex-wrap justify-evenly bg-blue-50 gap-4">
        {/* Row 1 */}
        <div className="mt-2 flex-1 max-w-[400px]">
          <h2 className="text-xl font-semibold text-gray-800 text-center border-b-2 border-gray-300 pb-2 mb-4">
            Row 1
          </h2>
          <div className="bg-white shadow-lg rounded-lg p-3 sm:p-4 h-[600px]">
            <div className="flex flex-col gap-4 overflow-y-auto h-full p-2">
              {row1.map((elem, index) => (
                <div
                  key={index}
                  className={`min-w-[120px] sm:min-w-[180px] bg-gray-200 rounded-lg p-3 sm:p-4 text-center hover:scale-105 transition-transform ${
                    selectedProducts.row1 !== null &&
                    selectedProducts.row1 !== index
                      ? "blur-sm"
                      : ""
                  }`}
                  onClick={() => handleSelect("row1", index)}
                >
                  <img
                    src={elem.image}
                    alt={elem.name}
                    className="w-16 h-16 sm:w-32 sm:h-32 object-cover mx-auto rounded-md shadow-md"
                  />
                  <h3 className="text-base sm:text-lg font-medium text-gray-800 mt-2">
                    {elem.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-bold">
                    ₹{elem.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="mt-2 flex-1 max-w-[400px]">
          <h2 className="text-xl font-semibold text-gray-800 text-center border-b-2 border-gray-300 pb-2 mb-4">
            Row 2
          </h2>
          <div className="bg-white shadow-lg rounded-lg p-3 sm:p-4 h-[600px]">
            <div className="flex flex-col gap-4 overflow-y-auto h-full p-2">
              {row2.map((elem, index) => (
                <div
                  key={index}
                  className={`min-w-[120px] sm:min-w-[180px] bg-gray-200 rounded-lg p-3 sm:p-4 text-center hover:scale-105 transition-transform ${
                    selectedProducts.row2 !== null &&
                    selectedProducts.row2 !== index
                      ? "blur-sm"
                      : ""
                  }`}
                  onClick={() => handleSelect("row2", index)}
                >
                  <img
                    src={elem.image}
                    alt={elem.name}
                    className="w-16 h-16 sm:w-32 sm:h-32 object-cover mx-auto rounded-md shadow-md"
                  />
                  <h3 className="text-base sm:text-lg font-medium text-gray-800 mt-2">
                    {elem.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-bold">
                    ₹{elem.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="mt-2 flex-1 max-w-[400px]">
          <h2 className="text-xl font-semibold text-gray-800 text-center border-b-2 border-gray-300 pb-2 mb-4">
            Row 3
          </h2>
          <div className="bg-white shadow-lg rounded-lg p-3 sm:p-4 h-[600px]">
            <div className="flex flex-col gap-4 overflow-y-auto h-full p-2">
              {row3.map((elem, index) => (
                <div
                  key={index}
                  className={`min-w-[120px] sm:min-w-[180px] bg-gray-200 rounded-lg p-3 sm:p-4 text-center hover:scale-105 transition-transform ${
                    selectedProducts.row3 !== null &&
                    selectedProducts.row3 !== index
                      ? "blur-sm"
                      : ""
                  }`}
                  onClick={() => handleSelect("row3", index)}
                >
                  <img
                    src={elem.image}
                    alt={elem.name}
                    className="w-16 h-16 sm:w-32 sm:h-32 object-cover mx-auto rounded-md shadow-md"
                  />
                  <h3 className="text-base sm:text-lg font-medium text-gray-800 mt-2">
                    {elem.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-bold">
                    ₹{elem.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Sticky Continue to Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 shadow-md z-10 block md:hidden">
        <div className="text-center">
          {paymentMessage && (
            <p className="text-red-800 mb-2">{paymentMessage}</p>
          )}
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50 w-full"
            disabled={Object.values(selectedProducts).some(
              (value) => value === null
            )}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
