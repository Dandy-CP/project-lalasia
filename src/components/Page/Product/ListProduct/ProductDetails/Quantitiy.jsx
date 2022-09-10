import React, { useState } from "react";
import "./Quantitiy.css";

const Quantitiy = ({ quantitiy, setQuantitiy }) => {
  /* const [quantitiy, SetQuantitiy] = useState(1); */

  const handleDecerment = (e) => {
    e.preventDefault();
    if (quantitiy > 1) {
      setQuantitiy((prevCount) => prevCount - 1);
    }
  };

  const handleIncerment = (e) => {
    e.preventDefault();
    if (quantitiy < 5) {
      setQuantitiy((prevCount) => prevCount + 1);
    }
  };

  return (
    <div className="quantitiyInput">
      <button className="btnInput" type="button" onClick={handleDecerment}>
        -
      </button>
      <input className="inputNum" type="text" value={quantitiy} readOnly />
      <button className="btnInput" type="button" onClick={handleIncerment}>
        +
      </button>
    </div>
  );
};

export default Quantitiy;
