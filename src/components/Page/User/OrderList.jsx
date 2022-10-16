import React, { useState, useEffect } from "react";
import { UserAuth } from "../../context/authContext";
import { db } from "../../../utils/firebaseConfig";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import { numberWithCommas } from "../../../utils/numberWithCommas";

import "./OrderList.css";
import ModalDetailOrder from "./ModalDetailOrder";
import ModalRebuy from "./ModalRebuy";
import { TabTitle } from "../../../utils/tabTitlePage";
import BagShop from "../../assets/bag-2.png";

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const [buyDetail, setBuyDetail] = useState([]);
  const [rebuyProduct, setRebuyProduct] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = UserAuth();
  TabTitle("Lalasia | History Pembelian");

  const orderListRef = collection(db, "users", `${user?.email}`, "orderHistory");
  useEffect(() => {
    onSnapshot(orderListRef, (doc) => {
      const orderedList = [];
      doc.forEach((data) => {
        orderedList.push(data.data());
        setOrderList(orderedList);
      });
    });
  }, [user?.email]);
  const orderListData = Array.isArray(orderList) ? orderList : null;

  const ShowOrderDetail = searchParams.get("detail");

  const orderDetailRef = collection(db, "users", `${user?.email}`, "orderHistory");
  const getOrderDetail = query(orderDetailRef, where("orderid", "==", ShowOrderDetail));
  useEffect(() => {
    onSnapshot(getOrderDetail, (doc) => {
      const details = [];
      doc.forEach((data) => {
        details.push(data.data());
        setBuyDetail(details);
      });
    });
  }, [user?.email, ShowOrderDetail]);
  const buyDetailData = Array.isArray(buyDetail) ? buyDetail : null;

  const ShowRebuyProduct = searchParams.get("rebuy");
  const getProductRebuy = query(orderDetailRef, where("orderid", "==", ShowRebuyProduct));
  useEffect(() => {
    onSnapshot(getProductRebuy, (doc) => {
      const rebuyProduct = [];
      doc.forEach((data) => {
        rebuyProduct.push(data.data());
        setRebuyProduct(rebuyProduct);
      });
    });
  }, [user?.email, ShowRebuyProduct]);
  const rebuyPorductData = Array.isArray(rebuyProduct) ? rebuyProduct : null;

  return (
    <React.Fragment>
      {ShowOrderDetail ? (
        <ModalDetailOrder
          buyDetail={buyDetailData}
          onClose={() => {
            setSearchParams({});
            setBuyDetail([]);
          }}
        />
      ) : null}

      {ShowRebuyProduct ? (
        <ModalRebuy
          productRebuy={rebuyPorductData}
          onClose={() => {
            setSearchParams({});
            setRebuyProduct([]);
          }}
        />
      ) : null}

      <div className="containerOrderList">
        <h2>Daftar Transaksi</h2>
        {orderListData.length === 0 ? (
          <div className="boxOrderWrap">
            <div className="emptyListHistory">
              <h4>Tampak nya kamu belum membeli Sesuatu di Lalasia</h4>
              <p>Cek menu product dan segera wujudkan pembelian mu</p>
            </div>
          </div>
        ) : (
          <div className="boxOrderWrap">
            {orderListData.map((list) => (
              <div className="productOrdered" key={list.orderid}>
                <div className="orderDetail">
                  <img src={BagShop} alt="bagShop" width={25} height={25} />
                  <b>
                    <p>Order</p>
                  </b>
                  <p>{list.dateBuy}</p>
                  <p className="statusOrder">Belum Lunas</p>
                  <p>{list.invoice}</p>
                </div>

                {list.itemCheckout.slice(0, 1).map((listProduct) => (
                  <div className="orderProduct" key={list.orderid}>
                    <img
                      src={listProduct.img}
                      alt={listProduct.nama}
                      width={120}
                    />
                    <div className="orderProductDanTagihan">
                      <div className="namaProduct">
                        <h4>{listProduct.nama}</h4>
                        <p>
                          {list.totalitem} Barang x Rp.
                          {numberWithCommas(listProduct.harga)}
                        </p>
                        <p>+{list.totalitem} Total Product</p>
                      </div>

                      <hr />

                      <div className="orderTagihan">
                        <p>Total Tagihan</p>
                        <h3>Rp.{numberWithCommas(list.totaltagihan)}</h3>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="orderBtnAction">
                  <p
                    onClick={() => {
                      setSearchParams({ detail: `${list.orderid}` });
                      setBuyDetail(buyDetailData);
                    }}
                  >
                    Lihat Detail Transaksi
                  </p>
                  <button
                    className="btnRebuy"
                    onClick={() => {
                      setSearchParams({ rebuy: `${list.orderid}` });
                      setRebuyProduct(rebuyPorductData);
                    }}
                  >
                    Beli Lagi
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default OrderList;
