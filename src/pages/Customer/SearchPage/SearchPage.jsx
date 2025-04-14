import { Col, Row, Select } from "antd";
import React from "react";
import dongHoDemo from "../../../assets/images/products/dong-ho-demo.webp";
import dongHoDemo2 from "../../../assets/images/products/dong-ho-demo-2.webp";

const SearchPage = () => {
  return (
    <>
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <div style={{ width: "1200px", margin: "0 auto" }}>
          <Row gutter={16}>
            <Col span={4}>
              <div style={{ background: "#f0f0f0" }}>col - 4</div>
            </Col>
            <Col span={20}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>Shop liên quan đến: </div>
                <div>Tên danh mục hoặc sản phẩm</div>
              </div>
              <Row style={{ backgroundColor: "#fff" }}>
                <Col flex="6">
                  <div style={{ margin: "0px 5px", border: "1px solid #ccc" }}>
                    Tên sản phẩm
                  </div>
                </Col>
                <Col flex="4">
                  <div style={{ margin: "0px 5px", border: "1px solid #ccc" }}>
                    <div style={{ width: "100%" }}>
                      <img
                        style={{ width: "100%", objectFit: "contain" }}
                        src={dongHoDemo}
                        alt=""
                      />
                    </div>
                    <div>Đồng hồ</div>
                  </div>
                </Col>
                <Col flex="4">
                  <div style={{ margin: "0px 5px", border: "1px solid #ccc" }}>
                    <div style={{ width: "100%" }}>
                      <img
                        style={{ width: "100%", objectFit: "contain" }}
                        src={dongHoDemo}
                        alt=""
                      />
                    </div>
                    <div>Đồng hồ</div>
                  </div>
                </Col>
                <Col flex="4">
                  <div style={{ margin: "0px 5px", border: "1px solid #ccc" }}>
                    <div style={{ width: "100%" }}>
                      <img
                        style={{ width: "100%", objectFit: "contain" }}
                        src={dongHoDemo}
                        alt=""
                      />
                    </div>
                    <div>Đồng hồ</div>
                  </div>
                </Col>
                <Col flex="4">
                  <div style={{ margin: "0px 5px", border: "1px solid #ccc" }}>
                    <div style={{ width: "100%" }}>
                      <img
                        style={{ width: "100%", objectFit: "contain" }}
                        src={dongHoDemo}
                        alt=""
                      />
                    </div>
                    <div>Đồng hồ</div>
                  </div>
                </Col>
              </Row>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div>Kết quả tìm kiếm cho từ khoá </div>
                <div>Tên sản phẩm hoặc danh mục</div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "13px 20px",
                  backgroundColor: "#ededed",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div style={{ marginRight: "15px" }}>Sắp xếp theo</div>
                  <button
                    style={{
                      lineHeight: "34px",
                      border: "none",
                      padding: "0px 15px",
                      backgroundColor: "#fff",
                      borderRadius: "2px",
                      cursor: "pointer",
                    }}
                  >
                    Liên quan
                  </button>
                  <button
                    style={{
                      lineHeight: "34px",
                      border: "none",
                      padding: "0px 15px",
                      margin: "0px 10px",
                      backgroundColor: "#ee4d2d",
                      color: "#fff",
                      borderRadius: "2px",
                      cursor: "pointer",
                    }}
                  >
                    Mới nhất
                  </button>
                  <button
                    style={{
                      lineHeight: "34px",
                      border: "none",
                      padding: "0px 15px",
                      backgroundColor: "#fff",
                      borderRadius: "2px",
                      cursor: "pointer",
                    }}
                  >
                    Bán chạy
                  </button>
                  <Select style={{ width: "150px" }}>
                    <option value="">Chọn loại sản phẩm</option>
                    <option value="a">Sản phẩm A</option>
                  </Select>
                </div>
                <div>sắp xếp</div>
              </div>

              <Row gutter={[10, 10]}>
                {[...Array(8)].map((_, index) => (
                  <Col key={index} span={4}>
                    <div
                      style={{
                        border: "1px solid #ccc",
                        textAlign: "center",
                        background: "#fff",
                        width: "100%",
                      }}
                    >
                      <div style={{ width: "100%" }}>
                        <img
                          style={{ width: "100%", objectFit: "contain" }}
                          src={dongHoDemo2}
                          alt=""
                          srcset=""
                        />
                      </div>
                      <div>Sản phẩm {index + 1}</div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
