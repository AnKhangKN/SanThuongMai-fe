import { Col, Row, Tooltip, Pagination } from "antd";
import React, { useState } from "react";
import logo from "../../../assets/images/Logo_Den.jpg";
import { FaMinus, FaPlus } from "react-icons/fa";
import ButtonComponent from "../../../components/CustomerComponents/ButtonComponent/ButtonComponent";
import { BsTicketPerforated } from "react-icons/bs";
import SuggestComponent from "../../../components/CustomerComponents/CartPageComponent/SuggestComponent/SuggestComponent";

const products = [
  {
    id: 1,
    name: "Xe Đẩy Cho Bé Chính Hãng Baobaohao V16, Xe Đẩy Gấp Gọn Đảo Chiều 360 Độ Bảo Hành 12 Tháng",
    price: 80000,
  },
  {
    id: 2,
    name: "Ghế Ăn Dặm Cho Bé Cao Cấp, Đa Năng, Gấp Gọn Tiện Lợi",
    price: 150000,
  },
  {
    id: 3,
    name: "Địu Em Bé Siêu Nhẹ, Thoáng Khí, Hàng Chính Hãng",
    price: 120000,
  },
  {
    id: 4,
    name: "Xe Tập Đi Cho Bé Có Nhạc Và Đèn, An Toàn, Bền Đẹp",
    price: 100000,
  },
  {
    id: 5,
    name: "Thảm Chơi Cho Bé Nhiều Màu Sắc, Chống Thấm, Dễ Gấp Gọn",
    price: 90000,
  },
  {
    id: 6,
    name: "Balo Trẻ Em Chống Gù, Dễ Thương, Nhiều Mẫu Mã",
    price: 180000,
  },
  {
    id: 7,
    name: "Nôi Điện Cho Bé Có Nhạc Ru, Điều Khiển Từ Xa",
    price: 250000,
  },
  {
    id: 8,
    name: "Đồ Chơi Phát Triển Trí Tuệ Cho Trẻ 1-3 Tuổi",
    price: 70000,
  },
  {
    id: 9,
    name: "Máy Hâm Sữa 2 Bình Đa Năng, Tiện Lợi",
    price: 140000,
  },
  {
    id: 10,
    name: "Xe Lắc Cho Bé Có Nhạc Và Đèn, Thiết Kế An Toàn",
    price: 110000,
  },
];

const CartPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <div style={{ marginTop: "120px", backgroundColor: "#f5f5f5" }}>
      <div style={{ width: "1200px", margin: "auto" }}>
        <div style={{ height: "20px" }}></div>
        <div
          style={{
            padding: "10px 30px",
            marginBottom: "10px",
            backgroundColor: "#fff",
          }}
        >
          <Row>
            <Col span={2}>
              <input type="checkbox" />
            </Col>
            <Col span={10}>Sản phẩm</Col>
            <Col span={4}>Đơn giá</Col>
            <Col span={3}>Số lượng</Col>
            <Col span={3}>Số tiền</Col>
            <Col span={2}>Thao tác</Col>
          </Row>
        </div>

        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            style={{
              padding: "10px 30px",
              margin: "2px 0px",
              backgroundColor: "#fff",
            }}
          >
            <Row align="middle">
              <Col span={2}>
                <input type="checkbox" />
              </Col>
              <Col span={10}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div style={{ width: "80px" }}>
                    <img style={{ width: "100%" }} src={logo} alt="product" />
                  </div>
                  <div>
                    <Tooltip title={product.name}>
                      <div
                        style={{
                          maxWidth: "400px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.name}
                      </div>
                    </Tooltip>
                    <div style={{ fontSize: "12px", color: "gray" }}>
                      Phân loại hàng
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={4}>
                <div>₫{product.price.toLocaleString()}</div>
              </Col>
              <Col span={3}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <button
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "0.5px solid #ffffff",
                      height: "30px",
                      width: "30px",
                    }}
                  >
                    <FaMinus />
                  </button>
                  <input
                    style={{
                      width: "30px",
                      textAlign: "center",
                      margin: "0 0px",
                      border: "none",
                      height: "30px",
                    }}
                    type="text"
                    value={1}
                    readOnly
                  />
                  <button
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "0.5px solid #fff",
                      height: "30px",
                      width: "30px",
                    }}
                  >
                    <FaPlus />
                  </button>
                </div>
              </Col>
              <Col span={3}>
                <div>₫{product.price.toLocaleString()}</div>
              </Col>
              <Col span={2}>
                <div style={{ color: "red", cursor: "pointer" }}>Xóa</div>
              </Col>
            </Row>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "-2px",
            paddingBottom: "20px",
            paddingRight: "35px",
            backgroundColor: "#fff",
          }}
        >
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={products.length}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
            backgroundColor: "#fff",
            padding: "20px 20px",
            gap: "180px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "18px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <BsTicketPerforated />
            </div>
            <div>Shopee Voucher</div>
          </div>
          <div style={{ fontSize: "14px" }}>Chọn hoặc nhập mã</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2px",
            padding: "20px 20px",
            backgroundColor: "#fff",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <div>
              <input type="checkbox" />
            </div>
            <div>Chọn Tất Cả</div>
            <div>Xóa Tất Cả</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ fontSize: "16px" }}>Tổng cộng (0 Sản phẩm):</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>đ</div>
              <div style={{ fontSize: "22px" }}>0</div>
            </div>
            <div>
              <ButtonComponent name="Mua Hàng" width="200px" />
            </div>
          </div>
        </div>

        <div
          style={{
            margin: "50px 0px 20px 0px",
            display: "flex",
            justifyContent: "start",
            fontSize: "18px",
            textTransform: "uppercase",
            color: "#7a7a7a",
          }}
        >
          Có thể bạn cũng thích
        </div>

        <div>
          <SuggestComponent />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
