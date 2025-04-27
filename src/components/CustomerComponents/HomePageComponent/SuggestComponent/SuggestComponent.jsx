import { Col, Row } from "antd";
import React, { useState } from "react";
import img from "../../../../assets/images/products/ao-demo-phu3.webp";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import { Link } from "react-router-dom";

// Mảng sản phẩm mẫu
const sampleProducts = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Sản phẩm ${i + 1}`,
  img: img,
  price: `200.000`,
  sell: `100k`,
}));

const SuggestComponent = () => {
  const [visibleRows, setVisibleRows] = useState(4); // 4 dòng mặc định
  const itemsPerRow = 4;

  const handleLoadMore = () => {
    setVisibleRows((prev) => prev + 2); // Tăng thêm 2 dòng
  };

  const visibleProducts = sampleProducts.slice(0, visibleRows * itemsPerRow);

  return (
    <div>
      <Row gutter={[16, 16]}>
        {visibleProducts.map((product) => (
          <Col span={6} key={product.id}>
            <Link
              to="product/:id"
              style={{ textDecoration: "none", color: "#333" }}
            >
              <div
                style={{
                  border: "1px solid #ccc",
                }}
              >
                <div style={{ width: "100%" }}>
                  <img
                    style={{ width: "100%" }}
                    src={product.img}
                    alt={product.name}
                  />
                </div>
                <div style={{ padding: "10px" }}>
                  <div style={{ marginBottom: "30px" }}>{product.name}</div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        color: "#ee4d2d",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "2px",
                      }}
                    >
                      <div style={{ fontSize: "10px" }}>đ</div>
                      <div style={{ fontSize: "18px" }}>{product.price}</div>
                    </div>
                    <div style={{ fontSize: "13px" }}>
                      Đã bán: {product.sell}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>

      <div style={{ backgroundColor: "#f5f5f5", paddingTop: "20px" }}>
        {visibleProducts.length < sampleProducts.length && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <ButtonComponent onClick={handleLoadMore} name="Xem Thêm" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestComponent;
