import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="Nav">
      <div className="nav-inner">
        <div className="hNav">
          <h2>BookMyService</h2>
        </div>

        <div className="LNav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Me</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/appointment">Appointments</Link></li>
            <li><Link to="/history">Previous Services</Link></li>
            <li><Link to= '/login'>Login</Link></li>
            <li><Link to="/Signup">Signup</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
