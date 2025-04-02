import React from "react";
import { Wrapper } from "./style";
import OrderFeedbackList from "../../../components/AdminComponents/MainComponents/ReportPageComponent/OrderFeedbackList/OrderFeedbackList";
import ProductFeedbackList from "../../../components/AdminComponents/MainComponents/ReportPageComponent/ProductFeedbakList/ProductFeedbackList";
import ShopFeedbackList from "../../../components/AdminComponents/MainComponents/ReportPageComponent/ShopFeedbackList/ShopFeedbackList";
import { Col, Row } from "antd";

const ReportManagementPage = () => {
  return (
    <>
      <Wrapper>
        <h1>các phản hồi của khách hàng</h1>

        <Row>
          <Col span={12}>
            <div style={{ margin: "0px 10px 0px 0px" }}>
              Danh sách shop bị report
              <ShopFeedbackList />
            </div>
          </Col>
          <Col span={12}>
            <div style={{ margin: "0px 0px 0px 10px" }}>
              Các sản phẩm bị report
              <ProductFeedbackList />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div style={{ margin: "0px 10px 0px 0px" }}>
              Đơn hàng bị report
              <OrderFeedbackList />
            </div>
          </Col>
          <Col span={12}>col-12</Col>
        </Row>
      </Wrapper>
    </>
  );
};

export default ReportManagementPage;
