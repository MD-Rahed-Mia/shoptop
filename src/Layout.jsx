import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import GoTop from "./components/GoTop";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      {children}
      <Contact />
      <Footer />
      <GoTop />
    </>
  );
}

export default Layout;
