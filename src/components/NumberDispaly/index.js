import React, { Component } from "react";
import "./NumberDisplay.css";

const NumberDisplay = ({ value }) => {
  return (
    <div className="NumberDisplay">{value.toString().padStart(3, "0")}</div>
  );
};
export default NumberDisplay;
