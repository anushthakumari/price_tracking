import LineChart from "./../components/LineChart";
import { useState, useEffect } from "react";
import { useUser } from "../userContext.jsx";
import dayjs from "dayjs";

const TrackingPage = ({ selectedProduct }) => {
  const { userData } = useUser();
  const [history, setHistory] = useState([]);
  console.log(selectedProduct);

  const handleFetchHistory = async () => {
    const productId = selectedProduct._id;
    console.log("searching for product id: ", productId);
    const response = await fetch(
      `http://localhost:5000/api/products/${productId}/prices`,
      {
        headers: {
          method: "GET",
          "x-auth-token": userData.token,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setHistory(data.products);
  };

  useEffect(() => {
    handleFetchHistory();
  }, []);

  return (
    <div className="text-white flex flex-col md:flex-row min-h-dvh">
      {selectedProduct.image && (
        <div className="bg-white flex items-center justify-center m-4 rounded w-full md:w-1/2">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-3/4 md:w-1/2 rounded"
          />
        </div>
      )}
      <section className="p-4 md:p-8 w-full  flex items-center flex-col justify-center">
        <h3 className="text-3xl font-light mb-2 text-white poppins pl-0 pt-8">
          {selectedProduct.productName.charAt(0).toUpperCase() +
            selectedProduct.productName.slice(1)}
        </h3>
        <p className="text-[#FF4191] text-4xl quicksand mb-4">
          ${selectedProduct.currentPrice}
        </p>
        <p className="underline text-[#4f4f4f] hover:text-[#FFF078] text-l mb-2">
          Product Description
        </p>
        <p className="inter text-sm w-full md:w-3/4 mb-8 text-center">
          {selectedProduct.productSource.charAt(0).toUpperCase() +
            selectedProduct.productSource.slice(1)}
        </p>

        {history.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-8 w-1/2">
            <h2 className="text-xl font-semibold text-center mb-4 text-black poppins underline">
              Monthly Sales History
            </h2>
            <LineChart dataSet={history} />
          </div>
        )}

        {history.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md w-1/2">
            <h2 className="text-xl font-semibold text-center mb-4 text-black poppins underline">
              Price History Table
            </h2>
            <table className="w-full text-left table-auto text-black border-2 border-[#FFF078]">
              <thead>
                <tr>
                  <th className="px-4 py-2">Month</th>
                  <th className="px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      {dayjs(entry.timestamp).format("YYYY-MM")}
                    </td>
                    <td className="border px-4 py-2">{entry.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default TrackingPage;
