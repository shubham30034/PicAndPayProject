import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const allProducts = useSelector((state) => state.product.product || []);
  const navigate = useNavigate()

  const finalPrice = useSelector((store) => {
    const price =
      typeof store.prizeRange === "number"
        ? store.prizeRange
        : store.prizeRange?.price ?? 199; 
    return isNaN(price) ? 199 : price;
  });

  const [selectedMethod, setSelectedMethod] = useState("creditCard");

  const items = allProducts.map((product) => ({
    name: product.name || "Unknown",
    price: Number(product.price) || 0,
    quantity: Number(product.quantity) || 1,
  }));

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discount = subtotal > finalPrice ? subtotal - finalPrice : 0;

  const orderSummary = {
    items,
    subtotal,
    discount,
    shipping: 50,
  };

  const paymentSuccess = ()=>{
   navigate("/success")
  }

  const calculateTotal = () =>
    (Number(finalPrice) || 0) + (orderSummary.shipping || 0);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4">
            {orderSummary.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t mt-6 pt-6 space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{orderSummary.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{orderSummary.discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{orderSummary.shipping.toLocaleString()}</span>
            </div>
          </div>

          <div className="border-t mt-6 pt-6 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{calculateTotal().toLocaleString()}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>

          <div className="space-y-4">
            {/* Payment Options */}
            {[
              { value: "creditCard", label: "Credit/Debit Card" },
              { value: "upi", label: "UPI" },
              { value: "netBanking", label: "Net Banking" },
              { value: "cod", label: "Cash on Delivery (COD)" },
            ].map((method) => (
              <div
                key={method.value}
                className={`border rounded-lg p-4 ${
                  selectedMethod === method.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={selectedMethod === method.value}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="h-5 w-5 text-blue-600"
                  />
                  <span className="font-medium">{method.label}</span>
                </label>

                {/* Conditional Inputs for Card/UPI */}
                {selectedMethod === "creditCard" && method.value === "creditCard" && (
                  <div className="mt-4 space-y-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full p-2 border rounded-md"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full p-2 border rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                  </div>
                )}

                {selectedMethod === "upi" && method.value === "upi" && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pay Button */}
          <button
           onClick={paymentSuccess}
          className="w-full mt-8 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Pay ₹{calculateTotal().toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
