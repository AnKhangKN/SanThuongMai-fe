import React, { useState, useEffect } from "react";
import { Wrapper } from "./style";
import { Select, Table, Tag, Modal, Button } from "antd";

const allData = [
  {
    key: 1,
    name: "John",
    email: "john@gmail.com",
    phone: "1234567890",
    shopId: "3",
    shopName: "John Shop",
    status: "active",
    createAt: "2023-01-01",
  },
  {
    key: 2,
    name: "Alice",
    email: "alice@gmail.com",
    phone: "0987654321",
    shopId: "5",
    shopName: "Alice's Store",
    status: "pending",
    createAt: "2023-02-15",
  },
  {
    key: 3,
    name: "Bob",
    email: "bob@gmail.com",
    phone: "1122334455",
    shopId: "7",
    shopName: "Bob's Market",
    status: "active",
    createAt: "2023-03-10",
  },
  {
    key: 4,
    name: "Charlie",
    email: "charlie@gmail.com",
    phone: "2233445566",
    shopId: "9",
    shopName: "Charlie's Goods",
    status: "inactive",
    createAt: "2023-04-05",
  },
];

const columns = [
  { title: "ID", dataIndex: "key", sorter: (a, b) => a.key - b.key },
  { title: "Name", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "Phone", dataIndex: "phone" },
  { title: "Shop Name", dataIndex: "shopName" },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => {
      let color =
        status === "active"
          ? "green"
          : status === "inactive"
          ? "red"
          : "orange";
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
  {
    title: "Create At",
    dataIndex: "createAt",
    sorter: (a, b) => new Date(a.createAt) - new Date(b.createAt),
  },
];

const VendorManagementPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredData, setFilteredData] = useState(allData);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newStatus, setNewStatus] = useState(null);

  // Cập nhật dữ liệu mỗi khi selectedStatus thay đổi
  useEffect(() => {
    const newData =
      selectedStatus === "all"
        ? allData
        : allData.filter((item) => item.status === selectedStatus);
    setFilteredData(newData);
  }, [selectedStatus]);

  const handleFilterChange = (value) => {
    setSelectedStatus(value);
  };

  const handleRowClick = (record) => {
    setSelectedUser(record);
    setNewStatus(record.status);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const handleSaveStatus = () => {
    if (selectedUser) {
      const updatedAllData = allData.map((item) =>
        item.key === selectedUser.key ? { ...item, status: newStatus } : item
      );
      // Cập nhật lại filteredData dựa vào selectedStatus
      const updatedFilteredData =
        selectedStatus === "all"
          ? updatedAllData
          : updatedAllData.filter((item) => item.status === selectedStatus);
      setFilteredData(updatedFilteredData);
      setModalVisible(false);
    }
  };

  return (
    <Wrapper>
      <h3>Quản lý người dùng</h3>
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
            marginBottom: "20px",
          }}
        >
          <h5>Danh sách Cộng tác viên</h5>
          <Select
            value={selectedStatus}
            style={{ width: "120px" }}
            onChange={handleFilterChange}
            options={[
              { value: "all", label: "All" },
              { value: "active", label: "Active" },
              { value: "pending", label: "Pending" },
              { value: "inactive", label: "Inactive" },
            ]}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={{ pageSize: 5 }}
        />
      </div>

      {/* Modal xem/sửa thông tin */}
      <Modal
        title="Thông tin Cộng tác viên"
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
        {selectedUser && (
          <div>
            <p>
              <strong>ID:</strong> {selectedUser.key}
            </p>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Shop Name:</strong> {selectedUser.shopName}
            </p>
            <div>
              <Select
                value={newStatus}
                style={{ width: "120px" }}
                onChange={(value) => setNewStatus(value)}
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                  { value: "pending", label: "Pending" },
                ]}
              />
            </div>
          </div>
        )}
      </Modal>
    </Wrapper>
  );
};

export default VendorManagementPage;
