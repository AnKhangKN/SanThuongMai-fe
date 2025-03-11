import { Col } from "antd";
import React from "react";
import { WrapperHeader } from "./style";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import SearchBarComponent from "../SearchBarComponent/SearchBarComponent";
import ActionHeaderComponent from "../ActionHeaderComponent/ActionHeaderComponent";

const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader>
        <Col span={12} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: "26px" }}>
            <RiBarChartHorizontalLine />
          </div>
          <SearchBarComponent />
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <ActionHeaderComponent />
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
