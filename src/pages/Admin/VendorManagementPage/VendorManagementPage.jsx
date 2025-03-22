import React, { useState } from "react";
import { Wrapper } from "./style";
import { Select, Table, Tag } from "antd";

const allData = [
  {
    key: "1",
    name: "John",
    email: "john@gmail.com",
    phone: "1234567890",
    shopId: "3",
    shopName: "John Shop",
    status: "active",
    createAt: "2023-01-01",
  },
  {
    key: "2",
    name: "Alice",
    email: "alice@gmail.com",
    phone: "0987654321",
    shopId: "5",
    shopName: "Alice's Store",
    status: "inactive",
    createAt: "2023-02-15",
  },
  {
    key: "3",
    name: "Bob",
    email: "bob@gmail.com",
    phone: "1122334455",
    shopId: "7",
    shopName: "Bob's Mart",
    status: "pending",
    createAt: "2023-03-10",
  },
  {
    key: "4",
    name: "David",
    email: "david@gmail.com",
    phone: "2233445566",
    shopId: "10",
    shopName: "David's Store",
    status: "active",
    createAt: "2023-05-20",
  },
];

const columns = [
  {
    title: "ID",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Shop ID",
    dataIndex: "shopId",
  },
  {
    title: "Shop Name",
    dataIndex: "shopName",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => {
      let color =
        status === "active"
          ? "green"
          : status === "inactive"
          ? "red"
          : "orange";
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
  {
    title: "Create At",
    dataIndex: "createAt",
    sorter: (a, b) => new Date(a.createAt) - new Date(b.createAt),
    render: (date) => new Date(date).toLocaleDateString("vi-VN"),
  },
];

const options = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const labelRender = (option) => (
  <span
    style={{
      color:
        option.value === "pending"
          ? "orange"
          : option.value === "inactive"
          ? "red"
          : option.value === "active"
          ? "green"
          : "black",
    }}
  >
    {option.label}
  </span>
);

const VendorManagementPage = () => {
  // selectedStatus,
  const [setSelectedStatus] = useState("all");
  const [filteredData, setFilteredData] = useState(allData);

  const handleFilterChange = (value) => {
    setSelectedStatus(value);
    if (value === "all") {
      setFilteredData(allData);
    } else {
      setFilteredData(allData.filter((item) => item.status === value));
    }
  };

  return (
    <Wrapper>
      <h1 style={{ marginBottom: "30px" }}>Cộng tác viên</h1>
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
            alignItems: "center",
            margin: "30px 0px",
          }}
        >
          <h2>Danh sách Cộng tác viên</h2>
          <div>
            <Select
              labelRender={labelRender}
              defaultValue="all"
              style={{ width: "120px" }}
              options={options}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <div>
          <Table columns={columns} dataSource={filteredData} />
        </div>
      </div>
    </Wrapper>
  );
};

export default VendorManagementPage;
