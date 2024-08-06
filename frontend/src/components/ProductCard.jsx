import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as farStar,
} from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState({
    productName: data?.productName || "No product name",
    currentPrice: data?.currentPrice || "N/A",
    image: data?.image || "placeholder_image_url",
  });

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  // Simulate loading state
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="border p-8 w-4/5 rounded-lg hover:shadow-lg hover:border-[#FF4191] transition-all duration-300">
      {loading ? (
        <p className="text-[#FF4191]">Loading...</p>
      ) : (
        <>
          {/* <div className="w-full mb-4">
            <img
              src={productData.image}
              className="w-full h-[200px] object-contain bg-white rounded"
              alt="product"
            />
          </div> */}
          <h3 className="text-base font-light mb-2 text-white poppins text-center">
            {/* {truncateText(productData.productName, 5)} */}
            {productData.productName}
          </h3>
          <p className="text-[#FF4191] text-2xl quicksand mb-4 text-center">
            ${productData.currentPrice}
          </p>
        </>
      )}
    </div>
  );
};

export default ProductCard;
