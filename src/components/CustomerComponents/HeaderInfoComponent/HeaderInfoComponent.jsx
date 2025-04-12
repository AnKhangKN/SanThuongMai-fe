import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IconWrapper } from "./style";

import Logo_Xoa_Phong from "../../../assets/images/Logo_Den-removebg-preview.png";
import SearchComponent from "../SearchComponent/SearchComponent";
import HeaderCategoryComponent from "../HeaderCategoryComponent/HeaderCategoryComponent";

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
        <div style={{ display: "flex" }}>
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
        </div>
        <div style={{ width: "100%", margin: "0px 30px 0px 60px" }}>
          <div>
            <SearchComponent />
          </div>
          <div style={{ margin: "8px 0px -12px 0px" }}>
            <HeaderCategoryComponent />
          </div>
        </div>
        <IconWrapper>
          <AiOutlineShoppingCart />
        </IconWrapper>
      </div>
    </>
  );
};

export default HeaderInfoComponent;
