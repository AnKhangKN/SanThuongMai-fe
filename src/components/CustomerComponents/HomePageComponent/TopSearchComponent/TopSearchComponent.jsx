import { Col, Row } from "antd";
import React from "react";
import { GrNext } from "react-icons/gr";
import { ProductTopItem } from "./style";

import product_demo from "../../../../assets/images/products/ao-demo.webp";

const TopSearchComponent = () => {
  return (
    <>
      <div style={{ backgroundColor: "#fff" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{ padding: "0px 20px", lineHeight: "60px", margin: "0px" }}
          >
            TopSearchComponent
          </h2>
          <div
            style={{
              display: "flex",
              padding: "0px 20px",
              margin: "0px",
            }}
          >
            <p style={{ fontSize: "15px" }}>Xem tất cả</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <GrNext />
            </div>
          </div>
        </div>

        <Row>
          <Col span={4}>
            <ProductTopItem>
              <div>
                <img
                  src={product_demo}
                  style={{ width: "100%" }}
                  alt=""
                  srcset=""
                />
              </div>
              <div>Áo thun</div>
            </ProductTopItem>
          </Col>
          <Col span={4}>
            <ProductTopItem>
              <div>
                <img
                  src={product_demo}
                  style={{ width: "100%" }}
                  alt=""
                  srcset=""
                />
              </div>
              <div>Áo thun</div>
            </ProductTopItem>
          </Col>
          <Col span={4}>
            <ProductTopItem>
              <div>
                <img
                  src={product_demo}
                  style={{ width: "100%" }}
                  alt=""
                  srcset=""
                />
              </div>
              <div>Áo thun</div>
            </ProductTopItem>
          </Col>
          <Col span={4}>
            <ProductTopItem>
              <div>
                <img
                  src={product_demo}
                  style={{ width: "100%" }}
                  alt=""
                  srcset=""
                />
              </div>
              <div>Áo thun</div>
            </ProductTopItem>
          </Col>
          <Col span={4}>
            <ProductTopItem>
              <div>
                <img
                  src={product_demo}
                  style={{ width: "100%" }}
                  alt=""
                  srcset=""
                />
              </div>
              <div>Áo thun</div>
            </ProductTopItem>
          </Col>
          <Col span={4}>
            <ProductTopItem>
              <div>
                <img
                  src={product_demo}
                  style={{ width: "100%" }}
                  alt=""
                  srcset=""
                />
              </div>
              <div>Áo thunun</div>
            </ProductTopItem>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TopSearchComponent;
