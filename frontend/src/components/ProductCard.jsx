import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as farStar,
} from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ data }) => {
  const { title, price, description, category, image, rating } = data;

  const fullStars = Math.floor(rating.rate);
  const halfStars = rating.rate - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className="border p-4 w-4/5 rounded-lg hover:shadow-lg hover:border-[#FF4191] transition-all duration-300">
      <div className="w-full mb-4">
        <img
          src={image}
          className="w-full h-[200px] object-contain bg-white rounded"
          alt="product"
        />
      </div>
      <h3 className="text-base font-light mb-2 text-white poppins text-center">
        {truncateText(title, 5)}
      </h3>
      <p className="text-[#FF4191] text-2xl quicksand mb-4">${price}</p>

      <p className="text-sm text-[#6C757D] flex items-center">
        {" "}
        {rating ? (
          <>
            {[...Array(fullStars)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className="text-yellow-500"
              />
            ))}
            {halfStars === 1 && (
              <FontAwesomeIcon
                icon={faStarHalfAlt}
                className="text-yellow-500"
              />
            )}
            {[...Array(emptyStars)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={farStar}
                className="text-gray-300"
              />
            ))}
            <span className="ml-2">{`(${rating.count} reviews)`}</span>
          </>
        ) : (
          "No rating available"
        )}
      </p>
    </div>
  );
};

export default ProductCard;
