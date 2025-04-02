import { Table, Tag, Modal, Button, Select } from "antd";
import React, { useState } from "react";

const ProductFeedbackList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      key: "1",
      productId: "SP123",
      productName: "Chuột gaming",
      date: "2024-03-30",
      status: "Chưa xử lý",
      report: "Sản phẩm không đúng mô tả",
    },
    {
      key: "2",
      productId: "SP124",
      productName: "Bàn phím cơ",
      date: "2024-03-29",
      status: "Đã xử lý",
      report: "Sản phẩm bị lỗi kỹ thuật",
    },
    {
      key: "3",
      productId: "SP125",
      productName: "Tai nghe Bluetooth",
      date: "2024-03-28",
      status: "Chưa xử lý",
      report: "Chất lượng âm thanh kém",
    },
  ]);

  const columns = [
    { title: "Mã sản phẩm", dataIndex: "productId", key: "productId" },
    { title: "Tên sản phẩm", dataIndex: "productName", key: "productName" },
    { title: "Ngày phản hồi", dataIndex: "date", key: "date" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Chưa xử lý" ? "orange" : "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const handleRowClick = (record) => {
    setSelectedProduct({ ...record });
    setIsModalOpen(true);
  };

  const handleStatusChange = (value) => {
    setSelectedProduct((prev) => ({ ...prev, status: value }));
  };

  const handleSave = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === selectedProduct.productId
          ? { ...selectedProduct }
          : product
      )
    );
    setIsModalOpen(false);
  };

  return (
    <>
      <Table
        dataSource={products}
        columns={columns}
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowClassName="clickable-row"
      />

      <Modal
        title="Chi tiết phản hồi sản phẩm"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Hủy
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Lưu
          </Button>,
        ]}
      >
        {selectedProduct && (
          <>
            <p>
              <strong>Mã sản phẩm:</strong> {selectedProduct.productId}
            </p>
            <p>
              <strong>Tên sản phẩm:</strong> {selectedProduct.productName}
            </p>
            <p>
              <strong>Ngày phản hồi:</strong> {selectedProduct.date}
            </p>
            <p>
              <strong>Nội dung báo cáo:</strong> {selectedProduct.report}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              <Select
                value={selectedProduct.status}
                onChange={handleStatusChange}
                style={{ width: 150 }}
              >
                <Select.Option value="Chưa xử lý">Chưa xử lý</Select.Option>
                <Select.Option value="Đã xử lý">Đã xử lý</Select.Option>
              </Select>
            </p>
          </>
        )}
      </Modal>
    </>
  );
};

export default ProductFeedbackList;
