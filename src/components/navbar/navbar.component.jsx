import React from "react";
import { Link } from "react-router-dom";
import Login from "../loginSignup/logIn.component";
import "./navbar.style.css";
const Navbar = ({ logedInUser ,logOut}) => {

const logoutHandler=async()=>{
  try{
    await logOut();
  }catch(err){
    console.error(err);
  }
}

  return (
    <div className="navbar">
      {!logedInUser ? (
        <Login />
      ) : (
        <div>
          {`${logedInUser?.email.slice(
            0,
            logedInUser?.email.indexOf("@")
          )} is loged in`}{" "}
          <Link to="/" className="navLink" onClick={logoutHandler}>
            {" "}
            logOut
          </Link>
        </div>
      )}

      <ul>
        <Link className="navLink" to={"/"}>
          <li>Home</li>
        </Link>
        {logedInUser?
         <><Link className="navLink" to={"/students"}>
          <li>Students</li>
        </Link>
        <Link className="navLink" to={"/teachers"}>
          <li>Teachers</li>
        </Link>
        <Link className="navLink" to={"/classes"}>
          <li>Classes</li>
        </Link></>:""}
      </ul>
    </div>
  );
};

export default Navbar;
