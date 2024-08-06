import Hero from "./../components/Hero";
import Body from "./../components/Body";
import {useUser} from "../userContext";

const Landing = ({ setSelectedProduct }) => {
  const {userData} = useUser();
  return (
    <div className="bg-black w-full min-h-dvh">
      <Hero />
      {!userData && (
        <div className="text-white p-6 rounded-lg shadow-md w-full  bg-black flex items-center flex-col">
          <h2 className="text-2xl font-light mb-4 text-center text-[#E90074] poppins underline ">
            About Us
          </h2>
          <p className=" text-lg quicksand mb-4 md:w-2/3 lg:w-1/2">
            Welcome to our company! We are dedicated to providing the best
            services and products to our customers. Our team works tirelessly to
            innovate and improve, ensuring we meet the highest standards of
            quality and customer satisfaction.
          </p>
        </div>
      )}
      <Body setSelectedProduct={setSelectedProduct} />
    </div>
  );
};

export default Landing;
