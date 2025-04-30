import React, { useState } from 'react';
import { Table, Tag, Space, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import OrderFilter from '../../../components/VendorComponents/OrderFilter/OrderFilter';

const OrderReview = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateRange, setDateRange] = useState([]);

  const handleSearch = (value) => {
    setSearchText(value);
    // Gọi API hoặc lọc dữ liệu
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    // Gọi API hoặc lọc dữ liệu
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    // Gọi API hoặc lọc dữ liệu
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Chờ duyệt"
            ? "orange"
            : status === "Đã đóng gói"
            ? "blue"
            : status === "Đang giao hàng"
            ? "green"
            : "default";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => {
        const handleMenuClick = (e) => {
          console.log(`Cập nhật đơn ${record.orderId} sang trạng thái:`, e.key);
          // Bạn có thể gọi API cập nhật trạng thái tại đây
        };

        const menu = (
          <Menu onClick={handleMenuClick}>
            <Menu.Item key="Đã đóng gói">Đã đóng gói</Menu.Item>
            <Menu.Item key="Đang giao hàng">Đang giao hàng</Menu.Item>
          </Menu>
        );

        return (
          <Space size="middle">
            <Button type="primary">Duyệt</Button>
            <Dropdown overlay={menu}>
              <Button>
                Cập nhật <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  const data = [
    {
      key: "1",
      orderId: "DH001",
      customerName: "Nguyễn Văn A",
      orderDate: "2025-04-10",
      status: "Chờ duyệt",
    },
    {
      key: "2",
      orderId: "DH002",
      customerName: "Trần Thị B",
      orderDate: "2025-04-09",
      status: "Đã đóng gói",
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Duyệt đơn hàng</h2>
      <OrderFilter
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onDateRangeChange={handleDateRangeChange}
      />
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default OrderReview;