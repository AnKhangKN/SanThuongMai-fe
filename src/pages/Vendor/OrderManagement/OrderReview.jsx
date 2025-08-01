import React, { useState, useCallback, useEffect } from "react";
import { Table, Tag, Space, Button, message, Row, Tabs,  Select, Image } from "antd";
import OrderFilter from "../../../components/VendorComponents/OrderFilter/OrderFilter";
import * as OrderProductService from "../../../services/vendor/OrderProductService";
import * as AuthServices from "../../../services/shared/AuthServices";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import OrderDetailModal from "./OrderDetailModal";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const statusLabels = {
  all: "Tất cả",
  pending: "Chờ xác nhận",
  processing: "Đang xử lý",
  shipped: "Đang giao",
  delivered: "Đã giao",
  returned: "Đã trả hàng",
  cancelled: "Đã hủy",
};

const statusColors = {
  pending: "orange",
  processing: "blue",
  shipped: "cyan",
  delivered: "green",
  returned: "red",
  cancelled: "default",
};

const OrderReview = () => {
     const { TabPane } = Tabs;
      const [activeTab, setActiveTab] = useState("all");
      const [orders, setOrders] = useState([]);

      const [selectedOrder, setSelectedOrder] = useState(null);
      const [isModalVisible, setIsModalVisible] = useState(false);

      const showOrderDetails = (record) => {
      const order = orders.find((o) => o._id === record.orderId);
      setSelectedOrder(order);
      setIsModalVisible(true);
    };

    const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        const refreshed = await AuthServices.refreshToken();
        localStorage.setItem("access_token", refreshed.access_token);
      }

      const res = await OrderProductService.getAllOrders(localStorage.getItem("access_token"));
      if (res.data.status === "OK") {
        setOrders(res.data.data);
      } else {
        message.error("Không thể tải đơn hàng");
      }
    } catch (err) {
      console.error("Lỗi fetch order:", err);
      message.error("Lỗi khi tải đơn hàng");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getFlattenedOrders = () => {
    let result = [];
    orders.forEach((order) => {
      order.productItems.forEach((item, index) => {
        result.push({
          key: `${order._id}-${index}`,
          productName: item.productName,
          image: item.productImage,
          attributes: item.attributes,
          quantity: item.quantity,
          price: item.finalPrice,
          status: item.status,
          orderId: order._id,
        });
      });
    });
    return result;
  };

  const filteredOrders = activeTab === "all"
    ? getFlattenedOrders()
    : getFlattenedOrders().filter((item) => item.status === activeTab);

  const columns = [
    {
  title: "Sản phẩm",
  dataIndex: "productName",
  key: "productName",
  render: (text, record) => (
    <Space>
      <Image src={`${imageURL}${record.image}`} width={60} />
      <div>
        <div style={{ maxWidth: 200 }}>
          <strong title={record.productName}>
            {record.productName.length > 40
              ? record.productName.slice(0, 40) + "..."
              : record.productName}
          </strong>
        </div>
        <div style={{ fontSize: 12, color: "#888" }}>
          {record.attributes.map((attr) => `${attr.name}: ${attr.value}`).join(", ")}
        </div>
      </div>
    </Space>
  ),
},
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()}₫`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status]}>{statusLabels[status]}</Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => showOrderDetails(record)}>Chi tiết</Button>
          {record.status === "pending" && <Button type="primary">Xác nhận</Button>}
          {record.status === "shipped" && <Button>Đã giao</Button>}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row>
        <h2 style={{ marginBottom: 20 }}>Duyệt đơn hàng</h2>
      </Row>

      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        items={Object.keys(statusLabels).map((status) => ({
          label: statusLabels[status],
          key: status,
        }))}
        style={{ marginBottom: 24 }}
      />

      <Table columns={columns} dataSource={filteredOrders} pagination={{ pageSize: 5 }} />

      <OrderDetailModal
      open={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      order={selectedOrder}
    />
    </div>
  );
};

export default OrderReview;
