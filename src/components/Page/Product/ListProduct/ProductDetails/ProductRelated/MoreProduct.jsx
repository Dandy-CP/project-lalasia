import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../../../../../utils/databaseapi";
import { numberWithCommas } from "../../../../../../utils/numberWithCommas";
import axios from "axios";

import "./RelatedList.css";

const MoreProduct = () => {
  const navigate = useNavigate();
  const [related, setRelated] = useState([]);
  let { productId } = useParams();

  useEffect(() => {
    axios
      .get(API_URL + `products?category.id=${productId}` /* + "&_limit=3" */)
      .then((res) => setRelated(res.data));
  }, []);

  const randomItem = related.sort(() => 0.5 - Math.random());

  return (
    <React.Fragment>
      <div className="relatedTitle">
        <h1>Related Items</h1>
      </div>

      <div className="relatedList">
        {Array.isArray(randomItem)
          ? randomItem.slice(0, 3).map((productRelated) => (
              <React.Fragment key={productRelated.id}>
                <div className="relatedWraper">
                  <a
                    onClick={() =>
                      navigate(
                        `../../product/${productId}/${productRelated.id}`
                      )
                    }
                  >
                    <img src={productRelated.gambar} alt="imageProduct" />
                    <p>{productRelated.category.nama}</p>
                    <h1>{productRelated.nama}</h1>
                    <p>{productRelated.tagline}</p>
                    <h2>Rp.{numberWithCommas(productRelated.harga)}</h2>
                  </a>
                </div>
              </React.Fragment>
            ))
          : null}
      </div>
    </React.Fragment>
  );
};

export default MoreProduct;
