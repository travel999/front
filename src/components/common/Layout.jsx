import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
