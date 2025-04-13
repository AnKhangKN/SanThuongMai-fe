import React, { useState } from "react";
import { Wrapper } from "./style";
import { Select, Table, Tag, Tooltip, Modal, Button } from "antd";

const data = [
  {
    id: 1123131736183761872361873612738612783617894824028409328,
    name: "Áo thun namkajfsfaoejfakdfjosaiefjafkdsdsajfldksjfalsjflakfjsljslkafjdlskfjaslkdfjkls",
    category: "Thời trang",
    images: "https://via.placeholder.com/80",
    status: "active",
    shopId: 101,
  },
  {
    id: 2,
    name: "Giày thể thao",
    category: "Giày dép",
    images: "https://via.placeholder.com/80",
    status: "inactive",
    shopId: 102,
  },
];

const ProductManagementPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredData, setFilteredData] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [tempStatus, setTempStatus] = useState("");

  const handleFilterChange = (value) => {
    setSelectedStatus(value);
    setFilteredData(
      value === "all" ? data : data.filter((item) => item.status === value)
    );
  };

  const handleRowClick = (record) => {
    setSelectedProduct({ ...record });
    setTempStatus(record.status);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleStatusChange = (value) => {
    setTempStatus(value);
  };

  const handleSave = () => {
    setFilteredData((prevData) =>
      prevData.map((item) =>
        item.id === selectedProduct.id ? { ...item, status: tempStatus } : item
      )
    );
    setModalVisible(false);
  };

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      render: (text) => (
        <Tooltip title={text}>
          <div
            style={{
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {text.toString().slice(0, 10)}...
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Tooltip title={text}>
          <div
            style={{
              maxWidth: 150,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
      render: (image) => (
        <img src={image} alt="product" style={{ width: 80, borderRadius: 4 }} />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "active"
            ? "green"
            : status === "inactive"
            ? "red"
            : "orange";
        return (
          <Tooltip title={`Trạng thái: ${status}`}>
            <Tag color={color}>{status.toUpperCase()}</Tag>
          </Tooltip>
        );
      },
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Mã shop",
      dataIndex: "shopId",
      key: "shopId",
    },
  ];

  return (
    <Wrapper>
      <h3>Quản lý sản phẩm</h3>
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
            marginBottom: "20px",
          }}
        >
          <h5>Danh sách sản phẩm</h5>
          <Select
            value={selectedStatus}
            style={{ width: 200 }}
            options={[
              { value: "all", label: "Tất cả" },
              { value: "active", label: "Hoạt động" },
              { value: "inactive", label: "Không hoạt động" },
              { value: "pending", label: "Chờ duyệt" },
            ]}
            onChange={handleFilterChange}
          />
        </div>
        <Table
          bordered
          rowKey="id"
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          onRow={(record) => ({ onClick: () => handleRowClick(record) })}
        />
      </div>
      <Modal
        title="Thông tin sản phẩm"
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Đóng
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Lưu
          </Button>,
        ]}
      >
        {selectedProduct && (
          <div>
            <p>
              <strong>ID:</strong> {selectedProduct.id}
            </p>
            <p>
              <strong>Tên:</strong> {selectedProduct.name}
            </p>
            <p>
              <strong>Danh mục:</strong> {selectedProduct.category}
            </p>
            <p>
              <strong>Trạng thái:</strong>
              <Select
                value={tempStatus}
                style={{ width: 200 }}
                options={[
                  { value: "active", label: "Hoạt động" },
                  { value: "inactive", label: "Không hoạt động" },
                  { value: "pending", label: "Chờ duyệt" },
                ]}
                onChange={handleStatusChange}
              />
            </p>
            <p>
              <strong>Mã Shop:</strong> {selectedProduct.shopId}
            </p>
            <img
              src={selectedProduct.images}
              alt="product"
              style={{ width: "100%", borderRadius: 4 }}
            />
          </div>
        )}
      </Modal>
    </Wrapper>
  );
};

export default ProductManagementPage;
