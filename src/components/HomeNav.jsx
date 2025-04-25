import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const HomeNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Neon color palette
  const neonColors = ["#08f7fe", "#00ff85", "#fe53bb", "#f5d300", "#ff4d00"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <motion.nav
      ref={ref}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-black bg-opacity-90 backdrop-blur-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className=" mx-auto px-12 py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 10px ${neonColors[0]}`,
                  `0 0 10px ${neonColors[1]}`,
                  `0 0 10px ${neonColors[2]}`,
                  `0 0 10px ${neonColors[3]}`,
                  `0 0 10px ${neonColors[4]}`,
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center mr-3"
            >
              <span className="text-white font-bold text-xl">L</span>
            </motion.div>
            <motion.span
              className="text-white font-bold text-2xl bg-clip-text  bg-gradient-to-r from-cyan-400 to-purple-500"
              animate={{
                backgroundImage: [
                  `linear-gradient(to right, ${neonColors[0]}, ${neonColors[1]})`,
                  `linear-gradient(to right, ${neonColors[1]}, ${neonColors[2]})`,
                  `linear-gradient(to right, ${neonColors[2]}, ${neonColors[3]})`,
                  `linear-gradient(to right, ${neonColors[3]}, ${neonColors[4]})`,
                  `linear-gradient(to right, ${neonColors[4]}, ${neonColors[0]})`,
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            >
              Loafer Bd
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                className="relative text-white text-sm uppercase tracking-wider group"
                whileHover={{ scale: 1.05 }}
              >
                <Link to={item.href}>{item.name}</Link>
                
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
                  initial={{ width: 0 }}
                  animate={{
                    backgroundColor: neonColors,
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  }}
                />
              </motion.a>
            ))}

            {/* Cart Button */}
            <Link to="/cart">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-white"
                aria-label="Shopping Cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <motion.span
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  3
                </motion.span>
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden bg-white text-black font-bold py-2 px-6 rounded-full text-sm transition-all duration-300 group"
            >
              <Link to="/auth" className="relative z-10">
                Login
              </Link>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  backgroundImage: [
                    `linear-gradient(to right, ${neonColors[0]}, ${neonColors[1]})`,
                    `linear-gradient(to right, ${neonColors[1]}, ${neonColors[2]})`,
                    `linear-gradient(to right, ${neonColors[2]}, ${neonColors[3]})`,
                    `linear-gradient(to right, ${neonColors[3]}, ${neonColors[4]})`,
                    `linear-gradient(to right, ${neonColors[4]}, ${neonColors[0]})`,
                  ],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
              />
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            {/* Cart Button - Mobile */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-white mr-4"
              aria-label="Shopping Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <motion.span
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                3
              </motion.span>
            </motion.button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black bg-opacity-90 backdrop-blur-md overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col space-y-6">
                {navItems.map((item, index) => (
                  <motion.a
                    key={index}
                    className="text-white text-lg uppercase tracking-wider"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsOpen(false)}
                  >
                      <Link to={item.href}>{item.name}</Link>
                  </motion.a>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden bg-white text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 group mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <span className="relative z-10">Shop Now</span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      backgroundImage: [
                        `linear-gradient(to right, ${neonColors[0]}, ${neonColors[1]})`,
                        `linear-gradient(to right, ${neonColors[1]}, ${neonColors[2]})`,
                        `linear-gradient(to right, ${neonColors[2]}, ${neonColors[3]})`,
                        `linear-gradient(to right, ${neonColors[3]}, ${neonColors[4]})`,
                        `linear-gradient(to right, ${neonColors[4]}, ${neonColors[0]})`,
                      ],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "linear",
                    }}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default HomeNav;
