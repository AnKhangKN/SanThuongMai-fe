import { Table, Tag, Modal, Button, Select } from "antd";
import React, { useState } from "react";

const ShopFeedbackList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [shops, setShops] = useState([
    {
      key: "1",
      shopId: "CH001",
      shopName: "Shop A",
      date: "2024-03-30",
      status: "Chưa xử lý",
      report: "Bán hàng giả mạo",
    },
    {
      key: "2",
      shopId: "CH002",
      shopName: "Shop B",
      date: "2024-03-29",
      status: "Đã xử lý",
      report: "Không giao hàng đúng hẹn",
    },
    {
      key: "3",
      shopId: "CH003",
      shopName: "Shop C",
      date: "2024-03-28",
      status: "Chưa xử lý",
      report: "Phục vụ khách hàng kém",
    },
  ]);

  const columns = [
    { title: "Mã cửa hàng", dataIndex: "shopId", key: "shopId" },
    { title: "Tên cửa hàng", dataIndex: "shopName", key: "shopName" },
    { title: "Ngày phản hồi", dataIndex: "date", key: "date" },
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
    setSelectedShop({ ...record });
    setIsModalOpen(true);
  };

  const handleStatusChange = (value) => {
    setSelectedShop((prev) => ({ ...prev, status: value }));
  };

  const handleSave = () => {
    setShops((prevShops) =>
      prevShops.map((shop) =>
        shop.shopId === selectedShop.shopId ? { ...selectedShop } : shop
      )
    );
    setIsModalOpen(false);
  };

  return (
    <>
      <Table
        dataSource={shops}
        columns={columns}
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowClassName="clickable-row"
      />

      <Modal
        title="Chi tiết phản hồi cửa hàng"
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
        {selectedShop && (
          <>
            <p>
              <strong>Mã cửa hàng:</strong> {selectedShop.shopId}
            </p>
            <p>
              <strong>Tên cửa hàng:</strong> {selectedShop.shopName}
            </p>
            <p>
              <strong>Ngày phản hồi:</strong> {selectedShop.date}
            </p>
            <p>
              <strong>Nội dung báo cáo:</strong> {selectedShop.report}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              <Select
                value={selectedShop.status}
                onChange={handleStatusChange}
                style={{ width: 150 }}
              >
                <Select.Option value="Chưa xử lý">Chưa xử lý</Select.Option>
                <Select.Option value="Đã xử lý">Đã xử lý</Select.Option>
              </Select>
            </p>
          </>
        )}
      </Modal>
    </>
  );
};

export default ShopFeedbackList;
