import React from "react";
import { Modal, Descriptions, Divider, Table, Image, Tag } from "antd";

const OrderDetailModal = ({ open, onClose, order }) => {
  if (!order) return null;
  const items = order.productItems || [];

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

  const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "productImage",
      key: "productImage",
      render: (image) => <Image width={50} src={`${imageURL}${image}`} />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Thuộc tính",
      dataIndex: "attributes",
      key: "attributes",
      render: (attrs) => attrs.map((a) => `${a.name}: ${a.value}`).join(", "),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "finalPrice",
      key: "finalPrice",
      render: (price) => `${price.toLocaleString()}₫`,
    },
    {
      title: "Lý do trả hàng",
      dataIndex: "returnReason",
      key: "returnReason",
      render: (reason) => reason || "—",
    },
    {
      title: "Ảnh minh họa",
      dataIndex: "imgReturnReason",
      key: "imgReturnReason",
      render: (imgs) =>
        imgs?.length
          ? imgs.map((img, idx) => (
              <Image
                key={idx}
                src={`${process.env.REACT_APP_API_URL}/return-images/${img}`}
                width={50}
                style={{ marginRight: 5 }}
              />
            ))
          : "—",
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Chi tiết đơn hàng"
      width={800}
      footer={null}
    >
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="Mã đơn hàng">{order._id}</Descriptions.Item>
        <Descriptions.Item label="Ngày đặt">
          {new Date(order.createdAt).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color={statusColors[items[0]?.status] || "default"}>
            {statusLabels[items[0]?.status] || "Không rõ"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Tổng tiền">
          <strong>{order.totalPrice?.toLocaleString()}₫</strong>
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ nhận hàng">
          {order.shippingAddress
            ? `${order.shippingAddress.address}, ${order.shippingAddress.city} (${order.shippingAddress.phone})`
            : "Không rõ"}
        </Descriptions.Item>
      </Descriptions>

      <Divider>Danh sách sản phẩm</Divider>

      <Table
        rowKey={(record, index) => index}
        columns={columns}
        dataSource={items}
        pagination={false}
      />
    </Modal>
  );
};

export default OrderDetailModal;
