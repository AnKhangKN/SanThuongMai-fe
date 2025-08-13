import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  message,
  Row,
  Tabs,
  Select,
  Image,
  Popconfirm,
} from "antd";
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
  shipping: "Đang giao",
  delivered: "Đã giao",
  returned: "Đã trả hàng",
  cancelled: "Đã hủy",
};

const statusColors = {
  pending: "orange",
  processing: "blue",
  shipping: "cyan",
  delivered: "green",
  returned: "red",
  cancelled: "default",
};

const OrderReview = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showOrderDetails = (record) => {
    const order = orders.find((o) => o._id === record.orderId);
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleConfirmOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await OrderProductService.updateOrderStatus(
        orderId,
        "shipping",
        token
      );
      console.log("res", res.data.data);

      if (res.data.status === "OK") {
        message.success("Xác nhận đơn hàng thành công!");
        fetchOrders();
      } else {
        message.error("Xác nhận đơn hàng thất bại!");
      }
    } catch (err) {
      console.error(err);
      message.error("Đã xảy ra lỗi khi xác nhận đơn hàng!");
    }
  };

  const handleMarkAsDelivered = async (orderId) => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await OrderProductService.updateOrderStatus(
        orderId,
        "delivered",
        token
      );

      if (res.data.status === "OK") {
        message.success("Cập nhật trạng thái đơn hàng thành 'Đã giao'");
        fetchOrders(); // Cập nhật lại dữ liệu
      } else {
        message.error("Cập nhật thất bại");
      }
    } catch (err) {
      console.error(err);
      message.error("Đã xảy ra lỗi khi cập nhật trạng thái");
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await OrderProductService.updateOrderStatus(
        orderId,
        "cancelled",
        token
      );
      if (res.data.status === "OK") {
        message.success("Hủy đơn hàng thành công!");
        fetchOrders();
      } else {
        message.error("Hủy đơn hàng thất bại!");
      }
    } catch (err) {
      console.error(err);
      message.error("Đã xảy ra lỗi khi hủy đơn hàng!");
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        const refreshed = await AuthServices.refreshToken();
        localStorage.setItem("access_token", refreshed.access_token);
      }

      const res = await OrderProductService.getAllOrders(
        localStorage.getItem("access_token")
      );
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

  const flattenedOrders = useMemo(() => {
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
  }, [orders]);

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
              {record.attributes
                .map((attr) => `${attr.name}: ${attr.value}`)
                .join(", ")}
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
        // <Space>
        //   <Button type="link" onClick={() => showOrderDetails(record)}>
        //     Chi tiết
        //   </Button>
        //   {["pending", "processing"].includes(record.status) && (
        //     <>
        //       <Button
        //         type="primary"
        //         onClick={() => handleConfirmOrder(record.orderId)}
        //       >
        //         Xác nhận
        //       </Button>

        //       <Popconfirm
        //         title="Bạn có chắc chắn muốn hủy đơn này không?"
        //         onConfirm={() => handleCancelOrder(record.orderId)}
        //         okText="Có"
        //         cancelText="Không"
        //       >
        //         <Button danger>Hủy đơn</Button>
        //       </Popconfirm>
        //     </>
        //   )}
        //   {record.status === "shipping" && (
        //     <Button onClick={() => handleMarkAsDelivered(record.orderId)}>
        //       Đã giao
        //     </Button>
        //   )}
        // </Space>
        <Space>
          <Button type="link" onClick={() => showOrderDetails(record)}>
            Chi tiết
          </Button>

          {["pending", "processing"].includes(record.status) && (
            <>
              <Button
                type="primary"
                onClick={() => handleConfirmOrder(record.orderId)}
              >
                Xác nhận
              </Button>

              <Popconfirm
                title="Bạn có chắc chắn muốn hủy đơn này không?"
                onConfirm={() => handleCancelOrder(record.orderId)}
                okText="Có"
                cancelText="Không"
              >
                <Button danger>Hủy đơn</Button>
              </Popconfirm>
            </>
          )}

          {record.status === "shipping" && (
            <Button onClick={() => handleMarkAsDelivered(record.orderId)}>
              Đã giao
            </Button>
          )}

          {/* {record.status === "returned" && (
            <>
              {!record.refundHandled ? (
                <>
                  <Button
                    type="primary"
                    // onClick={() =>
                    //   handleApproveRefund(record.orderId, record.productIndex)
                    // }
                  >
                    Hoàn tiền
                  </Button>

                  <Popconfirm
                    title="Từ chối yêu cầu trả hàng?"
                    // onConfirm={() =>
                    //   handleRejectRefund(record.orderId, record.productIndex)
                    // }
                    okText="Từ chối"
                    cancelText="Không"
                  >
                    <Button danger>Từ chối</Button>
                  </Popconfirm>
                </>
              ) : (
                <Tag color="green">Đã xử lý</Tag>
              )}
            </>
          )} */}
        </Space>
      ),
    },
  ];

  const getFilteredOrdersByStatus = (statusKey) => {
    if (statusKey === "all") return flattenedOrders;

    return flattenedOrders.filter((item) => item.status === statusKey);
  };

  const orderCounts = useMemo(() => {
    const counts = {
      all: 0,
      pending: 0,
      processing: 0,
      shipping: 0,
      delivered: 0,
      returned: 0,
      cancelled: 0,
    };

    flattenedOrders.forEach((item) => {
      counts.all += 1;
      counts[item.status] += 1;
    });

    return counts;
  }, [flattenedOrders]);

  return (
    <div>
      <Row>
        <h2 style={{ marginBottom: 20 }}>Duyệt đơn hàng</h2>
      </Row>

      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
        <Tabs.TabPane tab={`Tất cả (${orderCounts.all})`} key="all">
          <Table
            columns={columns}
            dataSource={getFilteredOrdersByStatus("all")}
            pagination={{ pageSize: 5 }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={`Chờ xác nhận (${orderCounts.pending})`}
          key="pending"
        >
          <Table
            columns={columns}
            dataSource={getFilteredOrdersByStatus("pending")}
            pagination={{ pageSize: 5 }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={`Đang xử lý (${orderCounts.processing})`}
          key="processing"
        >
          <Table
            columns={columns}
            dataSource={getFilteredOrdersByStatus("processing")}
            pagination={{ pageSize: 5 }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={`Đang giao (${orderCounts.shipping})`}
          key="shipping"
        >
          <Table
            columns={columns}
            dataSource={getFilteredOrdersByStatus("shipping")}
            pagination={{ pageSize: 5 }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={`Đã giao (${orderCounts.delivered})`}
          key="delivered"
        >
          <Table
            columns={columns}
            dataSource={getFilteredOrdersByStatus("delivered")}
            pagination={{ pageSize: 5 }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={`Đã trả hàng (${orderCounts.returned})`}
          key="returned"
        >
          <Table
            columns={columns}
            dataSource={getFilteredOrdersByStatus("returned")}
            pagination={{ pageSize: 5 }}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab={`Đã hủy (${orderCounts.cancelled})`} key="cancelled">
          <Table
            columns={columns}
            dataSource={getFilteredOrdersByStatus("cancelled")}
            pagination={{ pageSize: 5 }}
          />
        </Tabs.TabPane>
      </Tabs>

      <OrderDetailModal
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderReview;
