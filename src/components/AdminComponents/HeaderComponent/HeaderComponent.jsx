import { Col } from "antd";
import React from "react";
import { IconContainer, WrapperHeader } from "./style";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import SearchBarComponent from "../SearchBarComponent/SearchBarComponent";
import ActionHeaderComponent from "../ActionHeaderComponent/ActionHeaderComponent";

const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader>
        <Col
          span={12}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "25px",
            paddingLeft: "25px",
            color: " #6c757d",
          }}
        >
          <IconContainer>
            <RiBarChartHorizontalLine />
          </IconContainer>
          <SearchBarComponent />
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            color: " #6c757d",
          }}
        >
          <ActionHeaderComponent />
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
