import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/authContext";
import { updateDoc, doc, onSnapshot, arrayUnion } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";
import { numberWithCommas } from "../../../utils/numberWithCommas";

import "./CheckOut.css";

const CheckOut = () => {
  const [itemCheckout, setItemCheckout] = useState([]);
  const [ongkir, setOngkir] = useState(0);
  const { user } = UserAuth();

  console.log(ongkir);

  const kurir = [
    {
      jenis: "Regular",
      ongkir: 10000,
    },
    {
      jenis: "Express",
      ongkir: 20000,
    },
    {
      jenis: "Kargo",
      ongkir: 15000,
    },
  ];

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setItemCheckout(doc.data()?.checkoutProduct);
    });
  }, [user?.email]);

  const totalHarga = Array.isArray(itemCheckout)
    ? itemCheckout.reduce(function (result, item) {
        return result + item.qty * item.harga;
      }, 0)
    : null;

  const totalTagihan = Array.isArray(itemCheckout)
    ? itemCheckout.reduce(function (result, item) {
        return result + item.qty * item.harga;
      }, 0)
    : null;

  return (
    <div className="checkOutContainer">
      <div className="checkoutWrap">
        <div className="alamatUser">
          <h3>Alamat Pengiriman</h3>
          <hr />

          <hr />
          <button>Tambah Alamat</button>
          <button>Lihat Alamat Tersimpan</button>
        </div>

        <div className="itemCheckout">
          <h3>Item Checkout</h3>
          {Array.isArray(itemCheckout)
            ? itemCheckout.map((item) => (
                <div className="checkoutItems" key={item.id}>
                  <img src={item.img} alt={item.nama} width={150} />
                  <div className="descItemCheckout">
                    <h3>{item.nama}</h3>
                    <p>{item.tagline}</p>
                    <h4>Rp. {numberWithCommas(item.harga)}</h4>
                    <p>{item.qty} Barang</p>
                  </div>
                </div>
              ))
            : null}

          <div className="kurirPengiriman">
            <div className="selectKurir">
              <label>Pilih kurir Pengiriman</label>
              <select
                name="kurir"
                id="kurir"
                /* value={ongkir} */
                onChange={(e) => setOngkir(e.target.value)}
              >
                <option value="">Pilih Kurir</option>
                {kurir.map((data) => (
                  <option value={data.ongkir}>
                    {data.jenis} Rp.{numberWithCommas(data.ongkir)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="ringkasanCheckout">
        <h3>Ringkasan Belanja</h3>
        <div className="totalCheckout">
          <div className="totalBayarItem">
            <h4>Total Harga</h4>
            <h4>Rp. {numberWithCommas(totalHarga)}</h4>
          </div>
          <div className="totalBayarOngkir">
            <h4>Total Ongkos Kirim</h4>
            <h4>Rp. {numberWithCommas(ongkir)}</h4>
          </div>
          <div className="totalTagihan">
            <h4>Total Tagihan</h4>
            <h4>Rp. {numberWithCommas(totalTagihan)}</h4>
          </div>
        </div>
        <div className="btnCheckout">
          <button className="btnBayar">Bayar</button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
