import React from "react";
import { Input, Select, DatePicker, Space } from "antd";
const { Search } = Input;
const { RangePicker } = DatePicker;

const OrderFilter = ({ onSearch, onStatusChange, onDateRangeChange }) => {
  return (
    <Space style={{ marginBottom: 16 }} wrap>
      <Search
        placeholder="Tìm theo mã đơn hoặc tên khách hàng"
        allowClear
        onSearch={onSearch}
        style={{ width: 300 }}
      />

      <Select
        placeholder="Lọc theo trạng thái đơn"
        onChange={onStatusChange}
        allowClear
        style={{ width: 200 }}
        options={[
          { label: "Chờ duyệt", value: "pending" },
          { label: "Đã đóng gói", value: "packed" },
          { label: "Đang giao", value: "shipping" },
          { label: "Đã giao", value: "delivered" },
          { label: "Đã hủy", value: "cancelled" },
        ]}
      />

      <RangePicker
        placeholder={["Từ ngày", "Đến ngày"]}
        onChange={onDateRangeChange}
      />
    </Space>
  );
};

export default OrderFilter;
