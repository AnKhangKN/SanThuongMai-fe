import React from "react";
import TrendComponent from "../../../components/CustomerComponents/CategoryPageComponent/TrendComponent/TrendComponent";
import { Col, Row } from "antd";
import CategoryListComponent from "../../../components/CustomerComponents/CategoryPageComponent/CategoryListComponent/CategoryListComponent";
import CategoryProductComponent from "../../../components/CustomerComponents/CategoryPageComponent/CategoryProductComponent/CategoryProductComponent";

const CategoryPage = () => {
  return (
    <div style={{ marginTop: "120px", backgroundColor: "#f5f5f5" }}>
      <div style={{ width: "1200px ", margin: "auto" }}>
        {/* slide */}
        <div>slide</div>

        {/* trending */}
        <div style={{ padding: "20px", backgroundColor: "#fff" }}>
          <div>KIỂU CÁCH THỊNH HÀNH - DIỆN BẢNH MẶC SANG</div>
          <TrendComponent />
        </div>

        {/* products */}
        <div style={{ marginTop: "30px" }}>
          <Row>
            <Col span={4}>
              <CategoryListComponent />
            </Col>
            <Col span={20}>
              <CategoryProductComponent />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
