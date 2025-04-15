import React, { useState } from "react";
import { DetailBox, LocationText } from "./style";
import { Col, Row } from "antd";
import aodemo from "../../../assets/images/products/ao-demo-2.webp";
import aodemo1 from "../../../assets/images/products/ao-demo-phu1.webp";
import aodemo2 from "../../../assets/images/products/ao-demo-phu2.webp";
import aodemo3 from "../../../assets/images/products/ao-demo-phu3.webp";
import aodemo4 from "../../../assets/images/products/ao-demo-phu4.webp";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { BsCartPlus } from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";

const ProductDetailPage = () => {
  const listAnhPhu = [
    {
      key: 1,
      src: aodemo1,
    },
    {
      key: 2,
      src: aodemo2,
    },
    {
      key: 3,
      src: aodemo3,
    },
    {
      key: 4,
      src: aodemo4,
    },
    {
      key: 5,
      src: aodemo1,
    },
    {
      key: 6,
      src: aodemo2,
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const maxVisible = 5;

  const handleNext = () => {
    if (startIndex + maxVisible < listAnhPhu.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

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
              <Col span={10}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingRight: "20px",
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src={aodemo}
                    alt=""
                    srcset=""
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingRight: "20px",
                    marginTop: "10px",
                    position: "relative",
                  }}
                >
                  <button
                    onClick={handlePrev}
                    disabled={startIndex === 0}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      left: "0",
                      background: "transparent",
                      border: "none",
                      cursor: startIndex === 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    <GrFormPrevious />
                  </button>

                  {listAnhPhu
                    .slice(startIndex, startIndex + maxVisible)
                    .map((item) => (
                      <div
                        key={item.key}
                        style={{
                          width: "82px",
                          margin: "0 5px",
                        }}
                      >
                        <img src={item.src} alt="" style={{ width: "100%" }} />
                      </div>
                    ))}

                  <button
                    onClick={handleNext}
                    disabled={startIndex + maxVisible >= listAnhPhu.length}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      right: "20px",
                      background: "transparent",
                      border: "none",
                      cursor:
                        startIndex + maxVisible >= listAnhPhu.length
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    <GrFormNext />
                  </button>
                </div>
              </Col>
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
                    <div style={{ marginRight: "10px" }}>45k Đánh giá</div>
                    <div style={{ marginRight: "10px", width: "0.5px" }}>|</div>
                    <div>67K Lượt mua</div>
                  </div>
                  <div>Tố cáo</div>
                </div>
                <div style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
                  <div style={{ display: "flex" }}>
                    <div>đ</div>
                    <p style={{ fontSize: "30px", margin: "0px" }}>29.000</p>
                  </div>
                </div>
                <div style={{ width: "100px", marginTop: "20px" }}>
                  Giá vận chuyển
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "20px",
                  }}
                >
                  <div style={{ width: "100px" }}>Màu sắc</div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        color: "ccc",
                        width: "60px",
                        height: "48px",
                      }}
                    >
                      Xám
                    </button>
                    <button
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        color: "ccc",
                        width: "60px",
                        height: "48px",
                      }}
                    >
                      Đen
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "20px",
                  }}
                >
                  <div style={{ width: "100px" }}>Kích thước</div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        color: "ccc",
                        width: "60px",
                        height: "48px",
                      }}
                    >
                      {" "}
                      S
                    </button>
                    <button
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        color: "ccc",
                        width: "60px",
                        height: "48px",
                      }}
                    >
                      {" "}
                      M
                    </button>
                    <button
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        color: "ccc",
                        width: "60px",
                        height: "48px",
                      }}
                    >
                      L
                    </button>
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "20px",
                    }}
                  >
                    <div style={{ width: "100px" }}>Số lượng</div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          border: "1px solid #ccc",
                          outline: "none",
                          color: "#ccc",
                          backgroundColor: "#fff",
                        }}
                      >
                        <FiMinus />
                      </button>
                      <input
                        type="text"
                        value="0"
                        style={{
                          width: "50px",
                          height: "28px",
                          textAlign: "center",
                          border: "1px solid #ccc",
                          outline: "none",
                        }}
                      />
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          border: "1px solid #ccc",
                          outline: "none",
                          color: "#ccc",
                          backgroundColor: "#fff",
                        }}
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  <div>Số lượng còn lại</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "50px",
                  }}
                >
                  <button
                    style={{
                      height: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      padding: "0px 20px",
                      fontSize: "16px",
                      border: "1px solid #d0011b",
                      color: "#d0011b",
                      background: "rgba(208, 1, 27, .08)",
                      outline: "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "20px",
                      }}
                    >
                      <BsCartPlus />
                    </div>
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    style={{
                      height: "48px",
                      padding: "0px 50px",
                      fontSize: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      background: "#d0011b",
                      color: "#fff",
                      outline: "none",
                      border: "none",
                    }}
                  >
                    Mua ngay
                  </button>
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
