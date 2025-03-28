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

  const handleFilterChange = (value) => {
    setSelectedStatus(value);
    if (value === "all") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.status === value));
    }
  };

  const handleRowClick = (record) => {
    setSelectedProduct({ ...record }); // copy object tránh mutate trực tiếp
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleStatusChange = (value) => {
    setSelectedProduct((prev) => ({ ...prev, status: value }));
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
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
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
      <h1>Quản lý sản phẩm</h1>
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
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
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
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
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
          <Button key="save" type="primary">
            Lưu
          </Button>,
        ]}
      >
        {selectedProduct && (
          <div>
            <p>
              <strong>ID:</strong>{" "}
              <Tooltip title={selectedProduct.id}>
                <div
                  style={{
                    maxWidth: 150,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                    verticalAlign: "middle",
                  }}
                >
                  {selectedProduct.id}
                </div>
              </Tooltip>
            </p>
            <p>
              <strong>Tên:</strong>{" "}
              <Tooltip title={selectedProduct.name}>
                <div
                  style={{
                    maxWidth: 150,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                    verticalAlign: "middle",
                  }}
                >
                  {selectedProduct.name}
                </div>
              </Tooltip>
            </p>
            <p>
              <strong>Danh mục:</strong> {selectedProduct.category}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              <Select
                value={selectedProduct.status}
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
