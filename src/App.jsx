import { useEffect } from "react";
import "./App.css";
import BrandShowcase from "./components/BrandShowcase";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import NextGenProductGrid from "./components/NextGenProductGrid";
import OurStores from "./components/OurStores";

function App() {
  
  return (
    <>
      <HeroSection />
      <BrandShowcase />
      <NextGenProductGrid></NextGenProductGrid>
      <OurStores />
      <Newsletter />
    </>
  );
}

export default App;
