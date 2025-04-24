import "./App.css";
import BrandShowcase from "./components/BrandShowcase";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import NextGenProductGrid from "./components/NextGenProductGrid";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BrandShowcase />
      <NextGenProductGrid></NextGenProductGrid>
    </>
  );
}

export default App;
