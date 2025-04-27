import React from "react";
import HeaderInfoComponent from "../HeaderInfoComponent/HeaderInfoComponent";
import HeaderNavbarComponent from "../HeaderNavbarComponent/HeaderNavbarComponent";
import { Wrapper } from "./style";

const HeaderComponent = () => {
  return (
    <>
      <Wrapper style={{ fontFamily: "sans-serif" }}>
        <div style={{ width: "1200px", margin: "0 auto" }}>
          <HeaderNavbarComponent />
          <HeaderInfoComponent />
        </div>
      </Wrapper>
    </>
  );
};

export default HeaderComponent;
