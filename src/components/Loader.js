import React from "react";
import { ClipLoader } from "react-spinners";
import "./Loader.scss";

const Loader = ({ msg: loadingMessage }) => {
  return (
    <div className="loader-container">
      <p className="loading-message">
        {loadingMessage} <ClipLoader />
      </p>
    </div>
  );
};

export default Loader;
