import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

// 3D Model Component
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

// Media Gallery Component
const ProductGallery = ({ media }) => {
  const [activeMedia, setActiveMedia] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const intervalRef = useRef();

  // Auto-cycle through media
  useEffect(() => {
    if (media.length > 1) {
      intervalRef.current = setInterval(() => {
        if (autoRotate) {
          setActiveMedia((prev) => (prev + 1) % media.length);
        }
      }, 10000);
    }
    return () => clearInterval(intervalRef.current);
  }, [autoRotate, media.length]);

  return (
    <div className="relative h-96 w-full bg-gray-100 rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        {media[activeMedia]?.type === "3d" ? (
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
                modelPath={media[activeMedia].src}
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
            src={media[activeMedia]?.src}
            alt="Product"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </AnimatePresence>

      {/* Media selector dots */}
      {media.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {media.map((_, index) => (
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
      )}
    </div>
  );
};

// Main Product Card Component
const ProductCard = ({ 
  product,
  onAddToCart = () => {},
  onViewDetails = () => {}
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    } else {
      navigate(`/products/${product.id}`);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow w-full"
    >
      <ProductGallery media={product.media || []} />
      
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
            className="text-sm font-medium text-white py-2 px-4 rounded-full bg-black"
            onClick={handleViewDetails}
          >
            View Details
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-black px-4 py-2 rounded-full text-sm font-medium bg-white border-2 border-black hover:bg-gray-100"
            onClick={handleAddToCart}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;