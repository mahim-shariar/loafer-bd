import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in..." : "Signing up...", formData);
    // Add your authentication logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-teal-900 flex items-center justify-center p-4">
      {/* Animated card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          {/* Toggle tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 font-medium text-center transition-colors ${
                isLogin
                  ? "text-white bg-teal-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 font-medium text-center transition-colors ${
                !isLogin
                  ? "text-white bg-emerald-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form container */}
          <div className="p-8 relative">
            {/* Animated form switch */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-1">
                  {isLogin ? "Welcome back" : "Create account"}
                </h2>
                <p className="text-gray-400 mb-6">
                  {isLogin
                    ? "Sign in to access your account"
                    : "Join us to get started"}
                </p>

                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div className="mb-4">
                      <label className="block text-gray-300 text-sm mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="text-gray-500" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-500" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-300 text-sm mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-500" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <FiEyeOff className="text-gray-400 hover:text-white" />
                        ) : (
                          <FiEye className="text-gray-400 hover:text-white" />
                        )}
                      </button>
                    </div>
                  </div>

                  {isLogin && (
                    <div className="flex items-center justify-between mb-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-teal-500 bg-white/5 border-white/10 rounded focus:ring-teal-500"
                        />
                        <span className="ml-2 text-gray-400 text-sm">
                          Remember me
                        </span>
                      </label>
                      <a
                        href="#"
                        className="text-sm text-teal-400 hover:text-teal-300"
                      >
                        Forgot password?
                      </a>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center ${
                      isLogin
                        ? "bg-gradient-to-r from-teal-600 to-teal-500"
                        : "bg-gradient-to-r from-emerald-600 to-emerald-500"
                    }`}
                  >
                    {isLogin ? "Login" : "Create Account"}
                    <FiArrowRight className="ml-2" />
                  </motion.button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    {isLogin
                      ? "Don't have an account? "
                      : "Already have an account? "}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-teal-400 hover:text-teal-300 font-medium"
                    >
                      {isLogin ? "Sign up" : "Login"}
                    </button>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Or divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="px-4 text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center justify-center py-2 px-4 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                </svg>
                LinkedIn
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center justify-center py-2 px-4 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
