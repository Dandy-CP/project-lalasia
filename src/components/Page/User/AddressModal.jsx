import React, { useState } from "react";
import { UserAuth } from "../../context/authContext";
import { db } from "../../../utils/firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import "./AddressModal.css";

const AddressModal = ({ open, onClose }) => {
  const [labelAlamat, setLabelAlamat] = useState("");
  const [namaPenerima, setNamaPenerima] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const [kota, setKota] = useState("");
  const [kodePos, setKodePos] = useState("");
  const [alamat, setAlamat] = useState("");
  const { user } = UserAuth();

  const addressID = doc(db, "users", `${user?.email}`);
  const addAddress = async (e) => {
    e.preventDefault();
    if (user?.email) {
      await updateDoc(addressID, {
        address: arrayUnion({
          label: labelAlamat,
          penerima: namaPenerima,
          nomorhp: nomorHp,
          kota: kota,
          kodepos: kodePos,
          alamat: alamat,
        }),
      });
    }
  };

  if (!open) return null;

  return (
    <div className="overlayModal">
      <div className="containerModalAddress">
        <button onClick={onClose} className="closeModal">
          X
        </button>
        <h3>Tambah Alamat Pengiriman</h3>
        <hr className="itemLineBreak" />
        <form className="formAddress">
          <div className="did-floating-label-content">
            <input
              className="did-floating-input"
              type="text"
              placeholder=""
              onChange={(e) => setLabelAlamat(e.target.value)}
              required
            />
            <label className="did-floating-label">Nama Alamat</label>
            <p>
              Simpan Alamat Sebagai (Contoh: Alamat Rumah, Alamat Kantor...)
            </p>
          </div>

          <div className="inputRowPenerima">
            <div className="did-floating-label-content">
              <input
                className="did-floating-input"
                type="text"
                placeholder=""
                onChange={(e) => setNamaPenerima(e.target.value)}
                required
              />
              <label className="did-floating-label">Nama Penerima</label>
            </div>

            <div className="did-floating-label-content">
              <input
                className="did-floating-input"
                type="number"
                placeholder=""
                onChange={(e) => setNomorHp(e.target.value)}
                required
              />
              <label className="did-floating-label">Nomor HP</label>
            </div>
          </div>

          <div className="inputRowKota">
            <div className="did-floating-label-content">
              <input
                className="did-floating-input"
                type="text"
                placeholder=""
                onChange={(e) => setKota(e.target.value)}
                required
              />
              <label className="did-floating-label">Kota Atau Kecamatan</label>
            </div>

            <div className="did-floating-label-content">
              <input
                className="did-floating-input"
                type="number"
                placeholder=""
                onChange={(e) => setKodePos(e.target.value)}
                required
              />
              <label className="did-floating-label">Kode Pos</label>
            </div>
          </div>

          <div className="did-floating-label-content">
            <input
              className="did-floating-input"
              type="text"
              placeholder=""
              onChange={(e) => setAlamat(e.target.value)}
              required
            />
            <label className="did-floating-label">Detail Alamat Lengkap</label>
          </div>

          <div className="addressBtnAction">
            <button className="btnSaveAddress" onClick={addAddress}>
              Simpan
            </button>
            <button className="btnCancelSave" onClick={onClose}>
              Batalkan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
