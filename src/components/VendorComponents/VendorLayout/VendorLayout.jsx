import React from "react";
import HeaderOfVendorComponent from "../HeaderOfVendorComponent/HeaderOfVendorComponent";
import NavbarOfVendorComponent from "../NavbarOfVendorComponent/NavbarOfVendorComponent";
import { Col} from "antd";
import { WrapperBody, WrapperColLeft } from "./styleOfVendorLayout";

const VendorLayout = ({ children }) => {
  return (
    <div>
      <HeaderOfVendorComponent />
      <WrapperBody>
        <WrapperColLeft span={23}>

        {children}
        </WrapperColLeft>
        <Col span={1} style={{right: 0}}><NavbarOfVendorComponent /></Col>
      </WrapperBody>
    </div>
  );
};

export default VendorLayout;
