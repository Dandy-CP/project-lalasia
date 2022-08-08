import React, { useState } from "react";
import "./Quantitiy.css";

const Quantitiy = () => {
  const [quantitiy, SetQuantitiy] = useState(1);

  const handleDecerment = () => {
    if (quantitiy > 1) {
      SetQuantitiy((prevCount) => prevCount - 1);
    }
  };

  const handleIncerment = () => {
    if (quantitiy < 5) {
      SetQuantitiy((prevCount) => prevCount + 1);
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
