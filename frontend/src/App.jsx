import Header from "./components/Header";
import Landing from "./Pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import TrackingPage from "./Pages/TrackingPage";
import { useState } from "react";
import DashboardHome from "./Pages/DashboardHome";
import Footer from "./components/Footer";

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState({
    id: "1",
    name: "random produc",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    history: [
      {
        january: "100",
        february: "106",
        march: "110",
        april: "120",
        may: "105",
        june: "100",
        july: "90",
      },
    ],
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  });

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Landing setSelectedProduct={setSelectedProduct} />}
          />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={<Dashboard setSelectedProduct={setSelectedProduct} />}
          >
            <Route
              index
              element={
                <DashboardHome setSelectedProduct={setSelectedProduct} />
              }
            />
            <Route
              path="/dashboard/:id"
              element={<TrackingPage selectedProduct={selectedProduct} />}
            />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
