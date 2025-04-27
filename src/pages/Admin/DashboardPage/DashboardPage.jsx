import React from "react";
import {
  BoxContainer,
  BoxName,
  BoxQuantity,
  IconContainer,
  Wrapper,
} from "./style";
import { Col, DatePicker, Row } from "antd";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiMiniBuildingStorefront } from "react-icons/hi2";
import { BiSolidDollarCircle } from "react-icons/bi";
import { MdShoppingCart } from "react-icons/md";
import LineChartBoxComponent from "../../../components/AdminComponents/MainComponents/LineChartBoxComponent/LineChartBoxComponent";
import WalletComponent from "../../../components/AdminComponents/MainComponents/WalletComponent/WalletComponent";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <>
      <Wrapper>
        <Row style={{ marginBottom: "30px" }}>
          <Col span={12}>
            <h3>Tổng quan</h3>
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <div>
              <DatePicker />
            </div>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <Link to="/admin/vendors">
              <BoxContainer>
                <div>
                  <BoxQuantity>343 </BoxQuantity>
                  <BoxName>Shop</BoxName>
                </div>
                <IconContainer>
                  <BsFillPeopleFill />
                </IconContainer>
              </BoxContainer>
            </Link>
          </Col>
          <Col className="gutter-row" span={6}>
            <Link to="/admin/products">
              <BoxContainer>
                <div>
                  <BoxQuantity>34</BoxQuantity>
                  <BoxName>Sản phẩm</BoxName>
                </div>
                <IconContainer>
                  <HiMiniBuildingStorefront />
                </IconContainer>
              </BoxContainer>
            </Link>
          </Col>
          <Col className="gutter-row" span={6}>
            <BoxContainer>
              <div>
                <BoxQuantity>20,000,000</BoxQuantity>
                <BoxName>Thu nhập/tháng</BoxName>
              </div>

              <IconContainer>
                <BiSolidDollarCircle />
              </IconContainer>
            </BoxContainer>
          </Col>
          <Col className="gutter-row" span={6}>
            <BoxContainer>
              <div>
                <BoxQuantity>5,543</BoxQuantity>
                <BoxName>Đơn Hàng</BoxName>
              </div>
              <IconContainer>
                <MdShoppingCart />
              </IconContainer>
            </BoxContainer>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "20px" }}>
          <Col className="gutter-row" span={15}>
            <LineChartBoxComponent />
          </Col>
          <Col className="gutter-row" span={9}>
            <WalletComponent />
          </Col>
        </Row>
      </Wrapper>
    </>
  );
};

export default DashboardPage;
