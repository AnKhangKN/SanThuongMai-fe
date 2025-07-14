import React, { useState, useEffect, useCallback } from "react";
import { Wrapper } from "./style";
import { Select, Table, Tag, Modal, Button } from "antd";
import * as ShopServices from "../../../services/admin/ShopServices";
import * as ValidateToken from "../../../utils/tokenUtils";

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

  const fetchAllShop = useCallback(async () => {
    try {
      const token = await ValidateToken.getValidAccessToken();
      const res = await ShopServices.getAllShops(token);

      console.log("res", res);

      if (res?.shops) {
        setAllData(res.shops);
      } else {
        console.error("Không nhận được phản hồi hợp lệ từ API.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllShop();
  }, [fetchAllShop]);

  useEffect(() => {
    const filtered =
      selectedStatus === "all"
        ? allData
        : allData.filter((item) => item?.status === selectedStatus);
    setFilteredData(filtered);
  }, [selectedStatus, allData]);

  // const handleChangeStatus = async () => {
  //   try {
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
          <Button key="save" type="primary">
            Lưu
          </Button>,
        ]}
      >
        {selectedUser && (
          <div>
            <p>
              <strong>Tên chủ sở hửu:</strong>{" "}
              {selectedUser.ownerId?.fullName || "Không xác định"}
            </p>

            <p>
              <strong>Tên cửa hàng:</strong>{" "}
              {selectedUser.shopName || "Chưa có"}
            </p>
            <div>
              <Select
                value={newStatus}
                style={{ width: "120px" }}
                onChange={(value) => setNewStatus(value)}
                options={[
                  { value: "active", label: "Đang hoạt động" },
                  { value: "inactive", label: "Không hoạt động" },
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
