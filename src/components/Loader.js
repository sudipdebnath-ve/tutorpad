import loader from "../assets/images/loader.gif";
import "./Loader.css";
import { useState } from "react";

const Loader = ({show}) => {
  return show && (
    <div className="loader-overlay">
      <div className="loader-center">
        <img src={loader} alt="Loading..." />
      </div>
    </div>
  );
};

export default Loader;
