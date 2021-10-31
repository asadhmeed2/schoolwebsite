import React from "react";
import { Link } from "react-router-dom";
import Login from './logIn.component'
import "./navbar.style.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <Login />
      <ul>
        <Link className="navLink" to={"/"}>
          <li>Home</li>
        </Link>
        <Link className="navLink" to={"/students"}>
          <li>Students</li>
        </Link>
        <Link className="navLink" to={"/teachers"}>
          <li>Teachers</li>
        </Link>
        <Link className="navLink" to={"/classes"}>
          <li>Classes Schedul</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
