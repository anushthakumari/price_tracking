import React from "react";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="text-white flex flex-col items-center min-h-dvh p-4 md:p-8 bg-black">
      <div className="text-white p-6 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2 bg-black ">
        <h2 className="text-4xl font-light mb-4 text-center text-[#E90074] poppins underline">
          About Us
        </h2>
        <p className=" text-lg quicksand mb-4">
          Welcome to our company! We are dedicated to providing the best
          services and products to our customers. Our team works tirelessly to
          innovate and improve, ensuring we meet the highest standards of
          quality and customer satisfaction.
        </p>
        <p className="text-lg quicksand mb-4">
          Our mission is to make your life easier and more enjoyable through our
          top-notch offerings. We believe in the power of technology and the
          importance of customer feedback in shaping our future. Thank you for
          choosing us and being a part of our journey.
        </p>
        <p className="text-black text-lg quicksand mb-4">
          If you have any questions, suggestions, or feedback, feel free to
          reach out to us. We are always here to help and listen to our valued
          customers.
        </p>
        <div className="text-center">
          <hr className="mb-4 border-[#FFF078]" />
          <Link
            href="/contact"
            className="text-[#FF4191] hover:text-[#FFF078] text-xl underline"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
