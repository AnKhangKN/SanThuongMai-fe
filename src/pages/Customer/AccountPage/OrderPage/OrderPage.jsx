import React, { useEffect, useState } from "react";
import AccountPage from "../AccountPage";
import { DetailBox } from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { Col, message, Row } from "antd";
import ButtonComponent from "../../../../components/CustomerComponents/ButtonComponent/ButtonComponent";
import * as AuthServices from "../../../../services/shared/AuthServices";
import * as OrderServices from "../../../../services/customer/OrderServices";
import { isJsonString } from "../../../../utils";
import { jwtDecode } from "jwt-decode";

const statuses = [
  { label: "Hoàn thành", value: "delivered" },
  { label: "Chờ xử lý", value: "pending" },
  { label: "Đóng gói", value: "processing" },
  { label: "Vận chuyển", value: "shipped" },
  { label: "Hủy", value: "cancelled" },
];

const OrderPage = () => {
  const [allData, setAllData] = useState([]);
  const [status, setStatus] = useState();

  const { "status-order": keyword } = useParams();
  const navigate = useNavigate();

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  const fetchAllOrderByStatus = async () => {
    try {
      let { storageData, decoded } = handleDecoded();
      let accessToken = storageData;

      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        accessToken = res?.access_token;
        localStorage.setItem("access_token", JSON.stringify(accessToken));
      }

      const res = await OrderServices.getAllOrderByStatus(accessToken, keyword);

      if (res?.status === "ERROR") {
        throw new Error(res.message);
      }

      const formattedOrders = Array.isArray(res.data)
        ? res.data.map((order) => ({
            ...order,
            key: order._id || order.id,
          }))
        : [];

      setAllData(formattedOrders);
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error.message || error);
    }
  };

  useEffect(() => {
    fetchAllOrderByStatus();
    setStatus(keyword);
  }, [keyword]);

  const handleOrderStatus = (statusValue) => {
    navigate(`/user/purchase/${statusValue}`);
  };

  const handleSucessfulDelivered = async (orderId) => {
    try {
      let { storageData, decoded } = handleDecoded();
      let accessToken = storageData;

      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        accessToken = res?.access_token;
        localStorage.setItem("access_token", JSON.stringify(accessToken));
      }

      const status = "delivered";
      const order = allData.find(
        (item) => item._id === orderId || item.id === orderId
      );

      const res = await OrderServices.successfulDelivered(accessToken, {
        status,
        order,
      });

      message.success("Xác nhận thành công!");
      fetchAllOrderByStatus();
    } catch (error) {
      console.error("Lỗi khi xác nhận đơn hàng:", error.message || error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      let { storageData, decoded } = handleDecoded();
      let accessToken = storageData;

      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        accessToken = res?.access_token;
        localStorage.setItem("access_token", JSON.stringify(accessToken));
      }

      const status = "cancelled";
      const order = allData.find(
        (item) => item._id === orderId || item.id === orderId
      );

      const res = await OrderServices.cancelledOrder(accessToken, {
        status,
        order,
      });

      message.success("Đã hủy đơn hàng!");
      fetchAllOrderByStatus();
    } catch (error) {
      console.error("Lỗi khi xác nhận đơn hàng:", error.message || error);
    }
  };

  return (
    <AccountPage>
      <div style={{ display: "flex", backgroundColor: "#fff" }}>
        {statuses.map((statusItem) => (
          <div
            key={statusItem.value}
            onClick={() => handleOrderStatus(statusItem.value)}
            style={{
              flex: "0 0 20%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              lineHeight: "50px",
              fontWeight: status === statusItem.value ? "bold" : "normal",
              color: status === statusItem.value ? "#ee4d2d" : "#000",
              borderBottom:
                status === statusItem.value ? "2px solid #ee4d2d" : "none",
              cursor: "pointer",
            }}
          >
            {statusItem.label}
          </div>
        ))}
      </div>

      <DetailBox>
        <Row>
          <Col span={4}></Col>
          <Col span={16}>Sản phẩm</Col>
          <Col span={4} style={{ textAlign: "end" }}>
            Đơn giá
          </Col>
        </Row>
      </DetailBox>

      {Array.isArray(allData) && allData.length > 0 ? (
        allData.map((order) => (
          <div key={order.key}>
            <DetailBox>
              {(keyword === "shipped"
                ? order.items || [] // giả định API có trường "products" cho shipped
                : order.items || []
              ) // còn lại dùng "items"
                .map((item, index) => (
                  <>
                    <Row key={index} style={{ marginBottom: "10px" }}>
                      <Col span={4}>
                        <img
                          src={item.product_image || item.image}
                          alt="ảnh sản phẩm"
                          width="100%"
                        />
                      </Col>
                      <Col span={16}>
                        <div>{item.product_name || item.name}</div>
                        <div style={{ display: "flex", gap: "20px" }}>
                          <div>{item.size || "Không có size"}</div>
                          <div>{item.color || "Không có màu"}</div>
                        </div>
                        <div>Số lượng: {item.quantity}</div>
                      </Col>
                      <Col span={4} style={{ textAlign: "end" }}>
                        {item.price?.toLocaleString()}₫
                      </Col>
                    </Row>
                    <div
                      style={{
                        height: "1px",
                        margin: "20px 0px",
                        backgroundColor: "#ccc",
                      }}
                    ></div>
                  </>
                ))}

              <div>
                <div>
                  Số điện thoại:{" "}
                  {order.shipping_address.phone || "Không có số giao hàng"}
                </div>
                <div>
                  Địa chỉ:{" "}
                  {order.shipping_address.address ||
                    "Không có địa chỉ giao hàng"}
                  ,{order.shipping_address.city}
                </div>
              </div>

              {keyword === "shipped" && (
                <div
                  style={{
                    display: "flex",
                    flexFlow: "column",
                  }}
                >
                  <div style={{ textAlign: "end" }}>
                    Tổng đơn hàng: {order.total_price?.toLocaleString()}
                  </div>
                  <ButtonComponent
                    name="Xác nhận đơn hàng"
                    onClick={() =>
                      handleSucessfulDelivered(order._id || order.id)
                    }
                  />
                </div>
              )}

              {(keyword === "pending" || keyword === "processing") && (
                <div
                  style={{
                    display: "flex",
                    flexFlow: "column",
                  }}
                >
                  <div style={{ textAlign: "end" }}>
                    Tổng đơn hàng: {order.total_price?.toLocaleString()}
                  </div>
                  <button
                    style={{
                      backgroundColor: "#fff",
                      color: "#333",
                      padding: "9px 20px",
                      border: "1px solid #333",
                      borderRadius: "2px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleCancelOrder(order._id || order.id);
                    }}
                  >
                    Hủy đơn hàng
                  </button>
                </div>
              )}
            </DetailBox>
          </div>
        ))
      ) : (
        <div style={{ padding: "20px", textAlign: "center" }}>
          Không có đơn hàng nào ở trạng thái này.
        </div>
      )}
    </AccountPage>
  );
};

export default OrderPage;
