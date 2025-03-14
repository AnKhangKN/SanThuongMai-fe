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
import CommentBoxComponent from "../../../components/AdminComponents/MainComponents/CommentBoxComponent/CommentBoxComponent";

const DashboardPage = () => {
  return (
    <>
      <Wrapper>
        <Row style={{ marginBottom: "30px" }}>
          <Col span={12}>
            <p style={{ fontSize: "18px" }}>Dashboard</p>
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
            <BoxContainer>
              <div>
                <BoxQuantity>343 </BoxQuantity>
                <BoxName>Khách hàng</BoxName>
              </div>
              <IconContainer>
                <BsFillPeopleFill />
              </IconContainer>
            </BoxContainer>
          </Col>
          <Col className="gutter-row" span={6}>
            <BoxContainer>
              <div>
                <BoxQuantity>34</BoxQuantity>
                <BoxName>Shop</BoxName>
              </div>
              <IconContainer>
                <HiMiniBuildingStorefront />
              </IconContainer>
            </BoxContainer>
          </Col>
          <Col className="gutter-row" span={6}>
            <BoxContainer>
              <div>
                <BoxQuantity>20,000,000</BoxQuantity>
                <BoxName>Thu nhập</BoxName>
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
            <CommentBoxComponent />
          </Col>
        </Row>
      </Wrapper>
    </>
  );
};

export default DashboardPage;
