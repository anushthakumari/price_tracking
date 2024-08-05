import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirm) {
        setError("Passwords do not match");
        return;
      }
      if(formData.phone.length !== 10){
        setError("Phone number should be 10 digits");
        return;
      }
      
      console.log(formData);
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirm: "",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error submitting User data:", error);
      setError(JSON.stringify(error));
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
      <div>
        <form
          className="admin-form"
          id="admin-form"
          onSubmit={handleFormSubmit}
        >
          <h1 className="text-2xl text-center">Admin Signup</h1>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            required
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />

          <label htmlFor="confirm">Confirm Password</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            required
          />
          <p className="text-red-500">{error}</p>
          <input type="submit" value="Signup" />
          <div className="w-full gap-2 mt-2 text-right text-[#4f4f4f] hover:text-[#fff]">
            <Link to="/login">
              <p>Already Have an Account ?</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
