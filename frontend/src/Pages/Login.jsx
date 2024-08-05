import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (username === "" || password === "") {
      setError("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password }),
      });

      const data = await response.json();
      console.log(data);
      setToken(data.token);
      const decodedToken = jwtDecode(data.token);
      console.log(decodedToken);
      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }

      if (data.message === "Admin not found") {
        setError("Admin not found");
      } else if (data.message === "Invalid credentials") {
        setError("Invalid credentials");
      } else {
        // setUserData(data.admin);
        console.log("Admin logged in successfully");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError(err.message || "An error occurred. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="admin-login">
      <div className="back">
        <h1 id="admin-back">DEALDEX</h1>
      </div>
      <form className="admin-form" id="admin-form" onSubmit={handleFormSubmit}>
        <h1 className="text-2xl text-center">LOGIN</h1>

        <label htmlFor="admin-user">User ID</label>
        <input
          type="text"
          id="admin-user"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Enter your Username"
        />

        <label htmlFor="pass">Password</label>
        <input
          type="password"
          id="pass"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your Password"
        />

        {error && <p className="text-red-500">{error}</p>}
        <input type="submit" value="Login" />
        <div className="w-full gap-2 mt-2 text-right text-[#4f4f4f] hover:text-[#fff]">
          <Link to="/signup">
            <p className="w-full">Not Registered?</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
