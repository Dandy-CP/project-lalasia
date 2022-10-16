import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../../../../utils/databaseapi";
import { numberWithCommas } from "../../../../../utils/numberWithCommas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-regular-svg-icons";
import { UserAuth } from "../../../../context/authContext";
import { db } from "../../../../../utils/firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import RelatedList from "./ProductRelated/RelatedList";
import Quantitiy from "./Quantitiy";
import ModalAddToCart from "./ModalAddToCart";
import { TabTitle } from "../../../../../utils/tabTitlePage";

import "react-loading-skeleton/dist/skeleton.css";
import "../ProductDetails/ProductDetails.css";
import "react-toastify/dist/ReactToastify.css";

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
  const [modalCart, setModalCart] = useState(false);
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const navigate = useNavigate();
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
      navigate("../../login");
    }
  };

  const buyNow = async () => {
    if (user?.email) {
      await updateDoc(productID, {
        checkoutProduct: arrayUnion({
          id: product.id,
          category: product.category.id,
          img: product.gambar,
          nama: product.nama,
          tagline: product.tagline,
          harga: product.harga,
          qty: quantitiy,
        }),
      });
      navigate(`../../checkout`);
    } else {
      navigate("../../login");
    }
  };

  useEffect(() => {
    axios.get(API_URL + `products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const notifyAddToWishList = () =>
    toast.success("Berhasil Disimpan Ke Wishlist", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    TabTitle(`Lalasia | ${product.nama}`);

  return (
    <React.Fragment>
      <ToastContainer style={{ fontSize: "13px" }} />

      <ModalAddToCart
        open={modalCart}
        onClose={() => setModalCart(false)}
        thisProduct={product}
      />

      <div className="productDetails">
        <img src={product.gambar} alt="productImage" />

        <div className="details">
          <div
            className="addToWishList"
            onClick={() => {
              saveProduct();
              notifyAddToWishList();
            }}
          >
            {like ? (
              <FontAwesomeIcon icon={faHeart} size="xl" />
            ) : (
              <FontAwesomeIcon icon={faHeartFilled} size="xl" />
            )}
            <span className="tooltiptext">Tambahkan Ke Wishlist</span>
          </div>

          <h2>{product.nama || <Skeleton />}</h2>
          <h5>{product.tagline || <Skeleton count={5} />}</h5>
          <p>
            <ReadMore>{product.description}</ReadMore>
          </p>
          <h2>Rp.{numberWithCommas(product.harga) || <Skeleton />}</h2>

          <Quantitiy quantitiy={quantitiy} setQuantitiy={SetQuantitiy} />

          <button className="btnBuy" onClick={buyNow}>
            Buy Now
          </button>
          <button
            className="btnAdd"
            onClick={() => {
              addToCart();
              setModalCart(true);
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>

      <RelatedList />
    </React.Fragment>
  );
};

export default ProductDetails;
