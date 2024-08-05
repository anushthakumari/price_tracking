import { useEffect, useState } from "react";
import { PRODUCTS_URL } from "../utils/constants";
import ProductCard from "./ProductCard";

const Body = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all"); // Initial category is 'all'
  const [listOfProducts, setListOfProducts] = useState([]);
  const [listOfFilteredProducts, setListOfFilteredProducts] = useState([]);

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
      const response = await fetch(PRODUCTS_URL);
      const json = await response.json();
      setListOfProducts(json);
      setListOfFilteredProducts(json); // Show all products initially
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const handleSearch = () => {
    const filteredProducts = listOfProducts
      .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
      .filter(
        (item) =>
          category === "all" ||
          item.category.toLowerCase() === category.toLowerCase()
      );

    setListOfFilteredProducts(filteredProducts);
    console.log(filteredProducts);
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="input-container flex flex-row items-center justify-center p-8">
        <input
          type="text"
          value={search}
          onChange={(e) => handleInput(e)}
          placeholder="Search"
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
      </div>

      <div className="displayProducts-container grid grid-cols-1 gap-4 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {listOfFilteredProducts.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default Body;
