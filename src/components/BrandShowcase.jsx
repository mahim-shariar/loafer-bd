import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// 3D Model Component
const ShoeModel = ({ modelPath, scale = 1 }) => {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();

  useFrame(() => {
    modelRef.current.rotation.y += 0.005;
  });

  return <primitive object={scene} ref={modelRef} scale={scale} />;
};

// Product Card Component
const ProductCard = ({
  title,
  description,
  price,
  modelPath,
  scrollYProgress,
}) => {
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-2xl overflow-hidden"
      style={{ y, opacity, scale }}
    >
      <div className="h-96 relative">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <ShoeModel modelPath={modelPath} scale={1.5} />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">${price}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-medium"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Main Showcase Component
const BrandShowcase = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Sample product data
  const products = [
    {
      title: "Quantum Loafer Pro",
      description: "Premium leather with advanced cushioning technology",
      price: 249,
      modelPath: "/shoe-draco-2.glb", // Replace with your actual model paths
    },
    {
      title: "Neo Classic Oxford",
      description: "Timeless design meets modern comfort",
      price: 229,
      modelPath: "/shoe-draco-3.glb",
    },
    {
      title: "AirFlex Executive",
      description: "Breathable mesh with responsive sole",
      price: 279,
      modelPath: "/shoe-draco.glb",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gray-200 opacity-20"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
              Premium
            </span>{" "}
            Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience unparalleled comfort with our handcrafted loafers
            featuring cutting-edge technology.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12"
        >
          <div className="relative w-12 h-12">
            {/* Mouse SVG */}
            <svg viewBox="0 0 50 80" className="w-full h-full text-gray-700">
              <path
                d="M25,0 C35,0 45,8 45,18 L45,42 C45,52 35,60 25,60 C15,60 5,52 5,42 L5,18 C5,8 15,0 25,0 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              {/* Scrolling wheel animation */}
              <motion.circle
                cx="25"
                cy="20"
                r="3"
                fill="currentColor"
                animate={{
                  cy: [20, 30, 20],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </div>
          <p className="text-gray-600 text-center max-w-md">
            <span className="font-semibold">Click & drag</span> to rotate •{" "}
            <span className="font-semibold">Scroll</span> to zoom • Explore our
            products in 3D
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              title={product.title}
              description={product.description}
              price={product.price}
              modelPath={product.modelPath}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-20 flex flex-col items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 mb-2">Scroll to discover more</p>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandShowcase;
