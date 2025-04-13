import React from "react";
import { DetailBox, LocationText } from "./style";
import { Col, Row } from "antd";

const ProductDetailPage = () => {
  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <div
        style={{
          width: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", lineHeight: "60px" }}
        >
          <LocationText>Chi tiết sản phẩm</LocationText>
          <LocationText>Tên danh mục</LocationText>
          <div>Tên sản phẩm</div>
        </div>
        <div>
          <DetailBox>
            <Row>
              <Col span={10}>ảnh</Col>
              <Col
                span={14}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h4>
                  Áo Thun DSQ ICON Phối In Hinh Lá Màu Đỏ. Áo Phông Nam Nữ
                  Dsquared2 Form Dáng Unisex Dành Cho Các Boy Phố [M39]
                </h4>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>đánh giá</div>
                    <div>Luot mua</div>
                  </div>
                  <div>Tố cáo</div>
                </div>
                <div>Giá</div>
                <div>Giá vận chuyển</div>
                <div>Màu sắc</div>
                <div>Kích thước</div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>Số lượng</div>
                  <div>Số lượng còn lại</div>
                </div>
                <div>
                  <button>Thêm vào giỏ hàng</button>
                  <button>Mua ngay</button>
                </div>
              </Col>
            </Row>
          </DetailBox>

          <DetailBox>
            <Row>
              <Col span={8} style={{ display: "flex", alignItems: "center" }}>
                <div>ảnh shop</div>
                <div>
                  <div>Tên shop</div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button>Chat ngay</button>
                    <button>Xem shop</button>
                  </div>
                </div>
              </Col>
              <Col
                span={16}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div>Luongj đánh gía</div>
                  <div>lượng sản phẩm</div>
                </div>
                <div>
                  <div>Người theo dỗi</div>
                  <div>thời gian tham gia</div>
                </div>
              </Col>
            </Row>
          </DetailBox>
          <DetailBox>description</DetailBox>
          <DetailBox>comment</DetailBox>

          <DetailBox>product for different shop</DetailBox>

          <DetailBox>option</DetailBox>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
