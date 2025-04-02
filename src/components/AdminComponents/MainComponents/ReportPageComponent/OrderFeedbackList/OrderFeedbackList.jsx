import { Table, Tag, Modal, Button, Select } from "antd";
import React, { useState } from "react";

const OrderFeedbackList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([
    {
      key: "1",
      id: "DH123",
      date: "2024-03-30",
      status: "Chưa xử lý",
      shop: "Shop ABC",
      products: ["Sản phẩm A", "Sản phẩm B"],
      report: "Giao hàng chậm",
      shopStatus: "Đang xem xét",
    },
    {
      key: "2",
      id: "DH124",
      date: "2024-03-29",
      status: "Đã xử lý",
      shop: "Shop XYZ",
      products: ["Sản phẩm C", "Sản phẩm D"],
      report: "Sản phẩm không đúng mô tả",
      shopStatus: "Đã xử lý",
    },
  ]);

  const columns = [
    { title: "Mã đơn", dataIndex: "id", key: "id" },
    { title: "Ngày tạo đơn", dataIndex: "date", key: "date" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Chưa xử lý" ? "orange" : "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const handleRowClick = (record) => {
    setSelectedOrder({ ...record });
    setIsModalOpen(true);
  };

  const handleShopStatusChange = (value) => {
    setSelectedOrder((prev) => ({ ...prev, shopStatus: value }));
  };

  const handleSave = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder.id ? { ...selectedOrder } : order
      )
    );
    setIsModalOpen(false);
  };

  return (
    <>
      <Table
        dataSource={orders}
        columns={columns}
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowClassName="clickable-row"
      />

      <Modal
        title="Chi tiết đơn hàng"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Hủy
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Lưu
          </Button>,
        ]}
      >
        {selectedOrder && (
          <>
            <p>
              <strong>Mã đơn:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>Ngày tạo:</strong> {selectedOrder.date}
            </p>
            <p>
              <strong>Shop giao hàng:</strong> {selectedOrder.shop}
            </p>
            <p>
              <strong>Sản phẩm:</strong> {selectedOrder.products.join(", ")}
            </p>
            <p>
              <strong>Mô tả báo cáo:</strong> {selectedOrder.report}
            </p>
            <p>
              <strong>Trạng thái shop:</strong>{" "}
              <Select
                value={selectedOrder.shopStatus}
                onChange={handleShopStatusChange}
                style={{ width: 150 }}
              >
                <Select.Option value="Đang xem xét">Đang xem xét</Select.Option>
                <Select.Option value="Đã xử lý">Đã xử lý</Select.Option>
              </Select>
            </p>
          </>
        )}
      </Modal>
    </>
  );
};

export default OrderFeedbackList;
