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
            Pellentesque etiam blandit in tincidunt at donec. Eget ipsum
            dignissim placerat nisi, adipiscing mauris non purus parturient.
          </h3>
        </div>
      </div>

      <div className="boxcardbenefits">
        <BenefitsCard
          image={Icon1}
          title="Many Choice"
          desc="Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim placerat nisi, adipiscing mauris non. "
        />
        <BenefitsCard
          image={Icon2}
          title="Fast and Ontime"
          desc="Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim placerat nisi, adipiscing mauris non. "
        />
        <BenefitsCard
          image={Icon3}
          title="Affordable Price"
          desc="Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim placerat nisadipiscing mauris non. "
        />
      </div>
    </div>
  );
};

export default Benefits;
