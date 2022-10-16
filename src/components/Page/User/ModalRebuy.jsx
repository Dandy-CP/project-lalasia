import React, { useState, useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { Link } from "react-router-dom";
import { db } from "../../../utils/firebaseConfig";
import { UserAuth } from "../../context/authContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

import "./ModalRebuy.css";
import "react-toastify/dist/ReactToastify.css";

const ModalRebuy = ({ productRebuy, onClose }) => {
  const [itemProductRebuy, setItemProductRebuy] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    productRebuy.map((list) => {
      return setItemProductRebuy(list.itemCheckout);
    });
  }, [productRebuy]);

  const rebuyProductRef = doc(db, "users", `${user?.email}`);
  const RebuyProduct = async (itemID) => {
    if (user?.email) {
      try {
        const getIdProduct = itemProductRebuy.filter((data) => data.id === itemID);
        getIdProduct.map((data) => {
          updateDoc(rebuyProductRef, {
            cartProduct: arrayUnion({
              id: data.id,
              category: data.category,
              img: data.img,
              nama: data.nama,
              tagline: data.tagline,
              harga: data.harga,
              qty: 1,
            }),
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const notifyAddToCart = () =>
    toast.success("Berhasil Ditambahkan ke keranjang", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <React.Fragment>
      <ToastContainer style={{ fontSize: "13px" }} />
      <div className="overlayModalRebuy">
        <div className="containerModalRebuy">
          <button className="clsModalRebuy" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </button>
          <h3 style={{ textAlign: "center" }}>Beli Kembali Produk kami</h3>
          <div className="listProductRebuy">
            {productRebuy.map((data) =>
              data.itemCheckout.map((list) => (
                <div className="productRebuy" key={list.id}>
                  <img src={list.img} alt={list.nama} width={150} />
                  <div className="detailProductRebuy">
                    <Link to={`../product/${list.category}/${list.id}`}>
                      <p>{list.nama}</p>
                    </Link>
                    <h5>{numberWithCommas(list.harga)}</h5>
                  </div>
                  <button
                    className="btnRebuyProduct"
                    onClick={() => {
                      RebuyProduct(list.id);
                      notifyAddToCart();
                    }}
                  >
                    +Keranjang
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalRebuy;
