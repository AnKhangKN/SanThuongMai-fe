// AccountPage.js
import React from "react";
import SidebarAccount from "../../../components/CustomerComponents/AccountPageComponent/SidebarAccount/SidebarAccount";
import { Col, Row } from "antd";

const AccountPage = ({ children }) => {
  return (
    <>
      <div
        style={{
          marginTop: "120px",
          backgroundColor: "#f5f5f5",
          height: "100%",
        }}
      >
        <Row
          style={{
            display: "flex",
            width: "1200px",
            margin: "auto",
            padding: " 20px 0px 50px 0px",
            height: "100%",
          }}
        >
          <Col span={4}>
            <SidebarAccount />
          </Col>
          <Col span={20}>
            <div>{children}</div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AccountPage;
