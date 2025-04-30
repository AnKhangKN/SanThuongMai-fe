import React, { useCallback, useEffect, useState } from "react";
import { Wrapper } from "./style";
import { Button, Modal, Table, Tag, Select, Input, message } from "antd";
import { jwtDecode } from "jwt-decode";
import * as AuthServices from "../../../services/shared/AuthServices";
import * as PlatformServices from "../../../services/admin/PlatformFeeServices";
import { isJsonString } from "../../../utils";

const FEE_TYPES = [
  { value: "fixed", label: "Cố định" },
  { value: "percentage", label: "Phần trăm" },
];

const STATUS_OPTIONS = [
  { value: "active", label: "Đang hoạt động" },
  { value: "inactive", label: "Không hoạt động" },
];

const columns = [
  {
    title: "Tên chi phí",
    dataIndex: "fee_name",
    key: "fee_name",
    ellipsis: true,
    sorter: (a, b) => a.fee_name.localeCompare(b.fee_name),
  },
  {
    title: "Loại chi phí",
    dataIndex: "fee_type",
    key: "fee_type",
    ellipsis: true,
  },
  {
    title: "Giá trị",
    dataIndex: "value",
    key: "value",
    ellipsis: true,
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
  },
  {
    title: "Ngày bắt đầu",
    dataIndex: "effective_from",
    key: "effective_from",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const color =
        status === "active"
          ? "green"
          : status === "inactive"
          ? "red"
          : "orange";
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
];

const StatisticsManagementPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [feeData, setFeeData] = useState([]);
  const [newFee, setNewFee] = useState({
    fee_name: "",
    fee_type: "fixed",
    value: "",
    description: "",
    status: "Đang hoạt động",
    createdAt: new Date().toLocaleDateString("vi-VN"),
  });

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

  const createFee = async () => {
    const { fee_name, fee_type, value, description } = newFee;

    if (!fee_name || !fee_type || !value || !description) {
      return message.error("Hãy điền đầy đủ thông tin!");
    }

    if (isNaN(Number(value))) {
      return message.error("Giá trị phải là số hợp lệ!");
    }

    if (fee_type !== "percentage" && fee_type !== "fixed") {
      return message.error("Hãy chọn kiểu chi phí hợp lệ!");
    }

    try {
      const token = await handleDecoded();
      const res = await PlatformServices.createFee(token, newFee);
      if (res?.data) {
        setFeeData((prev) => [...prev, { ...res.data, key: res.data._id }]);
        setModalAddVisible(false);
        message.success("Tạo chi phí thành công!");
        setNewFee({
          fee_name: "",
          fee_type: "fixed",
          value: "",
          description: "",
          status: "Đang hoạt động",
          createdAt: new Date().toLocaleDateString("vi-VN"),
        });
      }
    } catch (error) {
      console.error("Lỗi khi tạo chi phí:", error);
      message.error("Tạo chi phí thất bại!");
    }
  };

  const fetchFee = useCallback(async () => {
    try {
      const token = await handleDecoded();
      const res = await PlatformServices.getAllFees(token);
      const feeWithKeys = res.data.map((fee) => ({
        ...fee,
        key: fee._id,
      }));
      setFeeData(feeWithKeys);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  }, []);

  useEffect(() => {
    fetchFee();
  }, [fetchFee]);

  const handleRowClick = (record) => {
    setSelectedFee(record);
    setNewStatus(record.status);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedFee(null);
  };

  const handleSaveStatus = async () => {
    // try {
    //   const token = await handleDecoded();
    //   await PlatformServices.updateFeeStatus(token, selectedFee.key, newStatus);
    //   const updatedData = feeData.map((item) =>
    //     item.key === selectedFee.key ? { ...item, status: newStatus } : item
    //   );
    //   setFeeData(updatedData);
    //   setModalVisible(false);
    //   message.success("Cập nhật trạng thái thành công!");
    // } catch (error) {
    //   console.error("Lỗi khi cập nhật trạng thái:", error);
    //   message.error("Cập nhật trạng thái thất bại!");
    // }
  };

  const handleOpenAddModal = () => {
    setModalAddVisible(true);
  };

  return (
    <Wrapper>
      <h3>Quản lý chi phí nền tảng</h3>
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 5,
          boxShadow: "1px 1px 10px #e9e9e9",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
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
          onRow={(record) => ({ onClick: () => handleRowClick(record) })}
          rowKey="key"
        />
      </div>

      {/* Modal xem chi tiết và đổi trạng thái */}
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
              <strong>Tên chi phí:</strong> {selectedFee.fee_name}
            </p>
            <p>
              <strong>Kiểu chi phí:</strong> {selectedFee.fee_type}
            </p>
            <p>
              <strong>Mô tả:</strong> {selectedFee.description}
            </p>
            <p>
              <strong>Ngày tạo:</strong> {selectedFee.createdAt}
            </p>
            <p>
              <strong>Trạng thái:</strong>
              <Select
                value={newStatus}
                style={{ width: 160, marginLeft: 10 }}
                onChange={(value) => setNewStatus(value)}
                options={STATUS_OPTIONS}
              />
            </p>
          </div>
        )}
      </Modal>

      {/* Modal thêm mới */}
      <Modal
        title="Thêm Chi phí mới"
        open={modalAddVisible}
        onCancel={() => setModalAddVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalAddVisible(false)}>
            Hủy
          </Button>,
          <Button key="add" type="primary" onClick={createFee}>
            Thêm
          </Button>,
        ]}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <strong>Tên chi phí:</strong>
            <Input
              value={newFee.fee_name}
              onChange={(e) =>
                setNewFee({ ...newFee, fee_name: e.target.value })
              }
            />
          </div>
          <div>
            <strong>Kiểu chi phí:</strong>
            <Select
              value={newFee.fee_type}
              style={{ width: 160 }}
              onChange={(value) => setNewFee({ ...newFee, fee_type: value })}
              options={FEE_TYPES}
            />
          </div>
          <div>
            <strong>Giá trị:</strong>
            <Input
              value={newFee.value}
              onChange={(e) => setNewFee({ ...newFee, value: e.target.value })}
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
        </div>
      </Modal>
    </Wrapper>
  );
};

export default StatisticsManagementPage;
