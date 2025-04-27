import React, { useState } from "react";
import { Card, Col, Row, Statistic, Select, Table } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const { Option } = Select;

const IncomeStatistics = () => {
  const [timeFilter, setTimeFilter] = useState("month");

  const dataChart = [
    { month: "Tháng 1", revenue: 500000 },
    { month: "Tháng 2", revenue: 1200000 },
    { month: "Tháng 3", revenue: 900000 },
    { month: "Tháng 4", revenue: 1800000 },
  ];

  const columns = [
    { title: "Mã đơn", dataIndex: "orderId", key: "orderId" },
    { title: "Khách hàng", dataIndex: "customer", key: "customer" },
    { title: "Tổng tiền", dataIndex: "total", key: "total" },
    { title: "Ngày", dataIndex: "date", key: "date" },
  ];

  const dataTable = [
    {
      key: 1,
      orderId: "DH001",
      customer: "Nguyễn Văn A",
      total: "1.200.000₫",
      date: "2025-04-09",
    },
    {
      key: 2,
      orderId: "DH002",
      customer: "Trần Thị B",
      total: "950.000₫",
      date: "2025-04-08",
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Tổng doanh thu" value={5200000} suffix="₫" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Số đơn hàng" value={68} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Doanh thu hôm nay" value={820000} suffix="₫" />
          </Card>
        </Col>
      </Row>

      <Card
        style={{ marginTop: 24 }}
        title="Biểu đồ doanh thu theo tháng"
        extra={
          <Select value={timeFilter} onChange={setTimeFilter}>
            <Option value="today">Hôm nay</Option>
            <Option value="week">Tuần này</Option>
            <Option value="month">Tháng này</Option>
          </Select>
        }
      >
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={dataChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#1890ff" label={{ position: "top" }} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Danh sách đơn hàng gần đây" style={{ marginTop: 24 }}>
        <Table
          columns={columns}
          dataSource={dataTable}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default IncomeStatistics;
