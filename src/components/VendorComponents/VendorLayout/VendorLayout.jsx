import React from "react";
import HeaderOfVendorComponent from "../HeaderOfVendorComponent/HeaderOfVendorComponent";
import NavbarOfVendorRightComponent from "../NavbarOfVendorRightComponent/NavbarOfVendorRightComponent";
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
        <Col span={1} style={{flex: 0}}><NavbarOfVendorRightComponent /></Col>
      </WrapperBody>
    </div>
  );
};

export default VendorLayout;
