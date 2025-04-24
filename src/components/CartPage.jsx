import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiTrash2, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const CartPage = () => {
  // Sample cart data (would normally come from state/context)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Quantum X-9000",
      price: 199,
      color: "Black",
      size: "9",
      quantity: 1,
      image: "/shoes.png",
      category: "Running",
    },
    {
      id: 2,
      name: "Neo Classic Oxford",
      price: 229,
      color: "Brown",
      size: "8",
      quantity: 2,
      image: "/oxford-brown.png",
      category: "Casual",
    },
    {
      id: 3,
      name: "AirFlex Pulse",
      price: 179,
      color: "Blue",
      size: "7",
      quantity: 1,
      image: "/airflex-blue.png",
      category: "Athletic",
    },
  ]);

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 200 ? 0 : 15; // Free shipping over $200
  const tax = subtotal * 0.08; // Example tax calculation
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart</h1>
          <div className="flex items-center text-gray-500">
            <Link to="/" className="text-cyan-600 hover:text-cyan-800">
              Home
            </Link>
            <FiChevronRight className="mx-2" />
            <span>Cart</span>
          </div>
        </div>

        {cartItems.length > 0 ? (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500 uppercase">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Cart Items */}
                <ul className="divide-y divide-gray-200">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="p-4"
                      >
                        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                          {/* Product Info */}
                          <div className="flex items-center md:col-span-5 w-full">
                            <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-contain"
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <h3 className="text-sm font-medium text-gray-900">
                                {item.name}
                              </h3>
                              <p className="text-xs text-gray-500 mt-1">
                                {item.color} / Size {item.size}
                              </p>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="md:hidden text-xs text-cyan-600 hover:text-cyan-800 mt-1"
                              >
                                Remove
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="hidden md:flex md:col-span-2 justify-center">
                            <p className="text-sm text-gray-900">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>

                          {/* Quantity */}
                          <div className="md:col-span-3 flex items-center justify-center">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-4 text-gray-400 hover:text-gray-600 hidden md:block"
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                          </div>

                          {/* Total */}
                          <div className="md:col-span-2 flex justify-end">
                            <p className="text-sm font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  to="/products"
                  className="text-sm font-medium text-cyan-600 hover:text-cyan-800 flex items-center"
                >
                  <FiChevronRight className="transform rotate-180 mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-8 lg:mt-0">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                {/* Price Breakdown */}
                <div className="space-y-3 border-b border-gray-200 pb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-sm text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Shipping</span>
                    <span className="text-sm text-gray-900">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        shipping.toFixed(2)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tax</span>
                    <span className="text-sm text-gray-900">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between mt-4 mb-6">
                  <span className="text-base font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 rounded-md font-medium shadow-md hover:shadow-lg transition-all"
                >
                  Proceed to Checkout
                </motion.button>

                {/* Payment Icons */}
                <div className="mt-4 flex justify-center space-x-4">
                  {["visa", "mastercard", "amex", "paypal"].map((method) => (
                    <div
                      key={method}
                      className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center"
                    >
                      {/* <img
                        src={/payment-${method}.svg}
                        alt={method}
                        className="h-4 object-contain"
                      /> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-12 text-center"
          >
            <div className="mx-auto h-24 w-24 text-gray-400">
              <FiShoppingBag className="h-full w-full" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Your cart is empty
            </h3>
            <p className="mt-2 text-gray-500">
              Start adding some products to your cart
            </p>
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800"
              >
                Browse Products
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
