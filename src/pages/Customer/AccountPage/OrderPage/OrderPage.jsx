import React from "react";
import AccountPage from "../AccountPage";
import { Link } from "react-router-dom";

const OrderPage = ({ children }) => {
  return (
    <AccountPage>
      <div style={{ display: "flex", backgroundColor: "#fff" }}>
        <Link
          to="/user/purchase/complete"
          style={{
            flex: "0 0 20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: "50px",
          }}
        >
          Hoàn thành
        </Link>
        <Link
          to="/user/purchase/waiting-payment"
          style={{
            flex: "0 0 20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: "50px",
          }}
        >
          Chờ thanh toán
        </Link>
        <Link
          to="/user/purchase/transport"
          style={{
            flex: "0 0 20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: "50px",
          }}
        >
          Vận chuyển
        </Link>
        <Link
          to="/user/purchase/waiting-delivery"
          style={{
            flex: "0 0 20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: "50px",
          }}
        >
          Chờ giao hàng
        </Link>
        <Link
          to="/user/purchase/cancel"
          style={{
            flex: "0 0 20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: "50px",
          }}
        >
          Hủy
        </Link>
      </div>

      {children}
    </AccountPage>
  );
};

export default OrderPage;
