import React from "react";
import "./style/school.style.css";
import logo from "../../img/logo.png";
const SchoolMainPage = () => {
  return (
    <div className="main">
      <h1>School class management</h1>
      <h2>Description</h2>
      <p className={"discribtion"}>
        {" "}
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint,
        praesentium qui, quo odio sapiente ad totam quis veniam reprehenderit
        eveniet quidem beatae ipsa excepturi? Tenetur commodi provident
        excepturi maiores libero, accusantium quia ex magnam temporibus, facere
        minima totam, voluptate expedita! Aut eum praesentium eos ducimus
        deserunt non enim esse ad.
      </p>
      <img src={logo} className="logo" alt="logo" />
    </div>
  );
};

export default SchoolMainPage;
