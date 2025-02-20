import React, { useEffect, useState } from "react";
import products from "../utils/Products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct,removeProducts } from "../utils/ProductSlice";

const MainSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const prizeRange = useSelector((store) => {
    console.log("Redux prizeRange:", store.prizeRange); 
    return typeof store.prizeRange === "number" ? store.prizeRange : store.prizeRange?.pize || 199;
  });

  const [product, setProduct] = useState([]);
  const [cost, setCost] = useState(199);
  const [paymentMessage, setPaymentMessage] = useState("");

  const [selectedProducts, setSelectedProducts] = useState({
    row1: null,
    row2: null,
    row3: null,
  });

  const getAllRanges = async()=>{
     const  product = await products(prizeRange)
     console.log(product,"productss");
     
     setProduct(product);
  }

  useEffect(() => {
    setCost(prizeRange);
  
    getAllRanges()
    dispatch(removeProducts())
  
  }, [prizeRange]);

  if (!product.length) return <p className="text-center mt-10">Loading products...</p>;

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
    <div className="min-h-screen bg-gray-100  p-4  sm:p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        {cost} products
      </h1>

      <div className="space-y-6">
        {[row1, row2, row3].map((row, rowIndex) => (
          <div key={rowIndex} className="mt-10">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-700">
              Row {rowIndex + 1}
            </h2>
            <div className="bg-white shadow-lg rounded-lg p-3 sm:p-4">
              <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide p-2">
                {row.map((elem, index) => (
                  <div
                    key={index}
                    className={`min-w-[120px] sm:min-w-[180px] bg-gray-200 rounded-lg p-3 sm:p-4 text-center hover:scale-105 transition-transform ${
                      selectedProducts[`row${rowIndex + 1}`] !== null &&
                      selectedProducts[`row${rowIndex + 1}`] !== index
                        ? "blur-sm"
                        : ""
                    }`}
                    onClick={() => handleSelect(`row${rowIndex + 1}`, index)}
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
        ))}
      </div>

      <div className="text-center mt-6">
        {paymentMessage && <p className="text-red-800">{paymentMessage}</p>}
        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
          disabled={Object.values(selectedProducts).some((value) => value === null)}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default MainSection;
