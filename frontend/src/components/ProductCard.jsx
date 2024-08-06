import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as farStar,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../userContext";

const ProductCard = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const { userData } = useUser();
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

  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    console.log("Deleting product", data._id);
    const productId = data._id;
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": userData.token,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log("Product deleted successfully");
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };
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
          <div className="w-full flex justify-end items-center">
            <div
              className="w-12	h-12 text-right mb-4 flex items-center justify-center rounded hover:bg-white rounded-full p-2"
              onClick={handleDeleteProduct}
            >
              <FontAwesomeIcon
                icon={faTimes}
                style={{ color: "#FF4191", fontSize: "24px" }}
              />
            </div>
          </div>

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
