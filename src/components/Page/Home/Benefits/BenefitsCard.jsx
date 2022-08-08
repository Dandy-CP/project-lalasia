import React from "react";
import "../Benefits/BenefitCard.css";

const BenefitsCard = (props) => {
  return (
    <div className="box">
      <img src={props.image} alt="icon" />
      <h1>{props.title}</h1>
      <p>{props.desc}</p>
    </div>
  );
};

export default BenefitsCard;
