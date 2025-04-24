import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { FiSearch, FiFilter, FiX, FiChevronDown, FiStar } from "react-icons/fi";
import { useNotification } from "./NotificationContext";
import { useNavigate } from "react-router-dom";

// Sample products data
const products = [
  {
    id: 1,
    name: "Quantum X-9000",
    price: 199,
    category: "Running",
    color: "Black",
    size: ["8", "9", "10"],
    gender: "Men",
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    description: "Zero-gravity cushioning with adaptive rebound technology",
    media: [
      { type: "3d", src: "/shoe-draco-show.glb" },
      { type: "image", src: "/shoes.png" },
      { type: "image", src: "/shoes-side.png" },
    ],
  },
  {
    id: 2,
    name: "Neo Classic Oxford",
    price: 229,
    category: "Casual",
    color: "Brown",
    size: ["7", "8", "9", "11"],
    gender: "Men",
    rating: 4.6,
    reviewCount: 89,
    description: "Premium leather with timeless design",
    media: [
      { type: "image", src: "/oxford-brown.png" },
      { type: "image", src: "/oxford-side.png" },
    ],
  },
  {
    id: 3,
    name: "AirFlex Pulse",
    price: 179,
    category: "Athletic",
    color: "Blue",
    size: ["6", "7", "8", "9"],
    gender: "Women",
    rating: 4.7,
    reviewCount: 156,
    isNew: true,
    description: "Lightweight mesh with responsive sole",
    media: [
      { type: "3d", src: "/shoe-draco-show.glb" },
      { type: "image", src: "/airflex-blue.png" },
    ],
  },
  {
    id: 4,
    name: "Limited Edition Carbon",
    price: 349,
    category: "Limited",
    color: "Black",
    size: ["9", "10", "11"],
    gender: "Unisex",
    rating: 4.9,
    reviewCount: 42,
    description: "Carbon fiber reinforced performance shoe",
    media: [
      { type: "image", src: "/carbon-black.png" },
      { type: "image", src: "/carbon-detail.png" },
    ],
  },
  {
    id: 5,
    name: "Trailblazer Pro",
    price: 159,
    category: "Running",
    color: "Green",
    size: ["8", "9", "10", "12"],
    gender: "Men",
    rating: 4.5,
    reviewCount: 67,
    description: "All-terrain grip with waterproof membrane",
    media: [
      { type: "image", src: "/trailblazer-green.png" },
      { type: "image", src: "/trailblazer-tread.png" },
    ],
  },
  {
    id: 6,
    name: "Velocity Racer",
    price: 189,
    category: "Athletic",
    color: "Red",
    size: ["7", "8", "9"],
    gender: "Women",
    rating: 4.3,
    reviewCount: 53,
    description: "Speed-focused design with breathable upper",
    media: [
      { type: "3d", src: "/shoe-draco-show.glb" },
      { type: "image", src: "/velocity-red.png" },
    ],
  },
  {
    id: 7,
    name: "Cloudstride",
    price: 219,
    category: "Running",
    color: "White",
    size: ["8", "9", "10", "11"],
    gender: "Unisex",
    rating: 4.7,
    reviewCount: 98,
    isNew: true,
    description: "Ultra-soft cushioning for all-day comfort",
    media: [
      { type: "image", src: "/cloudstride-white.png" },
      { type: "image", src: "/cloudstride-sole.png" },
    ],
  },
];

// 3D Model Component
const ProductModel = ({ modelPath, autoRotate }) => {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();

  useFrame(() => {
    if (autoRotate) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return <primitive object={scene} ref={modelRef} scale={0.8} />;
};

// Product Card Component
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const { addNotification } = useNotification();

  const handleAddToCart = () => {
    addNotification("Product added to cart", product.name);
  };

  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div
        className="relative h-64 w-full bg-gray-100 cursor-pointer"
        onClick={() =>
          setCurrentMediaIndex((prev) => (prev + 1) % product.media.length)
        }
      >
        <AnimatePresence mode="wait">
          {product.media[currentMediaIndex].type === "3d" ? (
            <motion.div
              key="3d-model"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <Canvas
                camera={{ position: [0, 0, 2.5], fov: 45 }}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
              >
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <ProductModel
                  modelPath={product.media[currentMediaIndex].src}
                  autoRotate={isHovered}
                />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI / 2}
                />
              </Canvas>
            </motion.div>
          ) : (
            <motion.img
              key={`image-${currentMediaIndex}`}
              src={product.media[currentMediaIndex].src}
              alt={product.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-contain"
            />
          )}
        </AnimatePresence>

        {product.isNew && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 left-3 bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-full"
          >
            NEW
          </motion.div>
        )}

        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
          {product.media.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentMediaIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                currentMediaIndex === index
                  ? "bg-gray-900 scale-125"
                  : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
            <p className="text-xs text-gray-500 capitalize">
              {product.color} • {product.category}
            </p>
          </div>
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
        </div>

        <div className="flex items-center mt-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviewCount})
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm font-medium text-white transition-colors  py-2 px-4 rounded-full bg-black"
            onClick={() => navigate("/product")}
          >
            View Details
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=" text-black px-4 py-2 rounded-full text-sm font-medium bg-white border-2 border-black hover:bg-gray-100 transition-colors "
            onClick={handleAddToCart}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Filter Accordion Component
const FilterAccordion = ({ title, children, isOpen, toggle }) => {
  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={toggle}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="font-medium text-gray-900">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="h-5 w-5 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pt-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Product Listing Page
const ProductListingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    price: [],
    color: [],
    size: [],
    gender: [],
    rating: [],
  });

  // Get all unique filter options from products
  const allCategories = [...new Set(products.map((p) => p.category))];
  const allColors = [...new Set(products.map((p) => p.color))];
  const allSizes = [...new Set(products.flatMap((p) => p.size))];
  const allGenders = [...new Set(products.map((p) => p.gender))];

  const priceRanges = [
    { label: "Under $100", value: "0-100", test: (p) => p.price < 100 },
    {
      label: "$100 - $200",
      value: "100-200",
      test: (p) => p.price >= 100 && p.price < 200,
    },
    {
      label: "$200 - $300",
      value: "200-300",
      test: (p) => p.price >= 200 && p.price < 300,
    },
    { label: "Over $300", value: "300-1000", test: (p) => p.price >= 300 },
  ];

  const ratingOptions = [
    { label: "5 Stars", value: "5", test: (p) => p.rating >= 5 },
    { label: "4 Stars & Up", value: "4", test: (p) => p.rating >= 4 },
    { label: "3 Stars & Up", value: "3", test: (p) => p.rating >= 3 },
  ];

  // Filter products based on active filters and search query
  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      activeFilters.category.length === 0 ||
      activeFilters.category.includes(product.category);

    // Price filter
    const matchesPrice =
      activeFilters.price.length === 0 ||
      activeFilters.price.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return product.price >= min && product.price <= max;
      });

    // Color filter
    const matchesColor =
      activeFilters.color.length === 0 ||
      activeFilters.color.includes(product.color);

    // Size filter
    const matchesSize =
      activeFilters.size.length === 0 ||
      activeFilters.size.some((size) => product.size.includes(size));

    // Gender filter
    const matchesGender =
      activeFilters.gender.length === 0 ||
      activeFilters.gender.includes(product.gender);

    // Rating filter
    const matchesRating =
      activeFilters.rating.length === 0 ||
      activeFilters.rating.some((rating) => {
        const minRating = Number(rating);
        return product.rating >= minRating;
      });

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesColor &&
      matchesSize &&
      matchesGender &&
      matchesRating
    );
  });

  // Toggle filter
  const toggleFilter = (filterType, value) => {
    setActiveFilters((prev) => {
      const currentFilters = [...prev[filterType]];
      const index = currentFilters.indexOf(value);

      if (index === -1) {
        currentFilters.push(value);
      } else {
        currentFilters.splice(index, 1);
      }

      return { ...prev, [filterType]: currentFilters };
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      category: [],
      price: [],
      color: [],
      size: [],
      gender: [],
      rating: [],
    });
    setSearchQuery("");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sticky Search Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl mx-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Mobile Filter Button */}
            <button
              type="button"
              className="md:hidden p-2 text-gray-400 hover:text-gray-500"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FiFilter className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                {(Object.values(activeFilters).flat().length > 0 ||
                  searchQuery) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-cyan-600 hover:text-cyan-800"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <FilterAccordion title="Category" isOpen={true} toggle={() => {}}>
                <div className="space-y-2">
                  {allCategories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        type="checkbox"
                        checked={activeFilters.category.includes(category)}
                        onChange={() => toggleFilter("category", category)}
                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-3 text-sm text-gray-600 capitalize"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </FilterAccordion>

              {/* Price Filter */}
              <FilterAccordion title="Price" isOpen={true} toggle={() => {}}>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div key={range.value} className="flex items-center">
                      <input
                        id={`price-${range.value}`}
                        type="checkbox"
                        checked={activeFilters.price.includes(range.value)}
                        onChange={() => toggleFilter("price", range.value)}
                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`price-${range.value}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </FilterAccordion>

              {/* Color Filter */}
              <FilterAccordion title="Color" isOpen={true} toggle={() => {}}>
                <div className="space-y-2">
                  {allColors.map((color) => (
                    <div key={color} className="flex items-center">
                      <input
                        id={`color-${color}`}
                        type="checkbox"
                        checked={activeFilters.color.includes(color)}
                        onChange={() => toggleFilter("color", color)}
                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`color-${color}`}
                        className="ml-3 text-sm text-gray-600 capitalize"
                      >
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </FilterAccordion>

              {/* Size Filter */}
              <FilterAccordion title="Size" isOpen={true} toggle={() => {}}>
                <div className="grid grid-cols-3 gap-2">
                  {allSizes.sort().map((size) => (
                    <div key={size} className="flex items-center">
                      <input
                        id={`size-${size}`}
                        type="checkbox"
                        checked={activeFilters.size.includes(size)}
                        onChange={() => toggleFilter("size", size)}
                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`size-${size}`}
                        className="ml-1 text-sm text-gray-600"
                      >
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </FilterAccordion>

              {/* Gender Filter */}
              <FilterAccordion title="Gender" isOpen={true} toggle={() => {}}>
                <div className="space-y-2">
                  {allGenders.map((gender) => (
                    <div key={gender} className="flex items-center">
                      <input
                        id={`gender-${gender}`}
                        type="checkbox"
                        checked={activeFilters.gender.includes(gender)}
                        onChange={() => toggleFilter("gender", gender)}
                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`gender-${gender}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
              </FilterAccordion>

              {/* Rating Filter */}
              <FilterAccordion title="Rating" isOpen={true} toggle={() => {}}>
                <div className="space-y-2">
                  {ratingOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`rating-${option.value}`}
                        type="checkbox"
                        checked={activeFilters.rating.includes(option.value)}
                        onChange={() => toggleFilter("rating", option.value)}
                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`rating-${option.value}`}
                        className="ml-3 text-sm text-gray-600 flex items-center"
                      >
                        {option.label}
                        <div className="flex ml-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`h-3 w-3 ${
                                i < Number(option.value)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </FilterAccordion>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {/* Active Filters */}
            {(Object.values(activeFilters).flat().length > 0 ||
              searchQuery) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {searchQuery && (
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                    >
                      Search: "{searchQuery}"
                      <button
                        onClick={() => setSearchQuery("")}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </motion.div>
                  )}
                  {Object.entries(activeFilters).map(([filterType, values]) =>
                    values.map((value) => (
                      <motion.button
                        key={`${filterType}-${value}`}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => toggleFilter(filterType, value)}
                        className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                      >
                        {filterType}: {value}
                        <FiX className="ml-1 h-3 w-3" />
                      </motion.button>
                    ))
                  )}
                  {(Object.values(activeFilters).flat().length > 0 ||
                    searchQuery) && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-cyan-600 hover:text-cyan-800"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </h2>
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                  <option>Highest Rated</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearAllFilters}
                  className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Reset filters
                </motion.button>
              </motion.div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 flex justify-center"
              >
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded-md bg-gray-900 text-white text-sm font-medium">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <span className="px-3 py-1 text-sm text-gray-500">...</span>
                  <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    8
                  </button>
                  <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filters */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-20"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl z-30 overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                {/* Mobile Filter Content */}
                <div className="py-4">
                  <FilterAccordion
                    title="Category"
                    isOpen={true}
                    toggle={() => {}}
                  >
                    <div className="space-y-2">
                      {allCategories.map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            id={`m-category-${category}`}
                            type="checkbox"
                            checked={activeFilters.category.includes(category)}
                            onChange={() => toggleFilter("category", category)}
                            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`m-category-${category}`}
                            className="ml-3 text-sm text-gray-600 capitalize"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </FilterAccordion>

                  <FilterAccordion
                    title="Price"
                    isOpen={true}
                    toggle={() => {}}
                  >
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <div key={range.value} className="flex items-center">
                          <input
                            id={`m-price-${range.value}`}
                            type="checkbox"
                            checked={activeFilters.price.includes(range.value)}
                            onChange={() => toggleFilter("price", range.value)}
                            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`m-price-${range.value}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {range.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </FilterAccordion>

                  <FilterAccordion
                    title="Color"
                    isOpen={true}
                    toggle={() => {}}
                  >
                    <div className="space-y-2">
                      {allColors.map((color) => (
                        <div key={color} className="flex items-center">
                          <input
                            id={`m-color-${color}`}
                            type="checkbox"
                            checked={activeFilters.color.includes(color)}
                            onChange={() => toggleFilter("color", color)}
                            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`m-color-${color}`}
                            className="ml-3 text-sm text-gray-600 capitalize"
                          >
                            {color}
                          </label>
                        </div>
                      ))}
                    </div>
                  </FilterAccordion>

                  <FilterAccordion title="Size" isOpen={true} toggle={() => {}}>
                    <div className="grid grid-cols-3 gap-2">
                      {allSizes.sort().map((size) => (
                        <div key={size} className="flex items-center">
                          <input
                            id={`m-size-${size}`}
                            type="checkbox"
                            checked={activeFilters.size.includes(size)}
                            onChange={() => toggleFilter("size", size)}
                            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`m-size-${size}`}
                            className="ml-1 text-sm text-gray-600"
                          >
                            {size}
                          </label>
                        </div>
                      ))}
                    </div>
                  </FilterAccordion>

                  <FilterAccordion
                    title="Gender"
                    isOpen={true}
                    toggle={() => {}}
                  >
                    <div className="space-y-2">
                      {allGenders.map((gender) => (
                        <div key={gender} className="flex items-center">
                          <input
                            id={`m-gender-${gender}`}
                            type="checkbox"
                            checked={activeFilters.gender.includes(gender)}
                            onChange={() => toggleFilter("gender", gender)}
                            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`m-gender-${gender}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {gender}
                          </label>
                        </div>
                      ))}
                    </div>
                  </FilterAccordion>

                  <FilterAccordion
                    title="Rating"
                    isOpen={true}
                    toggle={() => {}}
                  >
                    <div className="space-y-2">
                      {ratingOptions.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`m-rating-${option.value}`}
                            type="checkbox"
                            checked={activeFilters.rating.includes(
                              option.value
                            )}
                            onChange={() =>
                              toggleFilter("rating", option.value)
                            }
                            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`m-rating-${option.value}`}
                            className="ml-3 text-sm text-gray-600 flex items-center"
                          >
                            {option.label}
                            <div className="flex ml-1">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Number(option.value)
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </FilterAccordion>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={clearAllFilters}
                      className="flex-1 bg-white border border-gray-300 rounded-md py-2 text-sm font-medium text-gray-700"
                    >
                      Clear all
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setMobileFiltersOpen(false)}
                      className="flex-1 bg-gray-900 text-white rounded-md py-2 text-sm font-medium"
                    >
                      Apply
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductListingPage;
