import React, { useState, useEffect } from "react";
import { Wrapper } from "./style";
import { Select, Table, Tag, Modal, Button, message } from "antd";
import { useDispatch } from "react-redux";
import * as UserServices from "../../../services/admin/UserServices";

const columns = [
  { title: "ID", dataIndex: "key" },
  { title: "Name", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "Phone", dataIndex: "phone" },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => {
      if (!status) return <Tag color="gray">Unknown</Tag>; // Xử lý trường hợp status là null hoặc undefined

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
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newStatus, setNewStatus] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Lấy accessToken từ localStorage hoặc từ Redux store
        const accessToken = localStorage.getItem("access_token"); // Hoặc lấy từ Redux

        if (!accessToken) {
          message.error("Không tìm thấy access token");
          return;
        }

        // Truyền accessToken vào hàm getAllUsers
        const res = await UserServices.getAllUsers(accessToken);

        if (res?.data) {
          const usersWithKey = res.data.map((user) => ({
            ...user,
            key: user._id,
          }));
          setAllData(usersWithKey);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        message.error("Không thể tải danh sách người dùng");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const newData =
      selectedStatus === "all"
        ? allData
        : allData.filter((item) => item.status === selectedStatus);
    setFilteredData(newData);
  }, [selectedStatus, allData]);

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
      setAllData(updatedAllData); // cập nhật local
      setModalVisible(false);
      message.success("Cập nhật trạng thái thành công");
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

      {/* Modal chỉnh sửa trạng thái */}
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
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <div style={{ marginTop: "10px" }}>
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
