import React, { useState } from "react";
import { Wrapper } from "./style";
import { Button, Modal, Table, Tag, Select, Input } from "antd";

const StatisticsManagementPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [newFee, setNewFee] = useState({
    name: "",
    applicable: "Order",
    amount: "",
    description: "",
    status: "Đang hoạt động",
    createdAt: new Date().toLocaleDateString("vi-VN"),
  });

  const [feeData, setFeeData] = useState([
    {
      key: "1",
      name: "Phí theo phần trăm đơn hàng",
      applicable: "Order",
      amount: "10%",
      description: "Phí thu trên mỗi đơn hàng hoàn tất",
      status: "Đang hoạt động",
      createdAt: "01/04/2025",
    },
    {
      key: "2",
      name: "Phí cố định mỗi sản phẩm",
      applicable: "Product",
      amount: "5.000đ",
      description: "Phí cố định áp dụng trên mỗi sản phẩm bán ra",
      status: "Đang hoạt động",
      createdAt: "01/04/2025",
    },
    {
      key: "3",
      name: "Phí riêng cho Vendor A",
      applicable: "Vendor",
      amount: "8%",
      description: "Mức phí riêng cho nhà bán A",
      status: "Đang hoạt động",
      createdAt: "02/04/2025",
    },
    {
      key: "4",
      name: "Phí theo danh mục điện tử",
      applicable: "Category",
      amount: "15%",
      description: "Áp dụng cho các sản phẩm trong danh mục điện tử",
      status: "Không hoạt động",
      createdAt: "02/04/2025",
    },
    {
      key: "5",
      name: "Phí xử lý thanh toán",
      applicable: "Order",
      amount: "2%",
      description: "Phí hỗ trợ cổng thanh toán và đối soát",
      status: "Đang hoạt động",
      createdAt: "05/04/2025",
    },
    {
      key: "6",
      name: "Phí khuyến mãi đặc biệt",
      applicable: "Vendor",
      amount: "3%",
      description: "Phí ưu đãi trong đợt khuyến mãi 30/4",
      status: "Không hoạt động",
      createdAt: "07/04/2025",
    },
  ]);

  const handleRowClick = (record) => {
    setSelectedFee(record);
    setNewStatus(record.status);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedFee(null);
  };

  const handleSaveStatus = () => {
    const updatedData = feeData.map((item) =>
      item.key === selectedFee.key ? { ...item, status: newStatus } : item
    );
    setFeeData(updatedData);
    setModalVisible(false);
  };

  const handleOpenAddModal = () => {
    setNewFee({
      name: "",
      applicable: "Order",
      amount: "",
      description: "",
      status: "Đang hoạt động",
      createdAt: new Date().toLocaleDateString("vi-VN"),
    });
    setModalAddVisible(true);
  };

  const handleAddFee = () => {
    const newItem = {
      ...newFee,
      key: (feeData.length + 1).toString(),
    };
    setFeeData([...feeData, newItem]);
    setModalAddVisible(false);
  };

  const columns = [
    {
      title: "Tên chi phí",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Áp dụng cho",
      dataIndex: "applicable",
      key: "applicable",
    },
    {
      title: "Giá trị",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => {
        let color =
          status === "Đang hoạt động"
            ? "green"
            : status === "Không hoạt động"
            ? "red"
            : "orange";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
  ];

  return (
    <Wrapper>
      <h3>Quản lý chi phí nền tảng</h3>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "1px 1px 10px #e9e9e9",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h5>Danh sách chi phí nền tảng</h5>
          <Button type="primary" onClick={handleOpenAddModal}>
            Thêm chi phí
          </Button>
        </div>

        <Table
          dataSource={feeData}
          columns={columns}
          pagination={{ pageSize: 5 }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          rowKey="key"
        />
      </div>

      {/* Modal xem/sửa trạng thái */}
      <Modal
        title="Thông tin Chi phí"
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Đóng
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveStatus}>
            Lưu
          </Button>,
        ]}
      >
        {selectedFee && (
          <div>
            <p>
              <strong>ID:</strong> {selectedFee.key}
            </p>
            <p>
              <strong>Tên chi phí:</strong> {selectedFee.name}
            </p>
            <p>
              <strong>Mô tả:</strong> {selectedFee.description}
            </p>
            <p>
              <strong>Trạng thái:</strong>
              <Select
                value={newStatus}
                style={{ width: "160px", marginLeft: "10px" }}
                onChange={(value) => setNewStatus(value)}
                options={[
                  { value: "Đang hoạt động", label: "Đang hoạt động" },
                  { value: "Không hoạt động", label: "Không hoạt động" },
                ]}
              />
            </p>
          </div>
        )}
      </Modal>

      {/* Modal thêm chi phí */}
      <Modal
        title="Thêm Chi phí mới"
        open={modalAddVisible}
        onCancel={() => setModalAddVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalAddVisible(false)}>
            Hủy
          </Button>,
          <Button key="add" type="primary" onClick={handleAddFee}>
            Thêm
          </Button>,
        ]}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <strong>Tên chi phí:</strong>
            <Input
              value={newFee.name}
              onChange={(e) => setNewFee({ ...newFee, name: e.target.value })}
            />
          </div>
          <div>
            <strong>Áp dụng cho:</strong>
            <Select
              value={newFee.applicable}
              onChange={(value) => setNewFee({ ...newFee, applicable: value })}
              style={{ width: "100%" }}
              options={[
                { value: "Order", label: "Order" },
                { value: "Product", label: "Product" },
                { value: "Vendor", label: "Vendor" },
                { value: "Category", label: "Category" },
              ]}
            />
          </div>
          <div>
            <strong>Giá trị:</strong>
            <Input
              value={newFee.amount}
              onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
            />
          </div>
          <div>
            <strong>Mô tả:</strong>
            <Input
              value={newFee.description}
              onChange={(e) =>
                setNewFee({ ...newFee, description: e.target.value })
              }
            />
          </div>
          <div>
            <strong>Trạng thái:</strong>
            <Select
              value={newFee.status}
              onChange={(value) => setNewFee({ ...newFee, status: value })}
              style={{ width: "100%" }}
              options={[
                { value: "Đang hoạt động", label: "Đang hoạt động" },
                { value: "Không hoạt động", label: "Không hoạt động" },
              ]}
            />
          </div>
        </div>
      </Modal>
    </Wrapper>
  );
};

export default StatisticsManagementPage;
