import React from "react";
import { stack as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

import "../Navbar/Navbar.css";

import Logo from "../../../assets/Logo.png";
import MenuHamburgerIcon from "../../../assets/HamburgerMenuIcon.png";
import CrossIcon from "../../../assets/CrossIcon.png";
import UserIcon from "../../../assets/user.png";
import BagIcon from "../../../assets/bag-2.png";

class Navbar extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Navigation">
        <img src={Logo} alt="Logo" />

        {/* Hamburger Menu Mobile */}
        <div className="hamburgermenumobile">
          <Menu
            width={"100%"}
            customBurgerIcon={<img src={MenuHamburgerIcon} />}
            customCrossIcon={<img src={CrossIcon} />}
            right
          >
            <div className="ButtonNav">
              <button>
                <img src={BagIcon} alt="BagIcon" />
              </button>
              <button>
                <img src={UserIcon} alt="UserIcon" />
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

        {/* Desktop Navbar */}
        {/* Anchor di ganti dengan Component Link */}
        <ul className="ListMenu">
          <li className="Menu">
            <Link to="/"> Home </Link>
          </li>

          <li className="Menu">
            <Link to="/product"> Product </Link>
          </li>

          <li className="Menu">
            <Link to="/service"> Service </Link>
          </li>

          <li className="Menu">
            <Link to="/about"> About </Link>
          </li>
        </ul>
        <div className="ButtonNav">
          <button>
            <img src={BagIcon} alt="BagIcon" />
          </button>
          <button>
            <img src={UserIcon} alt="UserIcon" />
          </button>
        </div>
      </div>
    );
  }
}

export default Navbar;
