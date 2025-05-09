import React from "react";
import logo from "../../../../assets/images/Logo_Trang.jpg";
import { PiBellSimpleRingingBold } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineBorderColor } from "react-icons/md";
import { LiaListAltSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";

const SidebarAccount = () => {
  const navigage = useNavigate();

  return (
    <>
      <div style={{ display: "flex", flexFlow: "column", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: " 34px",
              height: "34px",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: "100%", objectFit: "contain" }}
              src={logo}
              alt=""
            />
          </div>
          <div>
            <div>Tên</div>
            <Link
              to="/user/account/profile"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                textDecoration: "none",
                color: "#5a5a5a",
              }}
            >
              <div>
                <MdOutlineBorderColor />
              </div>
              <div>Sửa hồ sơ</div>
            </Link>
          </div>
        </div>

        <Link
          to="/user/notification"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "#333",
          }}
        >
          <div style={{ fontSize: "24px" }}>
            <PiBellSimpleRingingBold />
          </div>
          <div>Thông báo</div>
        </Link>

        <div style={{ display: "flex", flexFlow: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ fontSize: "24px" }}>
              <FaRegUser />
            </div>
            <div>Tài khoản của tôi</div>
          </div>

          <div>
            <div style={{ display: "flex", flexFlow: "column", gap: "10px" }}>
              <Link
                to="/user/account/profile"
                style={{
                  marginLeft: "34px",
                  textDecoration: "none",
                  color: "#333",
                }}
              >
                Hồ sơ
              </Link>
              <Link
                to="/user/account/wallet"
                style={{
                  marginLeft: "34px",
                  textDecoration: "none",
                  color: "#333",
                }}
              >
                Ví HKN
              </Link>
              <Link
                to="/user/account/change-password"
                style={{
                  marginLeft: "34px",
                  textDecoration: "none",
                  color: "#333",
                }}
              >
                Đổi mật khẩu
              </Link>
              <Link
                to="/user/account/delete"
                style={{
                  marginLeft: "34px",
                  textDecoration: "none",
                  color: "#333",
                }}
              >
                Xóa tài khoản
              </Link>
            </div>
          </div>
        </div>

        <Link
          to="/user/purchase/delivered"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "#333",
          }}
        >
          <div style={{ fontSize: "24px" }}>
            <LiaListAltSolid />
          </div>
          <div>Đơn hàng</div>
        </Link>
      </div>
    </>
  );
};

export default SidebarAccount;
