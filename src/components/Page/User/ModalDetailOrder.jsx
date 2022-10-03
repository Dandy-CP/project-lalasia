import React, { useState, useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import { Link } from "react-router-dom";
import { db } from "../../../utils/firebaseConfig";
import { UserAuth } from "../../context/authContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

import "./ModalDetailOrder.css";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalDetailOrder = ({ buyDetail, onClose }) => {
  const [getProductRebuy, setGetProductRebuy] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    buyDetail.map((data) => {
      return setGetProductRebuy(data.itemCheckout);
    });
  }, [buyDetail]);

  const reBuyRef = doc(db, "users", `${user?.email}`);
  const AddRebuyProduct = async (itemID) => {
    if (user?.email) {
      try {
        const reBuy = getProductRebuy.filter((data) => data.id === itemID);
        reBuy.map((data) => {
          updateDoc(reBuyRef, {
            cartProduct: arrayUnion({
              id: data.id,
              category: data.category,
              img: data.img,
              nama: data.nama,
              tagline: data.tagline,
              harga: data.harga,
              qty: 1,
            }),
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const notifyAddToCart = () =>
    toast.success("Berhasil Ditambahkan ke keranjang", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <React.Fragment>
      <ToastContainer style={{ fontSize: "13px" }} />
      <div className="OverlayModal">
        <div className="containerDetailOrder">
          <button className="clsModalDetail" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </button>
          <h1 style={{ textAlign: "center", marginTop: "30px" }}>
            Detail Transaksi
          </h1>

          <hr className="lineBreak" />

          {buyDetail.map((data) => (
            <div className="buyDetailWrap" key={data.orderid}>
              <div className="orderStatus">
                <h3>Belum Lunas</h3>

                <hr className="lineBreakDot" />

                <div className="noInvoiceNdateBuy">
                  <div className="invoice">
                    <p>No. Invoice</p>
                    <Link
                      to={`../invoice/${data.invoice.replace(/[/]/g, "-")}`}
                      target="_blank"
                    >
                      <p>{data.invoice}</p>
                    </Link>
                  </div>

                  <div className="dateBuy">
                    <p>Tanggal Pembelian</p>
                    <p>{data.dateBuy}</p>
                  </div>
                </div>
              </div>
              <div className="detailProduct">
                <h3>Detail Produk</h3>
                {data.itemCheckout.map((list) => (
                  <div className="productHistoryList" key={list.id}>
                    <img src={list.img} alt={list.nama} width={120} />
                    <div className="detailProductHistory">
                      <Link to={`../product/${list.category}/${list.id}`}>
                        <h3>{list.nama}</h3>
                      </Link>
                      <p>
                        {list.qty} x Rp.{numberWithCommas(list.harga)}
                      </p>
                    </div>

                    <hr className="lineBreakDetail" />

                    <div className="hargaNrebuy">
                      <h3>Total Harga</h3>
                      <h4>Rp.{numberWithCommas(list.harga * list.qty)}</h4>
                      <button
                        className="btnRebuy"
                        onClick={() => {
                          AddRebuyProduct(list.id);
                          notifyAddToCart();
                        }}
                        style={{ marginLeft: "0px" }}
                      >
                        Beli Lagi
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {data.address.map((alamat) => (
                <div className="infoPengiriman" key={alamat.penerima}>
                  <h3>Info Pengiriman</h3>
                  <div className="kurir">
                    <p>Jenis Pengiriman</p>
                    <p> : {data.kurir}</p>
                  </div>

                  <div className="alamat">
                    <p>Alamat</p>
                    <div className="detailAlamat">
                      <p> : {alamat.penerima}</p>
                      <p>{alamat.nomorhp}</p>
                      <p>
                        {alamat.alamat}, {alamat.kota}, {alamat.kodepos}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="rincianPembayaran">
                <h3>Rincian Pembayaran</h3>
                <div className="metodePembayaran">
                  <p>Metode Pembayaran</p>
                  <p>{data.pembayaran}</p>
                </div>

                <hr className="lineBreakDot" />

                <div className="totalHargaPembelian">
                  <p>Total Harga ( {data.totalitem} Barang )</p>
                  <p>Rp.{numberWithCommas(data.totalharga)}</p>
                </div>

                <div className="totalOngkir">
                  <p>Total Ongkos Kirim ( {data.kurir} )</p>
                  <p>Rp.{numberWithCommas(data.ongkir)}</p>
                </div>

                <hr className="lineBreakDot" />

                <div className="totalBelanja">
                  <h3>Total Belanja</h3>
                  <h3>Rp.{numberWithCommas(data.totaltagihan)}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalDetailOrder;
