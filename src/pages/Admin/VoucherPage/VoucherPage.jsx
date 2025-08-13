import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  DatePicker,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { Wrapper } from "./style";
import * as ValidateToken from "../../../utils/tokenUtils";
import * as VoucherServices from "../../../services/admin/VoucherServices";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const VoucherPage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Modal chi tiết voucher
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  // Modal thêm voucher mới
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleFilterChange = (value) => {
    setSelectedStatus(value);
  };

  const fetchVoucher = async () => {
    try {
      const accessToken = await ValidateToken.getValidAccessToken();
      const res = await VoucherServices.getVouchers(accessToken);
      setVouchers(res.vouchers);
    } catch (error) {
      console.error("Lỗi khi lấy voucher:", error);
    }
  };

  useEffect(() => {
    fetchVoucher();
  }, []);

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

  const handleRowClick = (record) => {
    setSelectedVoucher(record);
    setDetailModalVisible(true);
  };

  const handleDetailModalCancel = () => {
    setDetailModalVisible(false);
    setSelectedVoucher(null);
  };

  const handleAddNew = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleAddModalCancel = () => {
    setAddModalVisible(false);
  };

  const onFinish = async (values) => {
    const data = {
      voucherName: values.voucherName,
      description: values.description,
      category: values.category,
      type: values.type,
      value: values.value,
      maxDiscount: values.maxDiscount,
      minOrderValue: values.minOrderValue,
      usageLimit: values.usageLimit,
      startDate: values.dateRange[0].toISOString(),
      endDate: values.dateRange[1].toISOString(),
    };

    try {
      const accessToken = await ValidateToken.getValidAccessToken();
      await VoucherServices.createVoucher(accessToken, data);
      message.success("Thêm voucher thành công!");
      fetchVoucher();
      setAddModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Thêm voucher thất bại!");
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Quản lý voucher</h3>
        <button onClick={handleAddNew}>Thêm voucher mới</button>
      </div>
      <div
        style={{
          backgroundColor: "#fff",
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
          <h5>Danh sách voucher</h5>
          <Select
            value={selectedStatus}
            style={{ width: 120 }}
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
          rowKey={(record) => record._id}
        />
      </div>

      {/* Modal chi tiết voucher */}
      <Modal
        title="Chi tiết Voucher"
        open={detailModalVisible}
        onCancel={handleDetailModalCancel}
        footer={[
          <Button key="cancel" onClick={handleDetailModalCancel}>
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

      {/* Modal thêm voucher mới */}
      <Modal
        title="Thêm voucher mới"
        open={addModalVisible}
        onCancel={handleAddModalCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ type: "percentage" }}
        >
          <Form.Item
            label="Voucher Name"
            name="voucherName"
            rules={[{ required: true, message: "Vui lòng nhập tên voucher" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Vui lòng chọn loại voucher" }]}
          >
            <Select
              options={[
                { label: "Giảm %", value: "percentage" },
                { label: "Giảm cố định", value: "fixed" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Value"
            name="value"
            rules={[{ required: true, message: "Vui lòng nhập giá trị" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Max Discount" name="maxDiscount">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Min Order Value" name="minOrderValue">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Usage Limit" name="usageLimit">
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Start and End Date"
            name="dateRange"
            rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
          >
            <RangePicker showTime format="DD/MM/YYYY HH:mm" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Thêm
            </Button>
            <Button onClick={handleAddModalCancel}>Hủy</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
};

export default VoucherPage;
