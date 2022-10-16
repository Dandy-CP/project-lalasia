import React, { useState, useEffect } from "react";
import { UserAuth } from "../../context/authContext";
import { db } from "../../../utils/firebaseConfig";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import CountdownTimer from "./CountdownTimer";
import { TabTitle } from "../../../utils/tabTitlePage";

import "./CheckoutSuccess.css";

const CheckoutSuccess = () => {
  const [order, setOrder] = useState([]);
  const { user } = UserAuth();
  let { orderid } = useParams();
  TabTitle("Lalasia | Checkout Suksess");

  const orderRef = collection(db, "users", `${user?.email}`, "orderHistory");
  const getOrder = query(orderRef, where("orderid", "==", `${orderid}`));
  useEffect(() => {
    onSnapshot(getOrder, (doc) => {
      const userOrder = [];
      doc.forEach((data) => {
        userOrder.push(data.data());
        setOrder(userOrder);
      });
    });
  }, [user?.email]);

  const dataOrder = Array.isArray(order) ? order : null;

  return (
    <div className="ContainerCheckoutSuccess">
      <h2>Checkout Berhasil</h2>
      <div className="countDownTimer">
        <h3>Segera Melakukan Pembayaran Dalam Waktu</h3>
        <h1>
          <CountdownTimer duration={8 * 60 * 60 * 1000} />
        </h1>
        <p>Halaman Checkout ini hanya project mandiri dan tidak mengirim barang apapun</p>
      </div>

      {dataOrder.map((data) => (
        <div className="transfer" key={data.pembayaran}>
          <h3>Transfer Ke Nomor Rekening {data.pembayaran}:</h3>
          <label>A/N Lalasia Project</label>
          <div className="norek">
            {/* <img src={mandiri} alt="logobank" width={100} /> */}
            <h4>0000-0000-0000</h4>
          </div>
          <p>Salin Nomor Rekening</p>
        </div>
      ))}

      <hr className="line" />

      <div className="jumlahPembayaran">
        <h3>Jumlah Yang Harus Di Bayarkan</h3>
        {dataOrder.map((datas) => (
          <h2 key={datas.orderid}>
            Rp. {numberWithCommas(datas.totaltagihan)}
          </h2>
        ))}
      </div>

      <div className="goToHistory">
        <Link to="../orderList">
          <p>Lihat History Pembelian</p>
        </Link>
      </div>

      <div className="infoStatement">
        <p>
          Pembelian akan <b>otomatis</b> dibatalkan apabila anda tidak melakukan
          pembayaran lebih dari <b>waktu yang di tentukan</b> setelah proses
          Checkout berhasil
        </p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
