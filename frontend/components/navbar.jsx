import React from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom


const Navbar = () => {
  return (
    <nav className="header">
      <h1>INVENTORY</h1>
      <div>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
        <Link to="/logout">
          <button>Logout</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
