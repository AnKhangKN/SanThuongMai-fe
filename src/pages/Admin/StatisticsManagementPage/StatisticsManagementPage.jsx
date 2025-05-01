import React, { useCallback, useEffect, useState } from "react";
import { Wrapper } from "./style";
import {
  Button,
  Modal,
  Table,
  Tag,
  Select,
  Input,
  message,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { jwtDecode } from "jwt-decode";
import * as AuthServices from "../../../services/shared/AuthServices";
import * as PlatformServices from "../../../services/admin/PlatformFeeServices";
import { isJsonString } from "../../../utils";

dayjs.extend(customParseFormat);

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
  const [feeData, setFeeData] = useState([]);
  const [newFee, setNewFee] = useState({
    fee_name: "",
    fee_type: "fixed",
    value: "",
    description: "",
    status: "active",
    effective_from: dayjs().format("YYYY-MM-DD"),
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

  const fetchFee = useCallback(async () => {
    try {
      const token = await handleDecoded();
      const res = await PlatformServices.getAllFees(token);
      const feeWithKeys = res.data.map((fee) => ({ ...fee, key: fee._id }));
      setFeeData(feeWithKeys);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  }, []);

  useEffect(() => {
    fetchFee();
  }, [fetchFee]);

  const createFee = async () => {
    const { fee_name, fee_type, value, description } = newFee;

    if (!fee_name || !fee_type || !value || !description) {
      return message.error("Hãy điền đầy đủ thông tin!");
    }

    if (isNaN(Number(value))) {
      return message.error("Giá trị phải là số hợp lệ!");
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
          status: "active",
          effective_from: dayjs().format("YYYY-MM-DD"),
        });
      }
    } catch (error) {
      console.error("Lỗi khi tạo chi phí:", error);
      message.error("Tạo chi phí thất bại!");
    }
  };

  const handleRowClick = (record) => {
    setSelectedFee(record);
    setModalVisible(true);
  };

  const handleSaveStatus = async () => {
    try {
      const token = await handleDecoded();
      const res = await PlatformServices.updateFee(
        token,
        selectedFee.key,
        selectedFee
      );
      if (res?.data) {
        const updatedData = feeData.map((item) =>
          item.key === selectedFee.key ? { ...selectedFee } : item
        );
        setFeeData(updatedData);
        setModalVisible(false);
        message.success("Cập nhật thông tin thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      message.error("Cập nhật thất bại!");
    }
  };

  return (
    <Wrapper>
      <h3>Quản lý chi phí nền tảng</h3>
      <div style={{ background: "#fff", padding: 20, borderRadius: 5 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <h5>Danh sách chi phí nền tảng</h5>
          <Button type="primary" onClick={() => setModalAddVisible(true)}>
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

      {/* Modal xem & cập nhật */}
      <Modal
        title="Cập nhật Chi phí"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveStatus}>
            Lưu
          </Button>,
        ]}
      >
        {selectedFee && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Input
              value={selectedFee.fee_name}
              onChange={(e) =>
                setSelectedFee({ ...selectedFee, fee_name: e.target.value })
              }
              placeholder="Tên chi phí"
            />
            <Select
              value={selectedFee.fee_type}
              onChange={(value) =>
                setSelectedFee({ ...selectedFee, fee_type: value })
              }
              options={FEE_TYPES}
            />
            <Input
              value={selectedFee.value}
              onChange={(e) =>
                setSelectedFee({ ...selectedFee, value: e.target.value })
              }
              placeholder="Giá trị"
            />
            <Input
              value={selectedFee.description}
              onChange={(e) =>
                setSelectedFee({ ...selectedFee, description: e.target.value })
              }
              placeholder="Mô tả"
            />
            <DatePicker
              value={dayjs(selectedFee.effective_from)}
              onChange={(date) =>
                setSelectedFee({
                  ...selectedFee,
                  effective_from: date.format("YYYY-MM-DD"),
                })
              }
            />
            <Select
              value={selectedFee.status}
              onChange={(value) =>
                setSelectedFee({ ...selectedFee, status: value })
              }
              options={STATUS_OPTIONS}
            />
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
          <Input
            value={newFee.fee_name}
            onChange={(e) => setNewFee({ ...newFee, fee_name: e.target.value })}
            placeholder="Tên chi phí"
          />
          <Select
            value={newFee.fee_type}
            onChange={(value) => setNewFee({ ...newFee, fee_type: value })}
            options={FEE_TYPES}
          />
          <Input
            value={newFee.value}
            onChange={(e) => setNewFee({ ...newFee, value: e.target.value })}
            placeholder="Giá trị"
          />
          <Input
            value={newFee.description}
            onChange={(e) =>
              setNewFee({ ...newFee, description: e.target.value })
            }
            placeholder="Mô tả"
          />

          <DatePicker
            value={dayjs(newFee.effective_from)}
            format={{
              format: "YYYY-MM-DD",
              type: "mask",
            }}
            onChange={(date) =>
              setNewFee({
                ...newFee,
                effective_from: date.format("YYYY-MM-DD"),
              })
            }
            showToday={false}
          />
        </div>
      </Modal>
    </Wrapper>
  );
};

export default StatisticsManagementPage;
