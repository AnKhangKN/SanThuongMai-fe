import { useCallback, useEffect, useState } from "react";
import { Table, Tag, Modal, Select, message } from "antd";
import { jwtDecode } from "jwt-decode";
import * as UserServices from "../../../services/admin/UserServices";
import * as AuthServices from "../../../services/shared/AuthServices";
import { isJsonString } from "../../../utils";
import { Wrapper } from "./style";

const { Option } = Select;

const UserManagenetPage = () => {
  // Danh sách người dùng từ server
  const [allData, setAllData] = useState([]);

  // Dữ liệu đã được lọc theo trạng thái
  const [filteredData, setFilteredData] = useState([]);

  // Trạng thái đang được chọn để lọc
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Hiện/ẩn modal cập nhật trạng thái
  const [modalVisible, setModalVisible] = useState(false);

  // Người dùng được chọn để chỉnh sửa
  const [selectedUser, setSelectedUser] = useState(null);

  // Trạng thái mới được chọn trong modal
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
      const res = await UserServices.getAllUsers(accessToken);

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

  // Gọi API khi component được mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Lọc dữ liệu khi thay đổi trạng thái lọc hoặc allData
  useEffect(() => {
    const newData =
      selectedStatus === "all"
        ? allData
        : allData.filter((item) => item.account_status === selectedStatus);
    setFilteredData(newData);
  }, [selectedStatus, allData]);

  // Cập nhật trạng thái người dùng khi click
  const handleRowClick = (record) => {
    setSelectedUser(record);
    setNewStatus(record.account_status);
    setModalVisible(true);
  };

  // Gọi API để cập nhật trạng thái người dùng
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
      await UserServices.partialUpdateUser(
        selectedUser.key, // ID người dùng được chọn
        newStatus, // Trạng thái mới
        accessToken // Token hợp lệ
      );

      // Cập nhật lại dữ liệu người dùng trong danh sách
      const updatedUsers = allData.map((user) =>
        user.key === selectedUser.key
          ? { ...user, account_status: newStatus }
          : user
      );

      setAllData(updatedUsers); // Cập nhật danh sách trong state
      setModalVisible(false); // Ẩn modal
      message.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      message.error("Đã có lỗi xảy ra khi cập nhật trạng thái.");
    }
  };

  // Cấu hình cột cho bảng
  const columns = [
    { title: "ID", dataIndex: "key" },
    { title: "Tên người dùng", dataIndex: "user_name" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Trạng thái",
      dataIndex: "account_status",
      render: (status) => {
        let color = "default";
        if (status === "active") color = "green";
        else if (status === "pending") color = "orange";
        else if (status === "inactive") color = "red";

        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <Wrapper>
      <h3>Quản lý Cộng tác viên</h3>

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
            onChange={(value) => setSelectedStatus(value)}
            style={{ width: 200, marginBottom: 16 }}
          >
            <Option value="all">Tất cả</Option>
            <Option value="active">Đang hoạt động</Option>
            <Option value="pending">Chờ duyệt</Option>
            <Option value="inactive">Ngưng hoạt động</Option>
          </Select>
        </div>

        {/* Bảng hiển thị người dùng */}
        <Table
          dataSource={filteredData}
          columns={columns}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={{ pageSize: 8 }}
          rowClassName="clickable-row"
        />

        {/* Modal cập nhật trạng thái */}
        <Modal
          title="Cập nhật trạng thái người dùng"
          open={modalVisible}
          onOk={handleSaveStatus}
          onCancel={() => setModalVisible(false)}
          okText="Lưu"
          cancelText="Hủy"
        >
          <p>
            Người dùng: <strong>{selectedUser?.user_name}</strong>
          </p>
          <Select
            value={newStatus}
            onChange={(value) => setNewStatus(value)}
            style={{ width: "100%" }}
          >
            <Option value="active">Đang hoạt động</Option>
            <Option value="pending">Chờ duyệt</Option>
            <Option value="inactive">Ngưng hoạt động</Option>
          </Select>
        </Modal>
      </div>
    </Wrapper>
  );
};

export default UserManagenetPage;
