import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      {children}
      <Contact />
      <Footer />
    </>
  );
}

export default Layout;
