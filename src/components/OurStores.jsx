import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom animated marker
const AnimatedMarker = ({ store, selectedStore, setSelectedStore }) => {
  const markerRef = useRef(null);
  const isActive = selectedStore?.id === store.id;

  return (
    <Marker
      position={[store.coordinates[1], store.coordinates[0]]}
      eventHandlers={{
        click: () => setSelectedStore(store),
      }}
      ref={markerRef}
      icon={L.divIcon({
        className: `custom-marker ${isActive ? "active" : ""}`,
        html: `
          <div class="marker-pin" style="background: ${
            isActive
              ? "linear-gradient(135deg, #08f7fe, #fe53bb)"
              : "linear-gradient(135deg, #4f46e5, #7c3aed)"
          }"></div>
          <span>${store.id}</span>
        `,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
      })}
    >
      <Popup className="custom-popup">
        <h3 className="font-bold text-gray-900">{store.city}</h3>
        <p className="text-gray-700">{store.address}</p>
        <p className="text-teal-600 font-medium">{store.phone}</p>
      </Popup>
    </Marker>
  );
};

const OurStores = () => {
  const ref = useRef(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Store data with coordinates [longitude, latitude]
  const stores = [
    {
      id: 1,
      city: "New York",
      address: "123 Fashion Ave, Manhattan",
      hours: "Mon-Sat: 9AM - 9PM | Sun: 10AM - 7PM",
      phone: "+1 (212) 555-1234",
      coordinates: [-74.006, 40.7128],
      featured: true,
    },
    {
      id: 2,
      city: "Los Angeles",
      address: "456 Sunset Blvd, West Hollywood",
      hours: "Mon-Sat: 10AM - 8PM | Sun: 11AM - 6PM",
      phone: "+1 (310) 555-5678",
      coordinates: [-118.3286, 34.0928],
    },
    {
      id: 3,
      city: "Miami",
      address: "789 Ocean Dr, South Beach",
      hours: "Mon-Sat: 10AM - 9PM | Sun: 12PM - 6PM",
      phone: "+1 (305) 555-9012",
      coordinates: [-80.1307, 25.7823],
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-teal-900 to-indigo-900 relative overflow-hidden"
      id="viewShops"
    >
      {/* Floating animated particles */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400"
            style={{
              width: Math.random() * 15 + 5,
              height: Math.random() * 15 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 50 - 25],
              opacity: [0.3, 0.7, 0.3],
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
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Visit{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Our Stores
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience our premium loafers in person at our flagship locations.
          </p>
        </motion.div>

        {/* Map & Store Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {/* Left Column: Store Cards */}
          <div className="space-y-6">
            {stores.map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl backdrop-blur-sm border border-gray-700 transition-all duration-300 hover:shadow-lg ${
                  store.featured
                    ? "bg-gradient-to-r from-teal-800/50 to-indigo-800/50 shadow-lg"
                    : "bg-gray-900/30"
                }`}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedStore(store)}
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  {store.city}
                  {store.featured && (
                    <span className="ml-2 text-xs bg-cyan-500 text-white px-2 py-1 rounded-full">
                      Flagship
                    </span>
                  )}
                </h3>
                <p className="text-gray-300 mb-2">{store.address}</p>
                <p className="text-gray-400 mb-3">{store.hours}</p>
                <p className="text-cyan-400 font-medium">{store.phone}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium"
                >
                  Get Directions
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Interactive Map */}
          <div className="lg:col-span-2 h-[500px] rounded-2xl overflow-hidden shadow-xl border border-gray-700 relative">
            <MapContainer
              center={[39.8283, -98.5795]} // USA center
              zoom={4}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {stores.map((store) => (
                <AnimatedMarker
                  key={store.id}
                  store={store}
                  selectedStore={selectedStore}
                  setSelectedStore={setSelectedStore}
                />
              ))}
            </MapContainer>

            {/* Map watermark (optional) */}
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              Data © OpenStreetMap
            </div>
          </div>
        </div>

        {/* CTA at Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Can't visit in person?
          </h3>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(8, 247, 254, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold text-lg"
          >
            Shop Online Now
          </motion.button>
        </motion.div>
      </div>

      {/* Custom CSS for markers */}
      <style jsx global>{`
        .custom-marker {
          display: flex;
          justify-content: center;
          align-items: center;
          transform: translate(-50%, -100%);
        }
        .marker-pin {
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          position: absolute;
          top: 0;
          left: 0;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }
        .custom-marker span {
          transform: rotate(45deg);
          color: white;
          font-weight: bold;
          position: relative;
          z-index: 1;
          font-size: 12px;
        }
        .custom-marker.active .marker-pin {
          animation: pulse 1.5s infinite;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        .custom-popup .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.9);
        }
        @keyframes pulse {
          0% {
            transform: rotate(-45deg) scale(1);
          }
          50% {
            transform: rotate(-45deg) scale(1.2);
          }
          100% {
            transform: rotate(-45deg) scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default OurStores;
