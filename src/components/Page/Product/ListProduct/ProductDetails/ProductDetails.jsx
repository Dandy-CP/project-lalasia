import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../../../utils/databaseapi";
import { numberWithCommas } from "../../../../../utils/numberWithCommas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-regular-svg-icons";
import { UserAuth } from "../../../../context/authContext";
import { db } from "../../../../../utils/firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

import RelatedList from "./ProductRelated/RelatedList";
import Quantitiy from "./Quantitiy";

import "react-loading-skeleton/dist/skeleton.css";
import "../ProductDetails/ProductDetails.css";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  if (text !== undefined && text !== null) {
    return (
      <React.Fragment>
        {isReadMore ? text.slice(0, 150) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? ".....Read more" : " Show less"}
        </span>
      </React.Fragment>
    );
  }
};

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [quantitiy, SetQuantitiy] = useState(1);
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  let { id } = useParams();

  const productID = doc(db, "users", `${user?.email}`);
  const saveProduct = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(productID, {
        savedProduct: arrayUnion({
          id: product.id,
          category: product.category.id,
          img: product.gambar,
          nama: product.nama,
          tagline: product.tagline,
          harga: product.harga,
        }),
      });
    } else {
      alert("Login Untuk save product");
    }
  };

  const addToCart = async () => {
    if (user?.email) {
      await updateDoc(productID, {
        cartProduct: arrayUnion({
          id: product.id,
          category: product.category.id,
          img: product.gambar,
          nama: product.nama,
          tagline: product.tagline,
          harga: product.harga,
          qty: quantitiy,
        }),
      });
    } else {
      alert("Login terlebih dahulu Untuk Melanjutkan");
    }
  };

  useEffect(() => {
    axios.get(API_URL + `products/${id}`).then((res) => setProduct(res.data));
  }, []);

  return (
    <React.Fragment>
      <div className="productDetails">
        <img src={product.gambar} alt="productImage" />

        <div className="details">
          <span style={{ cursor: "pointer" }} onClick={saveProduct}>
            {like ? (
              <FontAwesomeIcon icon={faHeart} size="xl" />
            ) : (
              <FontAwesomeIcon icon={faHeartFilled} size="xl" />
            )}
          </span>
          <h2>{product.nama || <Skeleton />}</h2>
          <h5>{product.tagline || <Skeleton count={5} />}</h5>
          <p>
            <ReadMore>{product.description}</ReadMore>
          </p>
          <h2>Rp.{numberWithCommas(product.harga) || <Skeleton />}</h2>

          <Quantitiy quantitiy={quantitiy} setQuantitiy={SetQuantitiy} />

          <button className="btnBuy">Buy Now</button>
          <button className="btnAdd" onClick={addToCart}>
            Add To Cart
          </button>
        </div>
      </div>

      <RelatedList />
    </React.Fragment>
  );
};

export default ProductDetails;
