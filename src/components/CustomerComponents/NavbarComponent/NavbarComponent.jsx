import { Col, Row } from "antd";
import Search from "antd/es/transfer/search";
import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { PiShoppingCartSimple } from "react-icons/pi";
import Logo_Trang from "../../../assets/images/Logo_Trang.jpg";

const NavbarComponent = () => {
  return (
    <div>
      <Row style={{ height: "60px" }}>
        <Col span={8}>
          <div style={{ display: "flex", alignItems: "center", height: "70px" }}>
            <div
              style={{ width: "50px", display: "flex", alignItems: "center" , margin:"0px 0px 10px 50px"}}
            >
              <img src={Logo_Trang} style={{ width: "100%" }} />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              justifyContent: "space-around",
              alignItems: "center",
              lineHeight: "60px",
              margin: "0",
              padding: "5px",
            }}
          >
            <li>Trang chủ</li>
            <li>Sản phẩm</li>
            <li>Khuyến mãi</li>
            <li>Mới nhất</li>
          </ul>
        </Col>
        <Col span={8}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "60px",
              gap: "15px",
              paddingRight: "10px",
            }}
          >
            <div style={{ marginRight: "50px" }}>
              <Search
                placeholder="Tìm kiếm sản phẩm"
                allowClear
                enterButton="Search"
                size="large"
                // onSearch={onSearch}
              />
            </div>
            <div style={{ fontSize: "20px" }}>
              <IoMdHeartEmpty />
            </div>
            <div style={{ fontSize: "20px", marginRight: "20px" }}>
              <PiShoppingCartSimple />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NavbarComponent;
