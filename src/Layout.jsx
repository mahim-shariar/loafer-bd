// components/Layout.jsx
import {  useLocation } from "react-router-dom";
import HomeNav from "./components/HomeNav";
import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper";
import Footer from "./components/Footer";

export default function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="app-container">

      {isHomePage ? <HomeNav /> : <Navbar />}

      <main className={isHomePage ? "" : "pt-25"}>
        <Wrapper>{children}</Wrapper>
      </main>
      <Footer />
    </div>
  );
}