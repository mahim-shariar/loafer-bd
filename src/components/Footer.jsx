import React from "react";
import { motion } from "framer-motion";
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* New gradient background - Emerald Deep Ocean */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 opacity-95"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-teal-400"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold text-white">LOAFER BD</span>
            </div>
            <p className="text-gray-300 mb-6">
              Crafting the future of footwear with innovative design and premium
              materials.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  icon: FiInstagram,
                  color: "bg-gradient-to-r from-amber-500 to-pink-600",
                },
                {
                  icon: FiTwitter,
                  color: "bg-gradient-to-r from-sky-400 to-blue-500",
                },
                {
                  icon: FiFacebook,
                  color: "bg-gradient-to-r from-blue-500 to-indigo-600",
                },
                {
                  icon: FiYoutube,
                  color: "bg-gradient-to-r from-red-500 to-rose-600",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full ${social.color} flex items-center justify-center text-white`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Home", "Collections", "About Us", "Blog", "Contact"].map(
                (item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors flex items-center"
                    >
                      <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                      {item}
                    </a>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* Customer service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {[
                "FAQs",
                "Shipping Policy",
                "Returns & Exchanges",
                "Size Guide",
                "Privacy Policy",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiMail className="text-teal-400 mt-1 mr-4 flex-shrink-0" />
                <span className="text-gray-300">
                  support@quantumfootwear.com
                </span>
              </li>
              <li className="flex items-start">
                <FiPhone className="text-emerald-400 mt-1 mr-4 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <FiMapPin className="text-teal-400 mt-1 mr-4 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Fashion District, New York, NY 10001
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent my-12"
        ></motion.div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm mb-4 md:mb-0"
          >
            © {new Date().getFullYear()} Quantum Footwear. All rights reserved.
          </motion.p>

          <div className="flex space-x-6">
            {["Terms", "Privacy", "Cookies"].map((item, i) => (
              <motion.a
                key={i}
                href="#"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-gray-400 hover:text-teal-300 text-sm transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
