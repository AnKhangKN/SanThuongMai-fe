import React from "react";
import HeaderOfVendorComponent from "../HeaderOfVendorComponent/HeaderOfVendorComponent";
import NavbarOfVendorRightComponent from "../NavbarOfVendorRightComponent/NavbarOfVendorRightComponent";
import { WrapperBody, WrapperColCenter, WrapperColLeft, WrapperColRight } from "./styleOfVendorLayout";
// import { Col } from "antd";
import MenuVendorComponent from "../MenuVendorComponent/MenuVendorComponent";

const VendorLayout = ({ children }) => {
  return (
    <div>
      <HeaderOfVendorComponent />
      <WrapperBody>
        <WrapperColLeft span={5}>
          <MenuVendorComponent />
        </WrapperColLeft>
        <WrapperColCenter span={18}>
          {children}
        </WrapperColCenter>
        <WrapperColRight span={1}><NavbarOfVendorRightComponent /></WrapperColRight>
      </WrapperBody>
    </div>
  );
};

export default VendorLayout;
