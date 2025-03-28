import React, { useState } from "react";
import { Wrapper } from "./style";
import { Select, Table, Tag, Modal, Button } from "antd";

const allData = [
  {
    key: "1",
    name: "John",
    email: "john@gmail.com",
    phone: "1234567890",
    shopId: "3",
    shopName: "John Shop",
    status: "active",
    createAt: "2023-01-01",
  },
  {
    key: "2",
    name: "Alice",
    email: "alice@gmail.com",
    phone: "0987654321",
    shopId: "5",
    shopName: "Alice's Store",
    status: "pending",
    createAt: "2023-02-15",
  },
  {
    key: "3",
    name: "Bob",
    email: "bob@gmail.com",
    phone: "1122334455",
    shopId: "7",
    shopName: "Bob's Market",
    status: "active",
    createAt: "2023-03-10",
  },
  {
    key: "4",
    name: "Charlie",
    email: "charlie@gmail.com",
    phone: "2233445566",
    shopId: "9",
    shopName: "Charlie's Goods",
    status: "inactive",
    createAt: "2023-04-05",
  },
  {
    key: "5",
    name: "David",
    email: "david@gmail.com",
    phone: "3344556677",
    shopId: "11",
    shopName: "David's Boutique",
    status: "active",
    createAt: "2023-05-20",
  },
  {
    key: "6",
    name: "Emma",
    email: "emma@gmail.com",
    phone: "4455667788",
    shopId: "13",
    shopName: "Emma's Essentials",
    status: "inactive",
    createAt: "2023-06-30",
  },
  {
    key: "7",
    name: "Frank",
    email: "frank@gmail.com",
    phone: "5566778899",
    shopId: "15",
    shopName: "Frank's Emporium",
    status: "active",
    createAt: "2023-07-25",
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

  const handleFilterChange = (value) => {
    setSelectedStatus(value);
    if (value === "all") {
      setFilteredData(allData);
    } else {
      setFilteredData(allData.filter((item) => item.status === value));
    }
  };

  const handleRowClick = (record) => {
    setSelectedUser(record);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <Wrapper>
      <h1>Cộng tác viên</h1>
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
          <h2>Danh sách Cộng tác viên</h2>
          <Select
            defaultValue="all"
            style={{ width: "120px" }}
            options={[
              { value: "all", label: "All" },
              { value: "active", label: "Active" },
              { value: "pending", label: "Pending" },
              { value: "inactive", label: "Inactive" },
            ]}
            onChange={handleFilterChange}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={{
            pageSize: 5,
          }}
        />
      </div>

      {/* Modal xem/sửa thông tin */}
      <Modal
        title="Thông tin Cộng tác viên"
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Đóng
          </Button>,
          <Button key="save" type="primary">
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
                defaultValue={selectedUser.status}
                style={{ width: "120px" }}
                options={[
                  selectedUser.status === "active" && {
                    value: "inactive",
                    label: "Inactive",
                  },
                  selectedUser.status === "inactive" && {
                    value: "active",
                    label: "Active",
                  },
                  selectedUser.status === "pending" && {
                    value: "active",
                    label: "Active",
                  },
                ].filter(Boolean)} // Lọc bỏ giá trị `false` hoặc `null`
              />
            </div>
          </div>
        )}
      </Modal>
    </Wrapper>
  );
};

export default VendorManagementPage;
