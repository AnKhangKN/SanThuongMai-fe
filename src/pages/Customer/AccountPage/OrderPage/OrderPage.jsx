import { useEffect, useState } from "react";
import AccountPage from "../AccountPage";
import { DetailBox } from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { Col, message, Modal, Row } from "antd";
import * as OrderServices from "../../../../services/customer/OrderServices";
import TextArea from "antd/es/input/TextArea";
import * as ValidateToken from "../../../../utils/tokenUtils";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const statuses = [
  { label: "Hoàn thành", value: "delivered" },
  { label: "Chờ xử lý", value: "pending" },
  { label: "Đóng gói", value: "processing" },
  { label: "Vận chuyển", value: "shippingOrShipped" },
  { label: "Hủy/Hoàn trả", value: "returnedOrCancelled" },
];

const ORDERS_PER_PAGE = 5;

const OrderPage = () => {
  const [allData, setAllData] = useState([]);
  const [status, setStatus] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [expandedShops, setExpandedShops] = useState({});
  const [currentOrderPage, setCurrentOrderPage] = useState(1);

  const { "status-order": keyword } = useParams();
  const navigate = useNavigate();

  const fetchAllOrderByStatus = async () => {
    try {
      const accessToken = await ValidateToken.getValidAccessToken();
      const res = await OrderServices.getAllOrderByStatus(accessToken, keyword);
      if (res?.status === "ERROR") throw new Error(res.message);
      setAllData(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error.message || error);
    }
  };

  useEffect(() => {
    fetchAllOrderByStatus();
    setStatus(keyword);
    setCurrentOrderPage(1);
  }, [keyword]);

  const handleOrderStatus = (statusValue) => {
    navigate(`/user/purchase/${statusValue}`);
  };

  const handleSuccessfulDelivered = async (orderId) => {
    try {
      const accessToken = await ValidateToken.getValidAccessToken();
      const order = allData.find(
        (item) => item._id === orderId || item.id === orderId
      );
      await OrderServices.successfulDelivered(accessToken, {
        status: "delivered",
        order,
      });
      message.success("Xác nhận thành công!");
      fetchAllOrderByStatus();
    } catch (error) {
      console.error("Lỗi khi xác nhận đơn hàng:", error.message || error);
    }
  };

  const showModal = (orderId, shopId) => {
    setSelectedOrderId(orderId);
    setSelectedShopId(shopId);
    setIsModalOpen(true);
  };

  const handleCancelOrder = async () => {
    try {
      if (!selectedOrderId || !selectedShopId) {
        message.error("Thiếu thông tin đơn hàng hoặc shop.");
        return;
      }

      const accessToken = await ValidateToken.getValidAccessToken();
      const order = allData.find(
        (item) => item._id === selectedOrderId || item.id === selectedOrderId
      );
      if (!order) {
        message.error("Không tìm thấy đơn hàng.");
        return;
      }

      const shopItems = order.productItems.filter(
        (item) => item.shopId === selectedShopId
      );
      const orderPayload = {
        status: "cancelled",
        order: {
          ...order,
          productItems: shopItems,
        },
        cancelReason,
      };

      await OrderServices.cancelledOrder(accessToken, orderPayload);

      message.success("Đã hủy đơn hàng cho shop!");
      setIsModalOpen(false);
      setSelectedOrderId(null);
      setSelectedShopId(null);
      setCancelReason("");
      fetchAllOrderByStatus();
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error.message || error);
    }
  };

  const groupByShopId = (items) => {
    return items.reduce((acc, item) => {
      const shopId = item.shopId;
      if (!acc[shopId]) acc[shopId] = { shopName: item.shopName, items: [] };
      acc[shopId].items.push(item);
      return acc;
    }, {});
  };

  const isAllPendingOrProcessing = (items) => {
    return items.every(
      (item) => item.status === "pending" || item.status === "processing"
    );
  };

  const toggleExpandShop = (orderId, shopId) => {
    const key = `${orderId}_${shopId}`;
    setExpandedShops((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const totalOrderPages = Math.ceil(allData.length / ORDERS_PER_PAGE);
  const paginatedOrders = allData.slice(
    (currentOrderPage - 1) * ORDERS_PER_PAGE,
    currentOrderPage * ORDERS_PER_PAGE
  );

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

      {paginatedOrders.length > 0 ? (
        paginatedOrders.map((order) => {
          const groupedByShop = groupByShopId(order.productItems);
          return (
            <DetailBox key={order._id}>
              <div style={{ fontWeight: "bold", marginBottom: "20px" }}>
                🧾 Mã đơn: {order._id}
              </div>
              {Object.entries(groupedByShop).map(([shopId, group]) => {
                const key = `${order._id}_${shopId}`;
                const isExpanded = expandedShops[key];
                const itemsToShow = isExpanded
                  ? group.items
                  : group.items.slice(0, 2);

                return (
                  <div key={shopId}>
                    <div style={{ fontWeight: "bold", margin: "10px 0" }}>
                      🛍 Shop: {group.shopName || shopId}
                    </div>
                    {itemsToShow.map((item, index) => (
                      <Row key={index} style={{ marginBottom: "10px" }}>
                        <Col span={4}>
                          <div style={{ padding: "10px" }}>
                            <img
                              src={`${imageURL}${item.productImage}`}
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
                          <div>{item.productName}</div>
                          <div style={{ display: "flex", gap: "20px" }}>
                            {item.attributes.map((attr, idx) => (
                              <div key={idx}>
                                {attr.name}: {attr.value}
                              </div>
                            ))}
                          </div>
                          <div>Số lượng: {item.quantity}</div>
                        </Col>
                        <Col span={4} style={{ textAlign: "end" }}>
                          <div>{item.finalPrice?.toLocaleString()}₫</div>
                          <div>
                            {item.status === "cancelled" ? (
                              <p>Đã hủy</p>
                            ) : item.status === "returned" ? (
                              <p>Đã hoàn trả</p>
                            ) : null}
                          </div>
                          {item.status === "shipped" ? (
                            <>
                              <div>
                                <button
                                  onClick={() =>
                                    handleSuccessfulDelivered(order._id)
                                  }
                                >
                                  Nhận sản phẩm
                                </button>
                                <button>Hoàn trả</button>
                              </div>
                            </>
                          ) : item.status === "shipping" ? (
                            <div>đang vận chuyển</div>
                          ) : null}
                        </Col>
                      </Row>
                    ))}

                    {group.items.length > 2 && (
                      <div
                        style={{ textAlign: "center", marginBottom: "10px" }}
                      >
                        <button
                          onClick={() => toggleExpandShop(order._id, shopId)}
                        >
                          {isExpanded ? "Thu gọn" : "Xem thêm"}
                        </button>
                      </div>
                    )}

                    {isAllPendingOrProcessing(group.items) && (
                      <div style={{ textAlign: "end" }}>
                        <button onClick={() => showModal(order._id, shopId)}>
                          Hủy đơn của shop
                        </button>
                      </div>
                    )}
                    <div
                      style={{
                        height: "1px",
                        margin: "20px 0px",
                        backgroundColor: "#ccc",
                      }}
                    ></div>
                  </div>
                );
              })}

              <div>
                <div>
                  Số điện thoại: {order.shippingAddress?.phone || "Không có"}
                </div>
                <div>
                  Địa chỉ:{" "}
                  {order.shippingAddress?.address || "Không có địa chỉ"},{" "}
                  {order.shippingAddress?.city}
                </div>
              </div>
            </DetailBox>
          );
        })
      ) : (
        <div style={{ padding: "20px", textAlign: "center" }}>
          Không có đơn hàng nào ở trạng thái này.
        </div>
      )}

      {totalOrderPages > 1 && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          {Array.from({ length: totalOrderPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentOrderPage(pageNum)}
                style={{
                  margin: "0 5px",
                  padding: "5px 10px",
                  fontWeight: pageNum === currentOrderPage ? "bold" : "normal",
                  backgroundColor:
                    pageNum === currentOrderPage ? "#194a7a" : "#fff",
                  color: pageNum === currentOrderPage ? "#fff" : "#000",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {pageNum}
              </button>
            )
          )}
        </div>
      )}

      <Modal
        title="Lý do hủy đơn"
        open={isModalOpen}
        zIndex={2000}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        onOk={handleCancelOrder}
        onCancel={() => setIsModalOpen(false)}
      >
        <TextArea
          placeholder="Hãy thêm lý do bạn hủy đơn hàng"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          rows={4}
        />
      </Modal>
    </AccountPage>
  );
};

export default OrderPage;
