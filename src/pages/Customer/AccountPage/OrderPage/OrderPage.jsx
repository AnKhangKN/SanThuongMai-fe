import { useEffect, useState } from "react";
import AccountPage from "../AccountPage";
import { DetailBox } from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { Col, message, Modal, Row } from "antd";
import ButtonComponent from "../../../../components/CustomerComponents/ButtonComponent/ButtonComponent";
import * as AuthServices from "../../../../services/shared/AuthServices";
import * as OrderServices from "../../../../services/customer/OrderServices";
import { isJsonString } from "../../../../utils";
import { jwtDecode } from "jwt-decode";
import TextArea from "antd/es/input/TextArea";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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

  const handleSuccessfulDelivered = async (orderId) => {
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

      await OrderServices.successfulDelivered(accessToken, {
        status,
        order,
      });

      message.success("Xác nhận thành công!");
      fetchAllOrderByStatus();
    } catch (error) {
      console.error("Lỗi khi xác nhận đơn hàng:", error.message || error);
    }
  };

  const showModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleCancelOrder = async () => {
    try {
      if (!selectedOrderId) {
        message.error("Không xác định được đơn hàng cần hủy.");
        return;
      }

      let { storageData, decoded } = handleDecoded();
      let accessToken = storageData;

      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        accessToken = res?.access_token;
        localStorage.setItem("access_token", JSON.stringify(accessToken));
      }

      const status = "cancelled";
      const order = allData.find(
        (item) => item._id === selectedOrderId || item.id === selectedOrderId
      );

      if (!order) {
        message.error("Không tìm thấy đơn hàng.");
        return;
      }

      await OrderServices.cancelledOrder(accessToken, {
        status,
        order,
        cancelReason,
      });

      message.success("Đã hủy đơn hàng!");
      setIsModalOpen(false);
      setSelectedOrderId(null);
      setCancelReason("");
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
              color: status === statusItem.value ? "#194a7a" : "#000",
              borderBottom:
                status === statusItem.value ? "2px solid #194a7a" : "none",
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
                        <div style={{ padding: "10px" }}>
                          <img
                            src={
                              `${imageURL}${item.product_image}` || item.image
                            }
                            alt="ảnh sản phẩm"
                            style={{
                              width: "100%",
                              height: "100px",
                              objectFit: "contain",
                            }}
                          />
                        </div>
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
                      handleSuccessfulDelivered(order._id || order.id)
                    }
                  />
                </div>
              )}

              {(keyword === "pending" || keyword === "processing") && (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "column",
                    }}
                    key={order._id}
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
                      onClick={() => showModal(order._id)}
                    >
                      Hủy đơn hàng
                    </button>

                    <Modal
                      title="Lý do hủy đơn"
                      open={isModalOpen}
                      zIndex={2000}
                      maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                      onOk={handleCancelOrder} // ✅ Đã sửa
                      onCancel={() => setIsModalOpen(false)}
                    >
                      <TextArea
                        placeholder="Hãy thêm lý do bạn hủy đơn hàng"
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        rows={4}
                      />
                    </Modal>
                  </div>
                </>
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
