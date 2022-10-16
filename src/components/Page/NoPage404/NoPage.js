import React from "react";
import { Link } from "react-router-dom";
import { TabTitle } from "../../../utils/tabTitlePage";
import noPage from "../../assets/404NoPage.svg";

import "./NoPage.css";

function NoPage() {
  TabTitle("Lalasia | 404 No Page");
  return (
    <div className="NoPageContainer">
      <div className="nopage">
        <img src={noPage} alt="404NoPage" width={600} />
        <h1>404 - PAGE NOT FOUND</h1>
        <h2>Halaman yang anda cari tidak di temukan</h2>
        <Link to="./">
          <button className="btnGoHome">Kembali Ke Home Page</button>
        </Link>
      </div>
    </div>
  );
}

export default NoPage;
