import React from "react";
import "../Testimoni/TestimoniCard.css";
import QuoteIcon from "../../../assets/quote-up.png";
import StarIcon from "../../../assets/star.png";

const TestimoniCard = (props) => {
  return (
    <div className="boxtesti">
      <div className="texttesti">
        <img src={QuoteIcon} alt="QuoteIcon" />
        <p>{props.testi}</p>
      </div>
      <div className="avarate">
        <div className="namerate">
          <img src={props.avatar} alt="avatar" />
          <h4>{props.name}</h4>
        </div>
        <div className="starrating">
          <img src={StarIcon} alt="StarIcon" />
          <p>{props.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimoniCard;
