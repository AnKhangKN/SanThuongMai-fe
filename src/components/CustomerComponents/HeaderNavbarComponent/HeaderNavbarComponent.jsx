import React from "react";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ConnectText, IconWrapper, Wrapper } from "./style";
import { BsInstagram } from "react-icons/bs";
import { PiBellSimpleRingingBold } from "react-icons/pi";
import { SlQuestion } from "react-icons/sl";

import Logo_Trang from "../../../assets/images/Logo_Trang.jpg";

const HeaderNavbarComponent = () => {
  return (
    <>
      <Wrapper>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <Link
              to="/vendor"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Kênh Bán Hàng
            </Link>
          </div>
          <ConnectText>Kết nối</ConnectText>
          <div>
            <Link to="" style={{ color: "#fff" }}>
              <FaFacebook />
            </Link>
            <Link to="" style={{ color: "#fff", paddingLeft: "6px" }}>
              <BsInstagram />
            </Link>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconWrapper>
              <PiBellSimpleRingingBold />
            </IconWrapper>
            <div>Thông báo</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "0 20px 0px 10px",
            }}
          >
            <IconWrapper>
              <SlQuestion />
            </IconWrapper>
            <div>Hỗ trợ</div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                height: "24px",
                width: "24px",
                borderRadius: "50%",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={Logo_Trang}
                alt=""
                srcset=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div style={{ marginLeft: "5px" }}>Thông tin cá nhân</div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default HeaderNavbarComponent;
