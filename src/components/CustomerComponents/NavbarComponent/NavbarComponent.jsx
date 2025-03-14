import { Col, Row } from "antd";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoMdHeartEmpty } from "react-icons/io";

const NavbarComponent = () => {
  return (
    <div>
      <Row style={{height: "60px"}}>
        <Col span={8}>col-8</Col>
        <Col span={8}>
          <ul style={{ display: "flex", listStyle: "none", justifyContent: "space-around", alignItems: "center", lineHeight: "60px", margin: "0", padding: "0" }}>
            <li>Trang chủ</li>
            <li>Sản phẩm</li>
            <li>Khuyến mãi</li>
            <li>Mới nhất</li>
          </ul>
        </Col>
        <Col span={8}>
        <div style={{display: "flex",  justifyContent: "flex-end", alignItems: "center", height: "60px"}}>
          <div></div>
          <div><IoMdHeartEmpty /></div>
          <div><HiOutlineShoppingBag /></div>
        </div>
        </Col>
      </Row>
    </div>
  );
};

export default NavbarComponent;
