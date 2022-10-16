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
  const [isOpen, setOpen] = useState(false);
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

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  return (
    <div className="Navigation">
      <Link to="/">
        <img src={Logo} alt="Logo" className="logomobile" />
      </Link>

      <div className="hamburgermenumobile">
        {user?.email ? (
          <div className="cartMenuMobile">
            <Link to="/cart">
              {itemCount === 0 ? (
                <React.Fragment>
                  <button className="btnUserCartMobile">
                    <FontAwesomeIcon icon={faCartFlatbed} size="xl" />
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button className="btnUserCartMobile">
                    <FontAwesomeIcon icon={faCartFlatbed} size="xl" />
                    <div className="itemCounter">{itemCount}</div>
                  </button>
                </React.Fragment>
              )}
            </Link>
          </div>
        ) : (
          <></>
        )}

        <Menu
          width={"100%"}
          customBurgerIcon={<img src={MenuHamburgerIcon} />}
          customCrossIcon={<img src={CrossIcon} />}
          isOpen={isOpen}
          onOpen={handleIsOpen}
          onClose={handleIsOpen}
          right
        >
          <div className="ButtonNav">
            {user?.email ? (
              <div className="profileNcart">
                <div className="profileNname">
                  <img src={UserProfilePict} alt="" width={50} />
                  <p>{user.email}</p>
                </div>
                <div className="menuUser">
                  <div className="profileBtn">
                    <FontAwesomeIcon icon={faUser} size="sm" />
                    <Link to="/profile" onClick={closeSideBar}>
                      Profile Saya
                    </Link>
                  </div>

                  <div className="pembelianBtn">
                    <FontAwesomeIcon icon={faCashRegister} size="sm" />
                    <Link to="/orderList" onClick={closeSideBar}>
                      Pembelian
                    </Link>
                  </div>

                  <div className="logOutBtn">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} size="sm" />
                    <a
                      onClick={() => {
                        handleLogout();
                        closeSideBar();
                      }}
                    >
                      Log Out
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="loginNSignUpMobile">
                <Link to="/signup">
                  <button className="btnSignUp"> SignUp </button>
                </Link>

                <Link to="/login">
                  <button className="btnLogIn"> LogIn </button>
                </Link>
              </div>
            )}
          </div>

          <Link className="menu-item" to="/" onClick={closeSideBar}>
            Home
          </Link>

          <Link className="menu-item" to="/product" onClick={closeSideBar}>
            Product
          </Link>

          <a href="https://github.com/Dandy-CP/project-lalasia" className="menu-item" target="_blank">
              About Project
          </a>
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
            <a href="https://github.com/Dandy-CP/project-lalasia" target="_blank">
              About Project
            </a>
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
