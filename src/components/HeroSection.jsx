import React, { useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import shoes from "/shoes.png";
import { loadSlim } from "tsparticles-slim";

const HeroSection = () => {
  const videoRef = useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  function mixColors(color1, color2, weight) {
    // Simple color mixing function
    const d2h = (d) => d.toString(16);
    const h2d = (h) => parseInt(h, 16);

    let result = "#";
    for (let i = 1; i < 7; i += 2) {
      const v1 = h2d(color1.substr(i, 2));
      const v2 = h2d(color2.substr(i, 2));
      const val = d2h(Math.floor(v2 + (v1 - v2) * weight));
      result += ("0" + val).substr(-2);
    }
    return result;
  }

  // 3D shoe rotation angles
  const shoeAngles = [0, 25, -25, 15, -15];
  const [currentAngle, setCurrentAngle] = React.useState(0);

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }

    // Rotate shoe every 3 seconds
    const interval = setInterval(() => {
      setCurrentAngle(
        (prev) => shoeAngles[(shoeAngles.indexOf(prev) + 1) % shoeAngles.length]
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [inView]);

  const particlesInit = useCallback(async (engine) => {
    try {
      await loadSlim(engine);
    } catch (error) {
      console.error("Error initializing particles:", error);
      const { loadBasic } = await import("tsparticles-basic");
      await loadBasic(engine);
    }
  }, []);

  // Neon color palette
  const neonColors = ["#08f7fe", "#00ff85", "#fe53bb", "#f5d300", "#ff4d00"];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900 pt-20 lg:pt-0"
    >
      {/* Base dark gray background */}
      <div className="absolute inset-0 bg-gray-900 z-0" />

      {/* Background Video */}
      <div className="absolute inset-0 z-1 overflow-hidden opacity-20">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video/shoes.webm" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 z-2 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(circle at 30% 50%, ${neonColors[0]}20 0%, transparent 50%)`,
              `radial-gradient(circle at 70% 30%, ${neonColors[1]}20 0%, transparent 50%)`,
              `radial-gradient(circle at 20% 70%, ${neonColors[2]}20 0%, transparent 50%)`,
              `radial-gradient(circle at 80% 80%, ${neonColors[3]}20 0%, transparent 50%)`,
              `radial-gradient(circle at 50% 20%, ${neonColors[4]}20 0%, transparent 50%)`,
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      </div>

      {/* Particle Network */}
      <div className="absolute inset-0 z-3">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fpsLimit: 120,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
            },
            particles: {
              color: {
                value: neonColors,
              },
              links: {
                color: "#ffffff",
                distance: 100,
                enable: true,
                opacity: 0.1,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: "bounce",
                random: true,
                speed: 0.5,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 60,
              },
              opacity: {
                value: 0.5,
                animation: {
                  enable: true,
                  speed: 1,
                },
              },
              shape: {
                type: ["circle", "triangle", "star"],
              },
              size: {
                value: { min: 0.5, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full py-10 lg:py-0">
        
        <div className="pt-10 pb-30 px-20 flex flex-col lg:flex-row items-center justify-center">
          {/* Text Content - Left Side */}
        <div className="w-full p-10 lg:w-1/2 h-auto lg:h-full flex items-center justify-center lg:justify-start pr-0 lg:pr-16 order-2 lg:order-1 mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl px-4 sm:px-0"
          >
            <div className="text-sm uppercase tracking-widest text-white mb-4 flex items-center">
              <motion.div
                className="w-4 h-4 rounded-full mr-2"
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
              <span>Limited Edition</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              <span className="block">DEFY</span>
              <motion.span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
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
                GRAVITY
              </motion.span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-10">
              The ultimate performance shoe engineered with
              <span className="font-bold"> QuantumAir™</span> cushioning and
              <span className="font-bold"> HyperWeave™</span> technology for
              unparalleled speed and comfort.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center mb-8 sm:mb-12">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 15px ${neonColors[0]}`,
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-white text-black font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 group"
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

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-transparent border-2 border-white text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 group"
              >
                <span className="relative z-10">View Tech Specs</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </motion.button>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { value: "37%", label: "More Responsive" },
                { value: "2.1x", label: "Better Traction" },
                { value: "190g", label: "Lighter" },
                { value: "360°", label: "Airflow" },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  className="bg-gray-800 bg-opacity-60 backdrop-blur-sm border border-gray-700 rounded-lg p-3 sm:p-4"
                >
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    {metric.value}
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3D Shoe Display - Right Side */}
        <motion.div
          className="w-full lg:w-1/2 h-auto lg:h-full flex items-center justify-center lg:justify-start pl-0 lg:pl-16 order-1 lg:order-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full max-w-md lg:max-w-xl h-64 sm:h-80 md:h-96 lg:h-1/2">
            <motion.div
              className="relative w-full h-full"
              animate={{
                rotateY: currentAngle,
              }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
              }}
            >
              <img
                src={shoes}
                alt="Next-Gen Shoe"
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute inset-0"
                animate={{
                  boxShadow: [
                    `0 0 20px ${neonColors[0]}60`,
                    `0 0 20px ${neonColors[1]}60`,
                    `0 0 20px ${neonColors[2]}60`,
                    `0 0 20px ${neonColors[3]}60`,
                    `0 0 20px ${neonColors[4]}60`,
                  ],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
              />
            </motion.div>

            {/* Floating Tech Tags */}
            <motion.div
              className="absolute left-0 bottom-1 flex flex-wrap gap-2 sm:gap-3 justify-center w-full lg:w-auto px-4 sm:px-8 lg:justify-start p-2 sm:p-3 rounded-xl"
              style={{
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                backgroundColor: "rgba(30, 30, 30, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              animate={{
                background: [
                  `linear-gradient(45deg, ${neonColors[0]}15, ${neonColors[1]}15)`,
                  `linear-gradient(45deg, ${neonColors[1]}15, ${neonColors[2]}15)`,
                  `linear-gradient(45deg, ${neonColors[2]}15, ${neonColors[3]}15)`,
                  `linear-gradient(45deg, ${neonColors[3]}15, ${neonColors[0]}15)`,
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            >
              {[
                { label: "AIR", color: neonColors[0] },
                { label: "ZOOM", color: neonColors[1] },
                { label: "FLY", color: neonColors[2] },
                { label: "X", color: neonColors[3] },
              ].map((tag, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 + 0.5 }}
                  className="px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    border: `1px solid ${tag.color}`,
                    color: mixColors(tag.color, "#ffffff", 0.7),
                    textShadow: `0 0 6px ${tag.color}`,
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                  }}
                >
                  {tag.label}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        </div>
        
      </div>

      {/* Scrolling Indicator - Centered */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center"
          >
            <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1 sm:mt-2" />
          </motion.div>
          <motion.p
            className="text-white text-xs mt-1 sm:mt-2 tracking-widest"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            SCROLL
          </motion.p>
        </div>
      </motion.div>

      {/* Animated Stats Bar - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-60 py-3 sm:py-4 z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-around">
            {[
              { number: "4.8M+", label: "Shoes Sold" },
              { number: "97%", label: "Positive Reviews" },
              { number: "42", label: "Pro Athletes" },
              { number: "12", label: "Innovation Awards" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="text-center mx-2 sm:mx-4 my-1 sm:my-2"
              >
                <motion.div
                  className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
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
                  {stat.number}
                </motion.div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
