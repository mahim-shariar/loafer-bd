// components/Layout.jsx
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomeNav from "./components/HomeNav";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

export default function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="app-container">
      {isHomePage ? <HomeNav /> : <Navbar />}

      <main className={isHomePage ? "" : "pt-25"}>
        {" "}
        <Wrapper>{children}</Wrapper>{" "}
      </main>
      <Footer />
    </div>
  );
}
