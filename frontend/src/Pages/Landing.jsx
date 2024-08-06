import React from "react";
import Hero from "./../components/Hero";
import Body from "./../components/Body";
import Footer from "./../components/Footer";

const Landing = ({ setSelectedProduct }) => {
  return (
    <div className="bg-black w-full min-h-dvh">
      <Hero />
      <Body setSelectedProduct={setSelectedProduct} />
      <Footer />
    </div>
  );
};

export default Landing;
