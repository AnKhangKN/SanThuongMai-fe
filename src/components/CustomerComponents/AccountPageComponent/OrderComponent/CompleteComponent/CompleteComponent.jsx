import React from "react";
import OrderPage from "../../../../../pages/Customer/AccountPage/OrderPage/OrderPage";
import { DetailBox } from "../../../../../pages/Customer/ProductDetailPage/style";
import { AiOutlineShop } from "react-icons/ai";
import { IoIosChatboxes } from "react-icons/io";

const CompleteComponent = () => {
  return (
    <OrderPage>
      <div>
        <DetailBox>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px 0px 16px",
              }}
            >
              {/* Bên trái */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    margin: "5px 0px 0px 0px",
                  }}
                >
                  <AiOutlineShop />
                  <span style={{ fontWeight: "bold" }}>Tên shop</span>
                </div>

                <button
                  style={{
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    padding: "0 10px",
                    fontSize: "11px",
                    fontWeight: "300",
                    border: "none",
                    color: "#fff",
                    background: "#ee4d2d",
                    borderRadius: "2px",
                    cursor: "pointer",
                  }}
                >
                  <IoIosChatboxes />
                  <span>Chat</span>
                </button>

                <button
                  style={{
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    padding: "0 10px",
                    fontSize: "11px",
                    fontWeight: "300",
                    border: "1px solid rgb(219, 219, 219)",
                    color: "#555",
                    background: "#fff",
                    borderRadius: "2px",
                    cursor: "pointer",
                  }}
                >
                  <AiOutlineShop />
                  <span>Xem shop</span>
                </button>
              </div>

              {/* Bên phải */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div style={{ color: "#00bfa5", fontSize: "14px" }}>
                  Giao hàng thành công
                </div>
                <div style={{ color: "#ccc" }}>|</div>
                <div style={{ color: "#ee4d2d", fontSize: "14px" }}>
                  CHỜ GIAO HÀNG
                </div>
              </div>
            </div>
          </div>
          <DetailBox>
            <div
              style={{
                display: "flex",
                alignItems: "center",

                borderBottom: "1px solid #eee",
                borderTop: "1px solid #eee",
                margin: "5px",
              }}
            >
              {/* Ảnh sản phẩm */}
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  marginRight: "16px",
                  padding: "16px",
                }}
              >
                <img
                  src=""
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Thông tin sản phẩm */}
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}
                >
                  Viên Treo Vệ Sinh Bồn Cầu Vim Power 5 | Sạch Thơm Đến 300 Lần
                  Xả (50-55g/viên)
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#757575",
                    marginTop: "4px",
                  }}
                >
                  Phân loại hàng: Hương Oải hương
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#757575",
                    marginTop: "2px",
                  }}
                >
                  x1
                </div>
              </div>

              {/* Giá */}
              <div
                style={{
                  fontSize: "14px",
                  color: "#333",
                  padding: "0px 16px 0px 0px",
                }}
              >
                28.000
              </div>
            </div>
          </DetailBox>
        
          <DetailBox>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              {/* Bên trái: Thông tin đánh giá */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px", margin:"45px 0 0 0" }}
              >
                <div style={{ fontSize: "12px", color: "#555" }}>
                  Đánh giá sản phẩm trước{" "}
                  <span style={{ color: "#0055aa", cursor: "pointer" }}>
                    22-05-2025
                  </span>
                </div>
                <div style={{ fontSize: "12px", color: "#ee4d2d" }}>
                  Đánh giá ngay và nhận 200 Xu
                </div>
              </div>

              {/* Bên phải: Thành tiền + nút */}
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    marginBottom: "8px",
                    textAlign: "right",
                  }}
                >
                  Thành tiền:{" "}
                  <span
                    style={{
                      fontSize: "24px",
                      color: "#ee4d2d",
                      
                      marginLeft: "4px",
                    }}
                  >
                    ₫31.788
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#ee4d2d",
                      color: "#fff",
                      height: "40px",
                      padding: "0 24px",
                      fontSize: "14px",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Đánh Giá
                  </button>

                  <button
                    style={{
                      backgroundColor: "#fff",
                      color: "#555",
                      height: "40px",
                      padding: "0 16px",
                      fontSize: "14px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Yêu Cầu Trả Hàng/Hoàn Tiền
                  </button>

                  <button
                    style={{
                      backgroundColor: "#fff",
                      color: "#555",
                      height: "40px",
                      padding: "0 16px",
                      fontSize: "14px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Thêm
                  </button>
                </div>
              </div>
            </div>
          </DetailBox>
        </DetailBox>
      </div>
    </OrderPage>
  );
};

export default CompleteComponent;
