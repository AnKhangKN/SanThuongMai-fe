import React, { useState, useEffect, useCallback } from "react";
import { Wrapper } from "./style";
import { Select, Table, Tag, Modal, Button, message } from "antd";
import * as ShopServices from "../../../services/admin/ShopServices";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import * as AuthServices from "../../../services/shared/AuthServices";

const columns = [
  { title: "Chủ sở hữu", dataIndex: "user_name", ellipsis: true },
  { title: "Email", dataIndex: "email", ellipsis: true },
  {
    title: "Tên cửa hàng",
    render: (record) => record.shop?.name || "Chưa có",
    ellipsis: true,
  },
  {
    title: "Trạng thái cửa hàng",
    render: (record) => {
      const status = record.shop?.status || "chưa xác định";
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
    title: "Ngày tạo",
    dataIndex: "createdAt",
    render: (date) => new Date(date).toLocaleString(),
    sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  },
];

const VendorManagementPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newStatus, setNewStatus] = useState(null);

  // Giải mã access_token từ localStorage
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  // Lấy danh sách người dùng từ server
  const fetchUsers = useCallback(async () => {
    try {
      let { storageData, decoded } = handleDecoded();

      let accessToken = storageData;

      // Nếu token hết hạn → refresh và sử dụng ngay token mới
      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        accessToken = res?.access_token;

        // Cập nhật lại token trong localStorage để dùng cho các request sau
        localStorage.setItem("access_token", JSON.stringify(accessToken));
      }

      // Gọi API lấy danh sách người dùng với accessToken (mới hoặc cũ)
      const res = await ShopServices.getAllShops(accessToken);

      // Thêm key để Table hiển thị
      const usersWithKeys = res.data.map((user) => ({
        ...user,
        key: user._id,
      }));

      setAllData(usersWithKeys);
    } catch (error) {
      console.error("Lỗi khi lấy người dùng:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const filtered =
      selectedStatus === "all"
        ? allData
        : allData.filter((item) => item.shop?.status === selectedStatus);
    setFilteredData(filtered);
  }, [selectedStatus, allData]);

  const handleFilterChange = (value) => {
    setSelectedStatus(value);
  };

  const handleRowClick = (record) => {
    setSelectedUser(record);
    setNewStatus(record.shop?.status || null);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const handleSaveStatus = async () => {
    try {
      // Lấy token từ localStorage và giải mã
      let { storageData, decoded } = handleDecoded();

      let accessToken = storageData;

      // Kiểm tra nếu token đã hết hạn → refresh token
      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        accessToken = res?.access_token;

        // Lưu token mới vào localStorage để sử dụng lần sau
        localStorage.setItem("access_token", JSON.stringify(accessToken));
      }

      // Gọi API cập nhật trạng thái người dùng với token mới/cũ
      await ShopServices.partialUpdateShop(
        selectedUser.key, // ID người dùng được chọn
        newStatus, // Trạng thái mới
        accessToken // Token hợp lệ
      );

      // Cập nhật lại dữ liệu người dùng trong danh sách
      const updateShopStatus = allData.map((user) =>
        user.key === selectedUser.key
          ? {
              ...user,
              shop: {
                ...user.shop,
                status: newStatus,
              },
            }
          : user
      );

      setAllData(updateShopStatus); // Cập nhật danh sách trong state
      setModalVisible(false); // Ẩn modal
      message.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      message.error("Đã có lỗi xảy ra khi cập nhật trạng thái.");
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
              { value: "all", label: "Tất cả" },
              { value: "active", label: "Đang hoạt động" },
              { value: "pending", label: "Đang chờ" },
              { value: "inactive", label: "Không hoạt động" },
            ]}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={{ pageSize: 8 }}
        />
      </div>

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
              <strong>Tên:</strong> {selectedUser.user_name}
            </p>
            <p>
              <strong>Tên cửa hàng:</strong>{" "}
              {selectedUser.shop?.name || "Chưa có"}
            </p>
            <div>
              <Select
                value={newStatus}
                style={{ width: "120px" }}
                onChange={(value) => setNewStatus(value)}
                options={[
                  { value: "active", label: "Đang hoạt động" },
                  { value: "inactive", label: "Không hoạt động" },
                  { value: "pending", label: "Đang chờ" },
                  { value: "banned", label: "Bị cấm" },
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
