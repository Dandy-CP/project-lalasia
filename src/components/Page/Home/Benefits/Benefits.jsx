import React from "react";
import BenefitsCard from "./BenefitsCard";
import "../Benefits/Benefits.css";
import Icon1 from "../../../assets/icon1.png";
import Icon2 from "../../../assets/icon2.png";
import Icon3 from "../../../assets/icon3.png";

const Benefits = () => {
  return (
    <div className="benefits">
      <div className="titledesc">
        <div className="title">
          <p>Benefit</p>
          <h1>Benefits when using our services</h1>
        </div>
        <div className="descbenefits">
          <h3>
          Satisfaction Guaranteed. We will make sure that you are satisfied with your purchase, and we stand by our work.
          </h3>
        </div>
      </div>

      <div className="boxcardbenefits">
        <BenefitsCard
          image={Icon1}
          title="Many Choice"
          desc="The furniture line by Many Choice is known for its sophisticated, high-quality designs and elegant silhouettes."
        />
        <BenefitsCard
          image={Icon2}
          title="Fast and Ontime"
          desc="The package arrived in time for me to enjoy it. The customer service representative was friendly and helpful. "
        />
        <BenefitsCard
          image={Icon3}
          title="Affordable Price"
          desc="You're looking for a new furniture set and you're on a budget. this website will help you find a product that will fit your needs. "
        />
      </div>
    </div>
  );
};

export default Benefits;
