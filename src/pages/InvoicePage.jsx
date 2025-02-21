import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const InvoicePage = () => {
  const allProducts = useSelector((state) => state.product.product);


  const finalPrize = useSelector((store) =>
    typeof store.prizeRange === "number" ? store.prizeRange : store.prizeRange?.pize || 199
  );

  
  

  const navigate = useNavigate();

  
  const totalPrice = allProducts.reduce((sum, item) => sum + item.price, 0);

  
  const discount = totalPrice - finalPrize;
  const discountPercentage = totalPrice > 0 ? ((discount / totalPrice) * 100).toFixed(2) : 0;

  
  const goToPayment = () => {
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-600 px-8 py-6">
          <h2 className="text-white text-2xl font-bold">Invoice</h2>
        </div>

        {/* Orders Section */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Orders</h2>
          <div className="space-y-4">
            {allProducts.length > 0 ? (
              allProducts.map((product, index) => (
                <div key={index} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
                    <p className="text-gray-500">₹{product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No products selected.</p>
            )}
          </div>
        </div>

        {/* Price Details */}
        <div className="bg-gray-50 px-6 py-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Price Details</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Price ({allProducts.length} items)</span>
              <span className="font-medium">₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount ({discountPercentage}%)</span>
              <span className="font-medium text-green-600">- ₹{discount}</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between font-bold text-lg text-blue-600">
              <span>Total Amount</span>
              <span>₹{finalPrize}</span>
            </div>
          </div>
        </div>
        
        {/* Buy Now Button */}
        <div className="px-6 py-6 bg-white flex justify-center">
          <button 
            onClick={goToPayment}
            className="w-full max-w-xs bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition shadow-lg"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
