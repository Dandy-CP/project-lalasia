import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { stack as Menu } from "react-burger-menu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/authContext";
import {
  faUser,
  faArrowRightFromBracket,
  faCartFlatbed,
} from "@fortawesome/free-solid-svg-icons";

import "../Navbar/Navbar.css";

import Logo from "../../../assets/Logo.png";
import MenuHamburgerIcon from "../../../assets/HamburgerMenuIcon.png";
import CrossIcon from "../../../assets/CrossIcon.png";
import UserProfilePict from "../../../assets/blank-profile-picture.png";

const Navbar = () => {
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
              <button className="btnUserCart">
                <FontAwesomeIcon icon={faCartFlatbed} size="xl" />
              </button>
            </Link>

            <div className="listCartDropdown"></div>
          </div>

          <div className="dropDown">
            <button className="btnUserAccount">
              <img src={UserProfilePict} alt="" />
            </button>

            <div className="dropdownContent">
              <p>{user.email}</p>

              <div className="profileBtn">
                <FontAwesomeIcon icon={faUser} size="xl" />
                <Link to="/profile">Profile Saya</Link>
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
