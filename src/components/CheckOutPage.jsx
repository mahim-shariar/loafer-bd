import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCardIcon, TruckIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const CheckoutPage = () => {
  // Sample cart data (would normally come from props/state)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Quantum Loafer Pro",
      color: "Black",
      size: "8",
      price: 249,
      quantity: 1,
      image: "/shoes.png",
    },
    {
      id: 2,
      name: "Neo Classic Oxford",
      color: "Cognac",
      size: "9",
      price: 229,
      quantity: 2,
      image: "/shoes.png",
    },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    state: "",
    zip: "",
    phone: "",
    saveInfo: true,
    shippingMethod: "standard", // 'standard' or 'express'
    paymentMethod: "credit", // 'credit' or 'paypal'
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
    agreeTerms: false,
  });

  const [activeStep, setActiveStep] = useState(1); // 1 = info, 2 = shipping, 3 = payment

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = formData.shippingMethod === "standard" ? 9.99 : 19.99;
  const tax = subtotal * 0.08; // Example tax calculation
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          {/* Progress steps */}
          <div className="mt-6 flex justify-between">
            {["Information", "Shipping", "Payment"].map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeStep > index + 1
                      ? "bg-cyan-600 text-white"
                      : activeStep === index + 1
                      ? "border-2 border-cyan-600 text-cyan-600"
                      : "border-2 border-gray-300 text-gray-400"
                  } font-medium`}
                >
                  {index + 1}
                </div>
                <span
                  className={`mt-2 text-sm ${
                    activeStep >= index + 1
                      ? "text-cyan-600 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:flex lg:gap-8">
        {/* Left column - Form */}
        <div className="lg:w-2/3">
          {/* Step 1: Contact Information */}
          {activeStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 mb-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="saveInfo"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Save this information for next time
                  </label>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(2)}
                  className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium"
                >
                  Continue to Shipping
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Shipping Address */}
          {activeStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 mb-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="apartment"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                      required
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      State/Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      ZIP/Postal code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Shipping Method
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md cursor-pointer hover:border-cyan-500">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="standardShipping"
                        name="shippingMethod"
                        value="standard"
                        checked={formData.shippingMethod === "standard"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500"
                      />
                      <div className="ml-3">
                        <label
                          htmlFor="standardShipping"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Standard Shipping
                        </label>
                        <p className="text-sm text-gray-500">
                          5-7 business days
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      $9.99
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md cursor-pointer hover:border-cyan-500">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="expressShipping"
                        name="shippingMethod"
                        value="express"
                        checked={formData.shippingMethod === "express"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500"
                      />
                      <div className="ml-3">
                        <label
                          htmlFor="expressShipping"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Express Shipping
                        </label>
                        <p className="text-sm text-gray-500">
                          2-3 business days
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      $19.99
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(1)}
                  className="text-gray-700 px-6 py-3 rounded-md font-medium border border-gray-300"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(3)}
                  className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium"
                >
                  Continue to Payment
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {activeStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 mb-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Payment Method
              </h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="creditCard"
                        name="paymentMethod"
                        value="credit"
                        checked={formData.paymentMethod === "credit"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500"
                      />
                      <label
                        htmlFor="creditCard"
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        Credit Card
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="paypal"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500"
                      />
                      <label
                        htmlFor="paypal"
                        className="ml-2 block text-sm font-medium text-gray-700"
                      >
                        PayPal
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === "credit" && (
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="cardNumber"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Card number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="0000 0000 0000 0000"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 pl-10"
                            required
                          />
                          <CreditCardIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="cardName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Name on card
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="cardExpiry"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Expiration date (MM/YY)
                          </label>
                          <input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="cardCvc"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cardCvc"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                    required
                  />
                  <label
                    htmlFor="agreeTerms"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-cyan-600 hover:text-cyan-800">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-cyan-600 hover:text-cyan-800">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(2)}
                  className="text-gray-700 px-6 py-3 rounded-md font-medium border border-gray-300"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-md font-medium"
                >
                  Complete Order
                </motion.button>
              </div>

              <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                <LockClosedIcon className="h-4 w-4 mr-1" />
                <span>Secure checkout</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right column - Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start">
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {item.color} / Size {item.size}
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-gray-600"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-gray-600"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-sm font-medium text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Shipping</span>
                <span className="text-sm font-medium text-gray-900">
                  ${shippingCost.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tax</span>
                <span className="text-sm font-medium text-gray-900">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="text-base font-medium text-gray-900">Total</span>
                <span className="text-base font-bold text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Shipping Info */}
            {activeStep >= 2 && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Shipping to
                </h3>
                <p className="text-sm text-gray-600">
                  {formData.address}, {formData.city}, {formData.state}{" "}
                  {formData.zip}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.country}
                </p>
                <p className="text-sm text-gray-600 mt-1">{formData.phone}</p>
                <button
                  onClick={() => setActiveStep(2)}
                  className="mt-2 text-sm text-cyan-600 hover:text-cyan-800"
                >
                  Change
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;