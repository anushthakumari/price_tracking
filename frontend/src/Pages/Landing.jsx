import React from "react";
import Hero from "./../components/Hero";
import Body from "./../components/Body";
import Footer from './../components/Footer';

const Landing = () => {
  return (
    <div className="bg-black w-full min-h-dvh">
      <Hero />
      <Body />
      <Footer/>
    </div>
  );
};

export default Landing;
