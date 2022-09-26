import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { numberWithCommas } from "../../../../utils/numberWithCommas";
import { stack as Menu } from "react-burger-menu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/authContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../utils/firebaseConfig";
import {
  faUser,
  faArrowRightFromBracket,
  faCartFlatbed,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";

import "../Navbar/Navbar.css";
import "../Navbar/DropMenuUser.css";
import "../Navbar/DropMenuCart.css";
import "../Navbar/HamburgerMenu.css";

import Logo from "../../../assets/Logo.png";
import MenuHamburgerIcon from "../../../assets/HamburgerMenuIcon.png";
import CrossIcon from "../../../assets/CrossIcon.png";
import UserProfilePict from "../../../assets/blank-profile-picture.png";
import EmptyCartImg from "../../../assets/EmptyCart.png";

const Navbar = () => {
  const [userCart, setUserCart] = useState([]);
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const activeClassName = "Active";

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setUserCart(doc.data()?.cartProduct);
    });
  }, [user?.email]);

  const itemCount = Array.isArray(userCart) ? userCart.length : null;

  return (
    <div className="Navigation">
      <img src={Logo} alt="Logo" />

      <div className="hamburgermenumobile">
        <Menu
          width={"100%"}
          customBurgerIcon={<img src={MenuHamburgerIcon} />}
          customCrossIcon={<img src={CrossIcon} />}
          right
        >
          <div className="ButtonNav">
            <button>
              <FontAwesomeIcon icon={faCartFlatbed} size="xl" />
            </button>
            <button>
              <img src={UserProfilePict} alt="" />
            </button>
          </div>
          <Link className="menu-item" to="/">
            Home
          </Link>

          <Link className="menu-item" to="/product">
            Product
          </Link>

          <Link className="menu-item" to="/service">
            Service
          </Link>

          <Link className="menu-item" to="/about">
            About
          </Link>
        </Menu>
      </div>

      <nav>
        <ul className="ListMenu">
          <li className="Menu">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Home
            </NavLink>
          </li>

          <li className="Menu">
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Product
            </NavLink>
          </li>

          <li className="Menu">
            <NavLink
              to="/service"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Service
            </NavLink>
          </li>

          <li className="Menu">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>

      {user?.email ? (
        <div className="ButtonUserLogin">
          <div className="dropDownCart">
            <Link to="/cart">
              {itemCount === 0 ? (
                <React.Fragment>
                  <button className="btnUserCart">
                    <FontAwesomeIcon icon={faCartFlatbed} size="xl" />
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button className="btnUserCart">
                    <FontAwesomeIcon icon={faCartFlatbed} size="xl" />
                    <div className="itemCounter">{itemCount}</div>
                  </button>
                </React.Fragment>
              )}
            </Link>

            <div className="listCartDropdown">
              {itemCount === 0 ? (
                <div className="emptyCart">
                  <img src={EmptyCartImg} alt="emptyCart" width={200} />
                  <h4>Keranjang Kamu Kosong</h4>
                  <p>
                    Sepertinya kamu belum menambahkan apapun ke keranjang. Pilih
                    menu product untuk mulai menelusuri produk - produk kami
                  </p>
                </div>
              ) : Array.isArray(userCart) ? (
                userCart.slice(0, 2).map((item) => (
                  <React.Fragment key={item.id}>
                    <a href="">
                      <div className="itemCartWraper">
                        <div className="imgCartProduct">
                          <img src={item.img} alt="" width={100} />
                        </div>

                        <div className="cartItemDetail">
                          <h1>
                            {item.qty}x {item.nama}
                          </h1>
                          <h2>Rp. {numberWithCommas(item.harga)}</h2>
                        </div>
                      </div>
                    </a>
                    <div className="allItemCart">
                      <Link to="/cart">Lihat Semua Item {itemCount}</Link>
                    </div>
                  </React.Fragment>
                ))
              ) : null}
            </div>
          </div>

          <div className="dropDownUser">
            <button className="btnUserAccount">
              <img src={UserProfilePict} alt="" />
            </button>

            <div className="dropdownContent">
              <p>{user.email}</p>

              <div className="profileBtn">
                <FontAwesomeIcon icon={faUser} size="xl" />
                <Link to="/profile">Profile Saya</Link>
              </div>

              <div className="pembelianBtn">
                <FontAwesomeIcon icon={faCashRegister} size="xl" />
                <Link to="/orderList">Pembelian</Link>
              </div>

              <div className="logOutBtn">
                <FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" />
                <a onClick={handleLogout}>Log Out</a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="ButtonNav">
          <Link to="/signup">
            <button className="btnSignUp"> SignUp </button>
          </Link>

          <Link to="/login">
            <button className="btnLogIn"> LogIn </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
