import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/authContext";
import { updateDoc, doc, onSnapshot, arrayUnion } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import Slider from "react-slick";

import "./Cart.css";

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const [wishListItem, setWishListItem] = useState([]);
  const { user } = UserAuth();
  const navigate = useNavigate();

  let settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    pauseOnFocus: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setCartItem(doc.data()?.cartProduct);
    });
  }, [user?.email]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setWishListItem(doc.data()?.savedProduct);
    });
  }, [user?.email]);

  const handleDecerment = (cartId) => {
    setCartItem((cartItem) =>
      cartItem.map((item) =>
        cartId === item.id
          ? { ...item, qty: item.qty - (item.qty > 1 ? 1 : 0) }
          : item
      )
    );
  };

  const handleIncerment = (cartId) => {
    setCartItem((cartItem) =>
      cartItem.map((item) =>
        cartId === item.id
          ? { ...item, qty: item.qty + (item.qty < 10 ? 1 : 0) }
          : item
      )
    );
  };

  /*   function getNotes(text) {
    /*     setCartItem((cartItem) =>
      cartItem.map((item) =>
        cartId === item.id ? { ...item, notes: item.notes } : item
      )
    );
    setNotes(text.target.value);
    console.log(text.target.value);
  } */

  const productRef = doc(db, "users", `${user?.email}`);
  const removeProduct = async (itemID) => {
    try {
      const removed = cartItem.filter((item) => item.id !== itemID);
      await updateDoc(productRef, {
        cartProduct: removed,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const itemCount = Array.isArray(cartItem) ? cartItem.length : null;
  /*   const itemCount = () => {
    return Array.isArray(cartItem)
      ? cartItem.filter((count) => {
          if (count?.isChecked) {
            return cartItem.length;
          } else {
            return null;
          }
        })
      : null;
  }; */

  /*   const handleSelected = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let AllitemChecked = cartItem.map((data) => {
        return { ...data, isChecked: checked };
      });
      setCartItem(AllitemChecked);
    } else {
      let itemChecked = cartItem.map((data) => {
        return data.nama === name ? { ...data, isChecked: checked } : data;
      });
      setCartItem(itemChecked);
    }
  }; */

  /*   const totalBayar = () => {
    return Array.isArray(cartItem)
      ? cartItem.reduceRight((result, item) => {
          if (item?.isChecked) {
            return result + item.qty * item.harga;
          } else {
            return null;
          }
        }, 0)
      : null;
  }; */

  const totalBayar = Array.isArray(cartItem)
    ? cartItem.reduce(function (result, item) {
        return result + item.qty * item.harga;
      }, 0)
    : null;

  const itemCheckout = Array.isArray(cartItem) ? cartItem : null;
  console.log(itemCheckout);

  const checkout = async () => {
    if (user?.email) {
      itemCheckout.map((data) => {
        updateDoc(productRef, {
          checkoutProduct: arrayUnion({
            id: data.id,
            category: data.category,
            img: data.img,
            nama: data.nama,
            tagline: data.tagline,
            harga: data.harga,
            qty: data.qty,
          }),
        });
      });
    }
  };

  return (
    <div className="containerCartPage">
      <div className="itemBoxWrap">
        <div className="checkboxAction">
          <div className="itemAllCheckBox">
            {/*             <input
              type="checkbox"
              name="allSelect"
              checked={
                Array.isArray(cartItem)
                  ? cartItem.filter((data) => data?.isChecked !== true).length <
                    1
                  : null
              }
              onChange={handleSelected}
            />
            <label>Pilih Semua Item</label> */}
            <h3>Cart Product</h3>
          </div>
          {/* <button>Hapus Item</button> */}
        </div>
        <div className="itemsCartUserBox">
          {Array.isArray(cartItem)
            ? cartItem.map((items) => (
                <React.Fragment key={items.id}>
                  <div className="cartItems">
                    {/*                     <input
                      type="checkbox"
                      name={items.nama}
                      value={items?.isChecked || false}
                      checked={items?.isChecked || false}
                      onChange={handleSelected}
                    /> */}
                    <img src={items.img} alt="productImage" width={150} />
                    <div className="descItem">
                      <h3
                        onClick={() =>
                          navigate(`../product/${items.category}/${items.id}`)
                        }
                      >
                        {items.nama}
                      </h3>
                      <p>{items.tagline}</p>
                      <h4>Rp.{numberWithCommas(items.harga)}</h4>
                      {/* <input type="text" placeholder="Tulis Catatan Tambahan" /> */}
                    </div>
                  </div>

                  <div className="cartAction">
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => removeProduct(items.id)}
                      className="iconDeleteProduct"
                    >
                      <FontAwesomeIcon icon={faTrashCan} size="xl" />
                    </div>

                    <div className="quantitiyInput">
                      <button
                        className="btnInput"
                        type="button"
                        onClick={() => handleDecerment(items.id)}
                      >
                        -
                      </button>

                      <input
                        className="inputNum"
                        type="text"
                        value={items.qty}
                        readOnly
                      />

                      <button
                        className="btnInput"
                        type="button"
                        onClick={() => handleIncerment(items.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <hr className="itemLineBreak" />
                </React.Fragment>
              ))
            : null}
        </div>

        <div className="wishListCollection">
          <h2>Wish List Produk Anda</h2>
          <hr className="itemLineBreak" />
          <div className="wishListItem">
            <Slider {...settings}>
              {Array.isArray(wishListItem)
                ? wishListItem.map((items) => (
                    <React.Fragment key={items.id}>
                      <div
                        className="wishListItemWraper"
                        onClick={() =>
                          navigate(`../product/${items.category}/${items.id}`)
                        }
                      >
                        <img src={items.img} alt={items.nama} width={100} />
                        <div className="descWishlist">
                          <h3>{items.nama}</h3>
                          <p>{items.tagline}</p>
                          <h4>Rp. {numberWithCommas(items.harga)}</h4>
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                : null}
            </Slider>
          </div>
        </div>
      </div>

      <div className="ringkasanBelanja">
        <h2>Ringkasan Belanja</h2>
        <div className="totalHarga">
          <h4>Total Harga ( {itemCount} Produk )</h4>
          <h4>Rp. {numberWithCommas(totalBayar)}</h4>
        </div>
        <div className="btnAction">
          <Link to="/checkout">
            <button className="btnBeli" onClick={checkout}>
              Checkout ( {itemCount} )
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
