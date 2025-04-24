import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Navbar = () => {
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
    { name: "Home", href: "#" },
    { name: "Products", href: "#products" },
    { name: "Technology", href: "#tech" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
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
                href={item.href}
                className="relative text-white text-sm uppercase tracking-wider group"
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
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

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden bg-white text-black font-bold py-2 px-6 rounded-full text-sm transition-all duration-300 group"
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

          {/* Mobile menu button */}
          <div className="lg:hidden">
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
                    href={item.href}
                    className="text-white text-lg uppercase tracking-wider"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
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

export default Navbar;
