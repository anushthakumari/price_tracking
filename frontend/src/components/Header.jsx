import {Link} from "react-router-dom";
const Header = () => {
  return (
    <div className="bg-[#000000] shadow-md py-4 mt-0 shadow-lg shadow-[#fff078] mb-[0.5px]">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="logo">
          <h1 className="quicksand text-white text-xl">DEALDEX</h1>
        </div>
        <nav>
          <ul className="flex space-x-4 poppins font-light text-sm text-white">
            <li className="nav-items hover:text-[#e90074] cursor-pointer">
              Home
            </li>
            <li className="nav-items hover:text-[#e90074] cursor-pointer">
              Contact Us
            </li>
            <li className="nav-items hover:text-[#e90074] cursor-pointer">
              About Us
            </li>
            <Link to="/login">
              <li className="nav-items hover:text-[#e90074] cursor-pointer">
                Login/Signup
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
