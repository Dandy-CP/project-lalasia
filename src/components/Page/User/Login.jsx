import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/authContext";

import Logo from "../../assets/Logo.png";
import GoogleIcon from "../../assets/GoogleIcon.png";
import FacebookIcon from "../../assets/FacebookIcon.png";
import "./LoginNSignUp.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <React.Fragment>
      <div className="backgroundImage"></div>
      <div className="containerAuthContex">
        {error ? <p>{error}</p> : null}
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
              <h4>Masuk Dengan Google</h4>
            </button>

            <button className="loginFacebook">
              <img src={FacebookIcon} alt="" draggable="false" />
              <h4>Masuk Dengan Facebook</h4>
            </button>

            <h5>Atau</h5>

            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="LoginBtn">Log In</button>

            <p>
              Belum Punya Akun ? <Link to="/signup"> Register </Link>
            </p>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
