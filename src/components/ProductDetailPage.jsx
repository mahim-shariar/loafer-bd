import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { StarIcon } from "@heroicons/react/24/solid";

// Neon color gradients
const neonColors = ["#08f7fe", "#00ff85", "#fe53bb", "#f5d300", "#ff4d00"];
const neonGradients = [
  `linear-gradient(135deg, ${neonColors[0]}, ${neonColors[1]})`,
  `linear-gradient(135deg, ${neonColors[2]}, ${neonColors[3]})`,
  `linear-gradient(135deg, ${neonColors[1]}, ${neonColors[4]})`,
  `linear-gradient(135deg, ${neonColors[3]}, ${neonColors[0]})`,
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

// 3D Model Component
const ProductModel = ({ modelPath, autoRotate }) => {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();

  useFrame(() => {
    if (autoRotate) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return <primitive object={scene} ref={modelRef} />;
};

// Animated Section Wrapper
const AnimatedSection = ({ children, className }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Size Selector Component
const SizeSelector = ({ sizes, selectedSize, setSelectedSize }) => {
  return (
    <motion.div variants={itemVariants} className="mb-6">
      <h3 className="text-sm font-medium text-sky-600 mb-3">Size</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <motion.button
            key={size}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSize(size)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              selectedSize === size
                ? "text-white shadow-lg"
                : "bg-white text-gray-800 hover:bg-gray-50 border border-gray-200"
            }`}
            style={{
              background: selectedSize === size ? neonGradients[0] : undefined,
            }}
          >
            {size}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Color Selector Component
const ColorSelector = ({ colors, selectedColor, setSelectedColor }) => {
  return (
    <motion.div variants={itemVariants} className="mb-8">
      <h3 className="text-sm font-medium text-sky-600 mb-3">Color</h3>
      <div className="flex gap-3">
        {colors.map((color) => (
          <motion.button
            key={color.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              selectedColor.name === color.name
                ? "scale-110 shadow-md"
                : "border-transparent"
            }`}
            style={{
              backgroundColor: color.hex,
              borderColor: selectedColor.name === color.name ? neonColors[0] : undefined,
            }}
            aria-label={color.name}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Review Component
const Review = ({ review }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="border-b border-gray-100 py-6"
    >
      <div className="flex items-center mb-3">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-5 w-5 ${
                i < review.rating ? "text-amber-400" : "text-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="ml-3 text-sm font-medium text-gray-800">
          {review.author}
        </p>
        <p className="ml-auto text-sm text-gray-500">{review.date}</p>
      </div>
      <p className="text-gray-600">{review.content}</p>
    </motion.div>
  );
};

// Comment Component
const Comment = ({ comment }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="border-b border-gray-100 py-6"
    >
      <div className="flex items-center mb-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 mr-3 flex items-center justify-center text-sky-600 font-medium"
        >
          {comment.author.charAt(0)}
        </motion.div>
        <p className="text-sm font-medium text-gray-800">{comment.author}</p>
        <p className="ml-auto text-sm text-gray-500">{comment.date}</p>
      </div>
      <p className="text-gray-600">{comment.content}</p>
    </motion.div>
  );
};

// Comment Form Component
const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit({
        author: "You",
        date: "Just now",
        content: comment,
      });
      setComment("");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      onSubmit={handleSubmit}
      className="mt-8"
    >
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-sky-600 mb-2">
          Add your comment
        </label>
        <motion.textarea
          whileFocus={{ scale: 1.01 }}
          id="comment"
          rows="3"
          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this product..."
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="text-white py-2 px-6 rounded-full font-medium text-sm shadow-lg w-full sm:w-auto"
        style={{ background: neonGradients[1] }}
      >
        Post Comment
      </motion.button>
    </motion.form>
  );
};

// Product Detail Page
const ProductDetailPage = () => {
  const [activeMedia, setActiveMedia] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedSize, setSelectedSize] = useState("8");
  const [selectedColor, setSelectedColor] = useState({
    name: "Black",
    hex: "#000000",
  });
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "TechEnthusiast42",
      date: "3 days ago",
      content: "The 3D model viewer is amazing! Really shows off the product details.",
    },
    {
      id: 2,
      author: "FutureShopper",
      date: "1 week ago",
      content: "Can't wait to get my hands on these. The design is futuristic!",
    },
  ]);

  // Sample product data
  const product = {
    id: 1,
    name: "Quantum Loafer Pro",
    price: 249,
    description:
      "Premium leather with advanced cushioning technology for all-day comfort.",
    category: "Loafers",
    features: [
      "QuantumAir™ cushioning",
      "Italian full-grain leather",
      "Handcrafted construction",
      "Anti-slip rubber sole",
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Cognac", hex: "#9A5B34" },
      { name: "Navy", hex: "#001F3F" },
    ],
    media: [
      { type: "3d", src: "/loafer.glb" },
      { type: "image", src: "/shoes.png" },
      { type: "image", src: "/shoes.png" },
      { type: "image", src: "/shoes.png" },
    ],
    reviews: [
      {
        id: 1,
        author: "Alex M.",
        rating: 5,
        date: "2 weeks ago",
        content:
          "The most comfortable loafers I've ever worn. Worth every penny!",
      },
      {
        id: 2,
        author: "Jordan K.",
        rating: 4,
        date: "1 month ago",
        content: "Great shoes but took a while to break in. Now they're perfect!",
      },
    ],
    rating: 4.8,
    reviewCount: 124,
  };

  // Auto-cycle through media
  useEffect(() => {
    if (product.media.length > 1) {
      const interval = setInterval(() => {
        if (autoRotate) {
          setActiveMedia((prev) => (prev + 1) % product.media.length);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRotate, product.media.length]);

  const handleAddComment = (newComment) => {
    setComments([...comments, {
      ...newComment,
      id: comments.length + 1,
    }]);
  };

  return (
    <div className="bg-gray-50">
      {/* Main Product Section */}
      <AnimatedSection className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
            {/* Media Gallery */}
            <motion.div
              variants={fadeInVariants}
              className="mb-10 lg:mb-0"
            >
              <div className="relative h-96 lg:h-[500px] w-full bg-white rounded-2xl overflow-hidden shadow-xl">
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
                        <spotLight
                          position={[10, 10, 10]}
                          angle={0.15}
                          penumbra={1}
                        />
                        <ProductModel
                          modelPath={product.media[activeMedia].src}
                          autoRotate={autoRotate}
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
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => {
                        setActiveMedia(index);
                        setAutoRotate(false);
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        activeMedia === index
                          ? "scale-125"
                          : "bg-gray-300 scale-100"
                      }`}
                      style={{
                        background: activeMedia === index ? neonColors[0] : undefined,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div variants={containerVariants}>
              <motion.h1
                variants={itemVariants}
                className="text-3xl font-bold text-gray-900 sm:text-4xl"
              >
                {product.name}
              </motion.h1>

              {/* Price */}
              <motion.div variants={itemVariants} className="mt-4">
                <p className="text-3xl font-bold text-sky-600">${product.price}</p>
                <p className="text-sm text-gray-500 mt-1">Including VAT</p>
              </motion.div>

              {/* Rating */}
              <motion.div variants={itemVariants} className="mt-4 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-amber-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm font-medium text-gray-800">
                  {product.rating} ({product.reviewCount} reviews)
                </p>
              </motion.div>

              {/* Description */}
              <motion.div variants={itemVariants} className="mt-6">
                <h2 className="text-sm font-medium text-sky-600">Description</h2>
                <p className="mt-2 text-gray-600">{product.description}</p>
              </motion.div>

              {/* Color Selector */}
              <ColorSelector
                colors={product.colors}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />

              {/* Size Selector */}
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />

              {/* Quantity */}
              <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-sm font-medium text-sky-600 mb-3">
                  Quantity
                </h3>
                <div className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-l-md border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >
                    -
                  </motion.button>
                  <div className="w-12 h-10 border-t border-b border-gray-200 flex items-center justify-center text-gray-900">
                    {quantity}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-r-md border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >
                    +
                  </motion.button>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 text-white py-3 px-6 rounded-full font-medium text-sm sm:text-base shadow-lg bg-black"
                  
                >
                    Buy Now
                  
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 text-back py-3 px-6 rounded-full font-medium text-sm sm:text-base shadow-lg bg-white border-2 border-black"
                >
                  Add to Cart
                </motion.button>
              </motion.div>

              {/* Features */}
              <motion.div variants={itemVariants} className="mt-8">
                <h2 className="text-sm font-medium text-sky-600 mb-3">
                  Features
                </h2>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      whileHover={{ x: 5 }}
                      className="flex items-center"
                    >
                      <svg
                        className="h-5 w-5 text-sky-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Reviews Section */}
      <AnimatedSection className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-8">
            Customer Reviews
          </motion.h2>
          <div className="max-w-3xl">
            {product.reviews.map((review) => (
              <Review key={review.id} review={review} />
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 font-medium"
              style={{ color: neonColors[0] }}
            >
              View all {product.reviewCount} reviews
            </motion.button>
          </div>
        </div>
      </AnimatedSection>

      {/* Comments Section */}
      <AnimatedSection className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-8">
            Community Discussion
          </motion.h2>
          <motion.div
            variants={containerVariants}
            className="max-w-3xl bg-white p-6 rounded-xl shadow-sm"
          >
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
            <CommentForm onSubmit={handleAddComment} />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Similar Products */}
      <AnimatedSection className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-8">
            You May Also Like
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Similar products would be rendered here */}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ProductDetailPage;