import { Button, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Wrapper } from "./style";
import * as ValidateToken from "../../../utils/tokenUtils";
import * as VoucherServices from "../../../services/admin/VoucherServices";
import dayjs from "dayjs";

const VoucherPage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const handleFilterChange = (value) => {
    setSelectedStatus(value);
  };

  const columns = [
    {
      title: "Voucher Name",
      dataIndex: "voucherName",
      key: "voucherName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (active) =>
        active ? (
          <span style={{ color: "green" }}>Đang hoạt động</span>
        ) : (
          <span style={{ color: "red" }}>Không hoạt động</span>
        ),
    },
  ];

  const filteredVouchers = vouchers.filter((item) => {
    if (selectedStatus === "all") return true;
    if (selectedStatus === "active") return item.isActive === true;
    if (selectedStatus === "inactive") return item.isActive === false;
    return true;
  });

  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const accessToken = await ValidateToken.getValidAccessToken();
        const res = await VoucherServices.getVouchers(accessToken);

        setVouchers(res.vouchers);
      } catch (error) {
        console.error("Lỗi khi lấy voucher:", error);
      }
    };

    fetchVoucher();
  }, []);

  const handleRowClick = (record) => {
    setSelectedVoucher(record);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedVoucher(null);
  };

  return (
    <Wrapper>
      <h3>Quản lý voucher</h3>
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
          <h5>Danh sách voucher</h5>
          <Select
            value={selectedStatus}
            style={{ width: "120px" }}
            onChange={handleFilterChange}
            options={[
              { value: "all", label: "Tất cả" },
              { value: "active", label: "Đang hoạt động" },
              { value: "inactive", label: "Không hoạt động" },
            ]}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredVouchers}
          pagination={{ pageSize: 8 }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </div>

      <Modal
        title="Chi tiết Voucher"
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Đóng
          </Button>,
        ]}
      >
        {selectedVoucher && (
          <div>
            <p>
              <strong>Mã voucher:</strong> {selectedVoucher.voucherName}
            </p>
            <p>
              <strong>Mô tả:</strong> {selectedVoucher.description}
            </p>
            <p>
              <strong>Danh mục:</strong> {selectedVoucher.category}
            </p>
            <p>
              <strong>Loại:</strong>{" "}
              {selectedVoucher.type === "percentage"
                ? "Giảm %"
                : "Giảm cố định"}
            </p>
            <p>
              <strong>Giá trị:</strong>{" "}
              {selectedVoucher.type === "percentage"
                ? `${selectedVoucher.value}%`
                : `${selectedVoucher.value.toLocaleString()}đ`}
            </p>
            {selectedVoucher.maxDiscount && (
              <p>
                <strong>Giảm tối đa:</strong>{" "}
                {selectedVoucher.maxDiscount.toLocaleString()}đ
              </p>
            )}
            <p>
              <strong>Giá trị đơn tối thiểu:</strong>{" "}
              {selectedVoucher.minOrderValue?.toLocaleString()}đ
            </p>
            <p>
              <strong>Giới hạn lượt dùng:</strong> {selectedVoucher.usageLimit}
            </p>
            <p>
              <strong>Thời gian bắt đầu:</strong>{" "}
              {dayjs(selectedVoucher.startDate).format("DD/MM/YYYY HH:mm")}
            </p>
            <p>
              <strong>Thời gian kết thúc:</strong>{" "}
              {dayjs(selectedVoucher.endDate).format("DD/MM/YYYY HH:mm")}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {selectedVoucher.isActive ? (
                <span style={{ color: "green" }}>Đang hoạt động</span>
              ) : (
                <span style={{ color: "red" }}>Không hoạt động</span>
              )}
            </p>
          </div>
        )}
      </Modal>
    </Wrapper>
  );
};

export default VoucherPage;
