import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartModal, CartWrapper, IconWrapper } from "./style";

import Logo_Xoa_Phong from "../../../assets/images/Logo_Den-removebg-preview.png";
import SearchComponent from "../SearchComponent/SearchComponent";
import HeaderCategoryComponent from "../HeaderCategoryComponent/HeaderCategoryComponent";
import { Link } from "react-router-dom";
import anh from "../../../assets/images/Logo_Den.jpg";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const HeaderInfoComponent = () => {
  return (
    <>
      <div
        style={{
          height: "85px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/"
          style={{ display: "flex", color: "#fff", textDecoration: "none" }}
        >
          <div style={{ width: "65px" }}>
            <img
              src={Logo_Xoa_Phong}
              alt=""
              srcset=""
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div style={{ fontSize: "30px", padding: "20px 0px 0px 10px" }}>
            HKN
          </div>
        </Link>
        <div style={{ width: "100%", margin: "0px 30px 0px 60px" }}>
          <div>
            <SearchComponent />
          </div>
          <div style={{ margin: "8px 0px -12px 0px" }}>
            <HeaderCategoryComponent />
          </div>
        </div>

        {/* cart */}
        <CartWrapper>
          <IconWrapper>
            <AiOutlineShoppingCart />
          </IconWrapper>

          {/* modal cart */}
          <CartModal>
            <div>Sản phẩm mới thêm</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  flex: "0 0 15%",
                }}
              >
                <div style={{ width: "40px", height: "40px" }}>
                  <img
                    style={{ width: "100%", objectFit: "cover" }}
                    src={anh}
                    alt=""
                  />
                </div>
              </div>

              <div style={{ flex: "0 0 60%" }}>Tên sản phẩm</div>
              <div style={{ flex: "0 0 25%", textAlign: "end" }}>
                2.000.000đ
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  flex: "0 0 15%",
                }}
              >
                <div style={{ width: "40px", height: "40px" }}>
                  <img
                    style={{ width: "100%", objectFit: "cover" }}
                    src={anh}
                    alt=""
                  />
                </div>
              </div>

              <div style={{ flex: "0 0 60%" }}>Tên sản phẩm</div>
              <div style={{ flex: "0 0 25%", textAlign: "end" }}>
                2.000.000đ
              </div>
            </div>

            <div style={{ paddingTop: "20px" }}>
              <Link to="/cart">
                <ButtonComponent name="Xem giỏ hàng" />
              </Link>
            </div>
          </CartModal>
        </CartWrapper>
      </div>
    </>
  );
};

export default HeaderInfoComponent;
