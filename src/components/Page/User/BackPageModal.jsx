import React from "react";
import { Link } from "react-router-dom";

import "./BackPageModal.css";

const BackPageModal = ({ onClose, onOk }) => {
  return (
    <div className="overlayModal">
      <div className="containerModalBackConfirm">
        <div className="warningBack">
          <h3>Yakin untuk ke halaman sebelum nya ?</h3>
          <h2>Perubahan yang ada di Item Checkout tidak akan tersimpan</h2>
        </div>

        <div className="btnModalBack">
          <Link to="../cart">
            <button className="btnOK" onClick={onOk}>
              Iya kembali ke halaman sebelumnya
            </button>
          </Link>
          <button onClick={onClose}>Batalkan dan tetap Dihalaman</button>
        </div>
      </div>
    </div>
  );
};

export default BackPageModal;
