import React, { useState, useCallback, useEffect } from "react";
import { Table, Tag, Space, Button, message, Row, Tabs,  Select, Image } from "antd";
import OrderFilter from "../../../components/VendorComponents/OrderFilter/OrderFilter";
import * as OrderProductService from "../../../services/vendor/OrderProductService";
import * as AuthServices from "../../../services/shared/AuthServices";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";

const mockOrders = [
  {
    key: "1",
    productName: "Áo thể thao nam",
    image: "https://via.placeholder.com/80",
    attributes: [
      { name: "Size", value: "M" },
      { name: "Color", value: "Đen" },
    ],
    quantity: 2,
    price: 250000,
    status: "pending",
  },
  {
    key: "2",
    productName: "Quần thể thao nữ",
    image: "https://via.placeholder.com/80",
    attributes: [
      { name: "Size", value: "L" },
      { name: "Color", value: "Xanh" },
    ],
    quantity: 1,
    price: 190000,
    status: "shipped",
  },
  {
    key: "3",
    productName: "Giày chạy bộ",
    image: "https://via.placeholder.com/80",
    attributes: [
      { name: "Size", value: "42" },
      { name: "Color", value: "Trắng" },
    ],
    quantity: 1,
    price: 590000,
    status: "delivered",
  },
];

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
    const { Option } = Select;
    const [activeTab, setActiveTab] = useState("all");

    const filteredOrders =
    activeTab === "all"
      ? mockOrders
      : mockOrders.filter((order) => order.status === activeTab);

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
      render: (text, record) => (
        <Space>
          <Image src={record.image} width={60} />
          <div>
            <div><strong>{record.productName}</strong></div>
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
          <Button type="link">Chi tiết</Button>
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

      <Table columns={columns} dataSource={filteredOrders} />
    </div>
  );
};

export default OrderReview;
