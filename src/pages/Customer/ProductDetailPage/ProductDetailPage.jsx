import React, { useState } from "react";
import { DetailBox, LocationText } from "./style";
import { Avatar, Col, Row, Space } from "antd";
import aodemo from "../../../assets/images/products/ao-demo-2.webp";
import aodemo1 from "../../../assets/images/products/ao-demo-phu1.webp";
import aodemo2 from "../../../assets/images/products/ao-demo-phu2.webp";
import aodemo3 from "../../../assets/images/products/ao-demo-phu3.webp";
import aodemo4 from "../../../assets/images/products/ao-demo-phu4.webp";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { BsCartPlus } from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaStar, FaUserAlt } from "react-icons/fa";
import { IoIosChatboxes, IoIosStar } from "react-icons/io";
import { AiOutlineShop } from "react-icons/ai";

const paginationButtonStyle = {
  background: "transparent",
  border: "none",
  color: "#666",
  fontSize: "16px",
  cursor: "pointer",
  width: "32px",
  height: "32px",
  borderRadius: "4px",
};

const paginationActiveStyle = {
  ...paginationButtonStyle,
  background: "#f84a2f",
  color: "#fff",
};

const paginationArrowStyle = {
  ...paginationButtonStyle,
  fontWeight: "bold",
};


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
          margin: "auto",
          marginTop: "120px",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", lineHeight: "60px" }}
        >
          <LocationText>Trang chủ</LocationText>
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
                <div>
                  <Space direction="vertical" size={16}>
                    <Space wrap size={16}>
                      <Avatar size={64} icon={<FaUserAlt />} />
                    </Space>
                  </Space>
                </div>
                <div>
                  <div style={{ margin: "0px 0px 5px 10px" }}>Tên shop</div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      style={{
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "3px",
                        padding: "0px 15px",
                        margin: "0px 10px 17px 10px",
                        fontSize: "14px",
                        border: "1px solid rgb(248, 74, 47)",
                        color: "#d0011b",
                        background: "rgba(208, 1, 27, .08)",
                        outline: "none",
                      }}
                    >
                      <div>
                        <IoIosChatboxes />
                      </div>
                      <div>Chat ngay</div>
                    </button>
                    <button
                      style={{
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "3px",
                        padding: "0px 15px",
                        margin: "0px 10px 17px 0px",
                        fontSize: "14px",
                        border: "1px solid #555555",
                        color: "#555555",
                        background: "#FFFFFF",
                        outline: "none",
                      }}
                    >
                      <div>
                        <AiOutlineShop />
                      </div>
                      <div>Xem shop</div>
                    </button>
                  </div>
                </div>
              </Col>
              <Col
                span={16}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ margin: "0px 12px 0px 0px" }}>
                  <div style={{ display: "flex", gap: "40px" }}>
                    <div style={{ color: "#00000066" }}>Đánh giá</div>
                    <div
                      style={{ color: "#d0011b", margin: "0px 0px 0px 20px" }}
                    >
                      573
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "40px" }}>
                    <div style={{ color: "#00000066" }}>Sản phẩm</div>
                    <div
                      style={{ color: "#d0011b", margin: "0px 0px 0px 20px" }}
                    >
                      42
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    margin: "0px 0px 0px 10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "52px",
                      margin: "0px 0px 0px 60px",
                    }}
                  >
                    <div style={{ color: "#00000066" }}>Tham gia </div>
                    <div
                      style={{ color: "#d0011b", margin: "0px 0px 0px 20px" }}
                    >
                      12 tháng
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "40px",
                      margin: "0px 0px 0px 60px",
                    }}
                  >
                    <div style={{ color: "#00000066" }}>Người theo dõi</div>
                    <div
                      style={{ color: "#d0011b", margin: "0px 0px 0px 20px" }}
                    >
                      3432
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </DetailBox>
          <DetailBox>
            <div style={{ padding: "14px" }}>CHI TIẾT SẢN PHẨM</div>
            <div style={{ fontSize: "14px", padding: "14px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  rowGap: "20px",
                  color: "#000",
                }}
              >
                <div style={{ color: "#00000066" }}>Danh mục</div>
                <div
                  style={{
                    color: "#1677ff",
                    cursor: "pointer",
                    margin: "0px 0px 0px 60px",
                  }}
                >
                  Shopee &gt; Phụ Kiện & Trang Sức Nữ &gt; Phụ kiện tóc &gt; Đồ
                  buộc tóc & Nơ
                </div>

                <div style={{ color: "#00000066" }}>Kho</div>
                <div style={{ margin: "0px 0px 0px 60px" }}>3767548</div>

                <div style={{ color: "#00000066" }}>Giới tính</div>
                <div style={{ margin: "0px 0px 0px 60px" }}>Nữ</div>

                <div style={{ color: "#00000066" }}>Gửi từ</div>
                <div style={{ margin: "0px 0px 0px 60px" }}>Nước ngoài</div>
              </div>
            </div>
          </DetailBox>

          <DetailBox>
            <div style={{ padding: "14px" }}>MÔ TẢ CHI TIẾT</div>
            <div style={{ fontSize: "14px" }}> mô tả </div>
          </DetailBox>

          <DetailBox>
            <div style={{ padding: "14px" }}>ĐÁNH GIÁ SẢN PHẨM</div>
            <DetailBox
              style={{
                background: "#fffbf8",
                padding: "14px",
                color: "rgb(248, 74, 47)",
                border: "1px solid #f9ede5",
                margin: "2px 0px 2px 0px",
              }}
            >
              <div style={{ display: "flex" }}>
                <div style={{ fontSize: "28px" }}>4.8</div>
                <div style={{ margin: "13px 0px 0px 5px" }}>trên 5 sao</div>
              </div>
              <div style={{ display: "flex" }}>
                <div>
                  <IoIosStar />
                </div>
                <div>
                  <IoIosStar />
                </div>
                <div>
                  <IoIosStar />
                </div>
                <div>
                  <IoIosStar />
                </div>
                <div>
                  <IoIosStar />
                </div>
              </div>
            </DetailBox>
            <div style={{ margin: "20px 0px 0px 20px", display: "flex" }}>
              <div>
                <Space direction="vertical" size={12}>
                  <Space wrap size={12}>
                    <Avatar size={30} icon={<FaUserAlt />} />
                  </Space>
                </Space>
              </div>
              <div>
                <div style={{ fontSize: "12px", margin: "-3px 0px 0px 10px" }}>
                  <div>tên khách</div>
                  <div style={{ display: "flex", color: "rgb(248, 74, 47)" }}>
                    <div>
                      <IoIosStar />
                    </div>
                    <div>
                      <IoIosStar />
                    </div>
                    <div>
                      <IoIosStar />
                    </div>
                    <div>
                      <IoIosStar />
                    </div>
                    <div>
                      <IoIosStar />
                    </div>
                  </div>
                  <div style={{ color: "#00000066" }}>
                    2025-04-10 | Phân loại hàng: L
                  </div>
                </div>
                <div style={{ margin: "10px 0px 0px 10px" }}>bình luận</div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "30px",margin:"50px 0 0 0" }}
              >
                <button style={paginationArrowStyle}>‹</button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    style={
                      page === 1 ? paginationActiveStyle : paginationButtonStyle
                    }
                  >
                    {page}
                  </button>
                ))}
                <span style={{ color: "#999" }}>...</span>
                <button style={paginationArrowStyle}>›</button>
              </div>
            </div>
          </DetailBox>

          
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
