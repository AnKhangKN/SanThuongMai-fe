import React from "react";
import HeaderInfoComponent from "../HeaderInfoComponent/HeaderInfoComponent";
import HeaderNavbarComponent from "../HeaderNavbarComponent/HeaderNavbarComponent";
import { Wrapper } from "./style";

const HeaderComponent = () => {
  return (
    <>
      <Wrapper style={{ fontFamily: "sans-serif" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="d-none d-md-block">
            <HeaderNavbarComponent />
          </div>

          <HeaderInfoComponent />
        </div>
      </Wrapper>
    </>
  );
};

export default HeaderComponent;
