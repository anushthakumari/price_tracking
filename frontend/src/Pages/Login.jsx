import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";
// import { useUser } from "./userContext.jsx";
const Login = () => {
  // const { setUserData } = useUser();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = document.getElementById("admin-user").value;
    const pass = document.getElementById("pass").value;

    if (user === "" || pass === "") {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch(
        "https://backend-acasync.vercel.app/admin-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user, password: pass }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.admin);
      if (data.message === "Admin not found") {
        alert("Admin not found");
      } else if (data.message === "Invalid credentials") {
        alert("Invalid credentials");
      } else {
        // setUserData(data.admin);
        console.log("Admin logged in successfully");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="admin-login">
      <div className="back">
        <h1 id="admin-back">DEALDEX</h1>
      </div>
      <form className="admin-form" id="admin-form" onSubmit={handleFormSubmit}>
        <label htmlFor="login">
          <h1 className="text-2xl text-center">LOGIN</h1>
        </label>
        <label htmlFor="admin-user">User ID</label>
        <input type="text" id="admin-user" name="userId" />
        <label htmlFor="pass">Password</label>
        <input type="password" id="pass" name="password" />
        <input type="submit" value="Login" />
        <div className="w-full gap-2 mt-2 text-right text-[#4f4f4f] hover:text-[#fff]">
          <Link to="/signup">
            <p className="w-full">Not Registered ?</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
