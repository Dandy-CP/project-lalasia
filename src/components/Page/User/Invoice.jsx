import React, { useEffect, useState, useRef } from "react";
import { UserAuth } from "../../context/authContext";
import { db } from "../../../utils/firebaseConfig";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { numberWithCommas } from "../../../utils/numberWithCommas";
import ReactToPrint from "react-to-print";
import { useParams } from "react-router-dom";

import "./Invoice.css";
import Logo from "../../assets/Logo.png";
import { TabTitle } from "../../../utils/tabTitlePage";

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const { user } = UserAuth();
  let { invoice } = useParams();
  const getInvoice = invoice.split("-").join("/");
  const componentRef = useRef();
  TabTitle(`Lalasia | ${getInvoice}`);


  const invoiceDataRef = collection(db, "users", `${user?.email}`, "orderHistory");
  const getInvoiceData = query(invoiceDataRef, where("invoice", "==", getInvoice));
  useEffect(() => {
    onSnapshot(getInvoiceData, (doc) => {
      const dataInvoice = [];
      doc.forEach((data) => {
        dataInvoice.push(data.data());
        setInvoiceData(dataInvoice);
      });
    });
  }, [user?.email]);
  const BuyInvoice = Array.isArray(invoiceData) ? invoiceData : null;

  return (
    <React.Fragment>
      <div className="navbarInvoice">
        <ReactToPrint
          trigger={() => {
            return <button>Cetak Invoice</button>;
          }}
          content={() => componentRef.current}
          documentTitle="Invoice Pembelian"
        />
      </div>
      {BuyInvoice.map((data) => (
        <div className="containerInvoice" ref={componentRef}>
          <div className="logoNinvoice">
            <img src={Logo} alt="logo" />
            <div className="invoiceProduct">
              <h5>INVOICE</h5>
              <p>{data.invoice}</p>
            </div>
          </div>

          <div className="peneribitan">
            <div className="diterbikanAtasNama">
              <h5>DITERBITKAN ATAS NAMA</h5>
              <p>
                Penjual: <b>Lalasia</b>
              </p>
            </div>
            {data.address.map((alamat) => (
              <div className="detailPembeli">
                <h5>UNTUK</h5>
                <p>Pembeli : {alamat.penerima}</p>
                <p>Tanggal Pembelian : {data.dateBuy}</p>
                <div className="alamatPenerima">
                  <p>
                    Alamat Pengiriman : {alamat.penerima}, {alamat.nomorhp},{" "}
                    {alamat.alamat}, {alamat.kota}, {alamat.kodepos}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <span>
            <hr />
          </span>

          <div className="tableHeader">
            <div className="tableHeaderNamaProduk">
              <h5> INFO PRODUK </h5>
            </div>
            <div className="jumlahBarang">
              <h5> JUMLAH </h5>
            </div>
            <div className="hargaSatuan">
              <h5> HARGA SATUAN </h5>
            </div>
            <div className="totalHargaBelanja">
              <h5> TOTAL HARGA </h5>
            </div>
          </div>

          <span>
            <hr />
          </span>

          {data.itemCheckout.map((product) => (
            <div className="productBuyList">
              <div className="tableHeaderNamaProduk">
                <h5>{product.nama}</h5>
              </div>
              <div className="jumlahBarang">
                <p>{product.qty}</p>
              </div>
              <div className="hargaSatuan">
                <p>Rp. {numberWithCommas(product.harga)}</p>
              </div>
              <div className="totalHargaBelanja">
                <p>Rp. {numberWithCommas(product.harga * product.qty)}</p>
              </div>
            </div>
          ))}

          <span>
            <hr className="lineBreak" />
          </span>

          <div className="pembayaran">
            <div className="totalHargaOrder">
              <h5>TOTAL HARGA ({data.totalitem} BARANG)</h5>
              <h5>Rp. {numberWithCommas(data.totalharga)}</h5>
            </div>

            <div className="totalOngkirOrder">
              <p>Total Ongkos Kirim</p>
              <p>Rp. {numberWithCommas(data.ongkir)}</p>
            </div>

            <hr className="lineBreak" />

            <div className="totalBelanjaOrder">
              <h5>TOTAL BELANJA</h5>
              <h5>Rp. {numberWithCommas(data.totaltagihan)}</h5>
            </div>
            <h2>BELUM LUNAS</h2>
          </div>

          <span>
            <hr className="lineBreak" />
          </span>

          <div className="kurirNbank">
            <div className="kurirOrder">
              <p>Kurir :</p>
              <h5>{data.kurir}</h5>
            </div>
            <div className="pembayaranOrder">
              <p>Metode Pembayaran</p>
              <h5>{data.pembayaran}</h5>
            </div>
          </div>

          <span>
            <hr className="lineBreak" />
          </span>

          <div className="statement">
            <p>
              Invoice ini hanya dummy untuk project mandiri tidak mengirim
              barang apapun
            </p>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Invoice;
