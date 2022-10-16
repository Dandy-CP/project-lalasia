import React, { useState, useEffect } from "react";
import { UserAuth } from "../../context/authContext";
import { db } from "../../../utils/firebaseConfig";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import bannerProfile from "../../assets/bannerProfile.png";
import userAvatar from "../../assets/blank-profile-picture.png";
import emptyWishList from "../../assets/EmptyWishList.svg";
import { TabTitle } from "../../../utils/tabTitlePage";

import "../User/Profile.css";
import "../Product/ListProduct/ItemProduct.css";

const Profile = () => {
  const [savedProduct, setSavedProduct] = useState([]);
  const [like, setLike] = useState(true);
  const { user } = UserAuth();
  const navigate = useNavigate();
  TabTitle(`Lalasia | Profile ${user?.email}`);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setSavedProduct(doc.data()?.savedProduct);
    });
  }, [user?.email]);

  const productRef = doc(db, "users", `${user?.email}`);
  const deleteProduct = async (passedID) => {
    if (user?.email) {
      setLike(false);
    }
    try {
      const result = savedProduct.filter((item) => item.id !== passedID);
      await updateDoc(productRef, {
        savedProduct: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const SavedProductCount = Array.isArray(savedProduct) ? savedProduct.length : null;

  return (
    <React.Fragment>
      <div className="containerProfile">
        <div className="bannerUser">
          <img src={bannerProfile} alt="bannerProfile" />
          <div className="userAvatar">
            <img src={userAvatar} alt="userPict" />
          </div>
          <div className="userInfo">
            <h1>{user.displayName}</h1>
            <h3>{user.email}</h3>
          </div>
        </div>
      </div>

      <div className="titleSavedProduct">
        <h1>Produk yang sudah anda sukai</h1>
      </div>

      <div className="userSavedProduct">
        {SavedProductCount === 0 ? (
          <div className="emptyWishList">
            <img src={emptyWishList} alt="emptywishlist" width={300} />
            <h2>Tampak Nya Kamu Belum memasukan produk ke dalam Wishlist</h2>
            <p>Masuk menu product dan pilih produk yang ingin kamu sukai</p>
          </div>
        ) : (
          <>
            {Array.isArray(savedProduct)
              ? savedProduct.map((item) => (
                  <div className="itemProduct" key={item.id}>
                    <div className="itemWraper">
                      <a
                        onClick={() =>
                          navigate(`../product/${item.category}/${item.id}`)
                        }
                      >
                        <img src={item?.img} alt="ProductImage" />
                        <h1>{item?.nama}</h1>
                        <p>{item?.tagline}</p>
                        <h2>Rp.{numberWithCommas(item?.harga)}</h2>
                      </a>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteProduct(item.id)}
                        className="iconDeleteProduct"
                      >
                        <FontAwesomeIcon icon={faTrashCan} size="xl" />
                      </span>
                    </div>
                  </div>
                ))
              : null}
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default Profile;
