import React, { useState, useEffect, useCallback } from "react";
import { Wrapper } from "./style";
import { Select, Table, Tag, Modal, Button, message } from "antd";
import * as ShopServices from "../../../services/admin/ShopServices";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import * as AuthServices from "../../../services/shared/AuthServices";

const columns = [
  {
    title: "Chủ sở hữu",
    dataIndex: "ownerId",
    render: (owner) => owner?.fullName || "Không xác định",
    ellipsis: true,
  },
  {
    title: "Email",
    dataIndex: "ownerId",
    render: (owner) => owner?.email || "Không xác định",
    ellipsis: true,
  },

  {
    title: "Tên cửa hàng",
    dataIndex: "shopName",
    ellipsis: true,
  },
  {
    title: "Trạng thái cửa hàng",
    render: (record) => {
      const status = record.status || "chưa xác định";
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

  const handleDecoded = async () => {
    let storageData = localStorage.getItem("access_token");
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      const decoded = jwtDecode(storageData);
      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        const accessToken = res?.access_token;
        localStorage.setItem("access_token", JSON.stringify(accessToken));
        return accessToken;
      }
      return storageData;
    }
    return null;
  };

  const fetchAllHome = useCallback(async () => {
    try {
      const token = await handleDecoded();
      const res = await ShopServices.getAllShops(token);

      if (res?.shops) {
        console.log("Dữ liệu nhận được từ API:", res.shops);
        setAllData(res.shops);
      } else {
        console.error("Không nhận được phản hồi hợp lệ từ API.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllHome();
  }, [fetchAllHome]);

  useEffect(() => {
    const filtered =
      selectedStatus === "all"
        ? allData
        : allData.filter((item) => item?.status === selectedStatus);
    setFilteredData(filtered);
  }, [selectedStatus, allData]);

  const handleFilterChange = (value) => {
    setSelectedStatus(value);
  };

  const handleRowClick = (record) => {
    setSelectedUser(record);
    setNewStatus(record.status || null);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const handleSaveStatus = async () => {
    try {
      message.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
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
              <strong>Tên:</strong>{" "}
              {selectedUser.ownerId?.fullName || "Không xác định"}
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
