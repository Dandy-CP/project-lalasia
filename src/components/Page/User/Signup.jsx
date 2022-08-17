import React, { useState, useEffect } from "react";
import { UserAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../assets/Logo.png";
import GoogleIcon from "../../assets/GoogleIcon.png";
import FacebookIcon from "../../assets/FacebookIcon.png";
import "./LoginNSignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="backgroundImage"></div>
      <div className="containerAuthContex">
        <div className="inputContex">
          <form onSubmit={handleSubmit}>
            <div className="logoContex">
              <Link to="/">
                <img src={Logo} alt="" draggable="false" />
              </Link>
            </div>

            <span>
              <hr width="86%" color="#ECE4DE" />
            </span>

            <button className="loginGoogle">
              <img src={GoogleIcon} alt="" draggable="false" />
              <h4>Daftar Dengan Google</h4>
            </button>

            <button className="loginFacebook">
              <img src={FacebookIcon} alt="" draggable="false" />
              <h4>Daftar Dengan Facebook</h4>
            </button>

            <h5>Atau</h5>

            <input
              type="text"
              placeholder="Email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="LoginBtn">Sign Up</button>

            <p>
              Sudah Punya Akun ? <Link to="/login"> LogIn </Link>
            </p>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
