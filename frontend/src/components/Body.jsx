import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../userContext.jsx";
import ProductCard from "./ProductCard";

const Body = ({ setSelectedProduct }) => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [listOfProducts, setListOfProducts] = useState([]);
  const [listOfFilteredProducts, setListOfFilteredProducts] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        headers: {
          "x-auth-token": userData.token,
        },
      });
      const json = await response.json();
      setListOfProducts(json);
      setListOfFilteredProducts(json); // Show all products initially
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let filteredProducts = listOfProducts.filter((item) =>
        item.productId.productName.toLowerCase().includes(search.toLowerCase())
      );
      if (filteredProducts.length === 0) {
        try {
          const response = await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": userData.token,
            },
            body: JSON.stringify({ productUrl: search }),
          });
          const json = await response.json();
          console.log(json);
          setMessage(json.message);
          setListOfProducts((prevProducts) => [...prevProducts, json]);
        } catch (error) {
          console.log("Error fetching data", error);
        }
      }

      setListOfFilteredProducts(filteredProducts);
      console.log("Filtered products", filteredProducts);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetSelectedProduct = (product) => {
    setSelectedProduct(product.productId);
    navigate(`/dashboard/${product._id}`);
  };

  return (
    <div className="container mx-auto p-4 min-h-dvh">
      {userData && (
        <div className="input-container flex flex-row items-center justify-center p-8">
          <input
            type="text"
            value={search}
            onChange={(e) => handleInput(e)}
            placeholder="Search for products or Enter"
            className="border-2 border-[#FF4191] rounded p-2 mr-2 w-3/5 outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-[#FF4191] text-white p-2 pl-4 pr-4 rounded hover:bg-[#e90074]"
          >
            Search
          </button>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="rounded p-2 ml-2"
          >
            <option value="all">All Categories</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="electronics">Electronics</option>
          </select>
          <br />
        </div>
      )}
      {message && <p className="text-[#FFF078] text-center p-4">{message}</p>}
      
      {listOfFilteredProducts.length > 0 && (
        <div className="displayProducts-container grid grid-cols-1 gap-4 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {listOfFilteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-full h-full flex items-center justify-center cursor-pointer"
              onClick={() => handleSetSelectedProduct(product)}
            >
              <ProductCard data={product.productId} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;
