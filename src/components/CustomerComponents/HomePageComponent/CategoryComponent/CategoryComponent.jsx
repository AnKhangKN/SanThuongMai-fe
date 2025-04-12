import { Col, Row } from "antd";
import React from "react";

import ao_demo from "../../../../assets/images/products/ao-demo.webp";

const CategoryComponent = () => {
  return (
    <>
      <div style={{ backgroundColor: "#fff" }}>
        <h3 style={{ padding: "0px 20px", lineHeight: "60px", margin: "0px" }}>
          Danh mục
        </h3>
        <Row>
          {Array.from({ length: 20 }).map((_, index) => {
            const key = `col-${index}`;
            return (
              <Col
                key={key}
                xs={{ flex: "100%" }}
                sm={{ flex: "50%" }}
                md={{ flex: "40%" }}
                lg={{ flex: "20%" }}
                xl={{ flex: "10%" }}
              >
                <div
                  style={{
                    width: "100%",
                    border: "0.5px solid #f5f5f5",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <img src={ao_demo} alt="" style={{ width: "100%" }} />
                  </div>
                  <div style={{ textAlign: "center" }}>Thời trang nam</div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default CategoryComponent;
