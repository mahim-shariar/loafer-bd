import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// 3D Model Component with auto-rotate (pauses on interaction)
const InteractiveModel = ({ modelPath, autoRotate, setAutoRotate }) => {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();

  useFrame(() => {
    if (autoRotate) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return <primitive object={scene} ref={modelRef} />;
};

// Product Gallery Component
const ProductGallery = ({ product }) => {
  const [activeMedia, setActiveMedia] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const intervalRef = useRef();

  // Auto-cycle through media (stops on manual interaction)
  useEffect(() => {
    if (product.media.length > 1) {
      intervalRef.current = setInterval(() => {
        if (autoRotate) {
          setActiveMedia((prev) => (prev + 1) % product.media.length);
        }
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [autoRotate, product.media.length]);

  return (
    <div className="relative h-96 w-full bg-gray-100 rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        {product.media[activeMedia].type === "3d" ? (
          <motion.div
            key="3d-model"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <Canvas
              camera={{ position: [0, 0, 2.5], fov: 45 }}
              onPointerEnter={() => setAutoRotate(false)}
              onPointerLeave={() => setAutoRotate(true)}
            >
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <InteractiveModel
                modelPath={product.media[activeMedia].src}
                autoRotate={autoRotate}
                setAutoRotate={setAutoRotate}
              />
              <OrbitControls
                enableZoom={true}
                enablePan={false}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </motion.div>
        ) : (
          <motion.img
            key={`image-${activeMedia}`}
            src={product.media[activeMedia].src}
            alt={product.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </AnimatePresence>

      {/* Media selector thumbnails */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {product.media.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveMedia(index);
              setAutoRotate(false);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              activeMedia === index
                ? "bg-gray-900 scale-125"
                : "bg-gray-400 scale-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Category Filter Component
const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveCategory(category)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category
              ? "bg-gray-900 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
};

// Main Product Grid Section
const NextGenProductGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleProducts, setVisibleProducts] = useState(6);

  // Sample data
  const categories = ["All", "Running", "Casual", "Athletic", "Limited"];
  
  const products = [
    {
      id: 1,
      name: "Quantum X-9000",
      price: 199,
      category: "Running",
      description: "Zero-gravity cushioning with adaptive rebound",
      media: [
        { type: "3d", src: "/shoe-draco-show.glb" },
        { type: "image", src: "/shoes.png" },
        { type: "image", src: "/shoes.png" },
      ],
    },
    {
      id: 2,
      name: "Quantum X-9000",
      price: 199,
      category: "Casual",
      description: "Zero-gravity cushioning with adaptive rebound",
      media: [
        
        { type: "image", src: "/shoes.png" },
        { type: "image", src: "/shoes.png" },
      ],
    },
    {
      id: 3,
      name: "Quantum X-9000",
      price: 199,
      category: "Athletic",
      description: "Zero-gravity cushioning with adaptive rebound",
      media: [
        
        { type: "image", src: "/shoes.png" },
        { type: "image", src: "/shoes.png" },
      ],
    },
    {
      id: 4,
      name: "Quantum X-9000",
      price: 199,
      category: "Limited",
      description: "Zero-gravity cushioning with adaptive rebound",
      media: [
        
        { type: "image", src: "/shoes.png" },
        { type: "image", src: "/shoes.png" },
      ],
    },
    {
      id: 5,
      name: "Quantum X-9000",
      price: 199,
      category: "Running",
      description: "Zero-gravity cushioning with adaptive rebound",
      media: [
        
        { type: "image", src: "/shoes.png" },
        { type: "image", src: "/shoes.png" },
      ],
    },
    // Add more products with mixed media (3D models + images)
  ];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
              Explore
            </span>{" "}
            The Future
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interact with our next-gen collection in immersive 3D
          </p>
        </motion.div>

        {/* Category Filters */}
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.slice(0, visibleProducts).map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <ProductGallery product={product} />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {product.name}
                  </h3>
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm font-medium text-gray-900 hover:text-cyan-600 transition-colors"
                  >
                    View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleProducts < filteredProducts.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setVisibleProducts(prev => prev + 6)}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Load More
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default NextGenProductGrid;