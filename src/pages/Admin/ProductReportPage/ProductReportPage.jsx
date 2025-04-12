import React, { useState } from "react";
import { Wrapper } from "./style";
import { Modal, Select, Table, Tag, Button, Input } from "antd";

const { TextArea } = Input;

const ProductReportPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [tempStatus, setTempStatus] = useState("");
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "Cửa hàng A",
      status: "Chờ xử lý",
      customerId: "KH001",
      customers: "Nguyễn Văn A",
      date: "01/04/2025",
      category: "Thời trang",
      shopId: "SHOP001",
      images: "https://via.placeholder.com/300x200",
    },
    {
      key: "2",
      name: "Shop Bán Giày",
      status: "Hoàn tất",
      customerId: "KH002",
      customers: "Trần Thị B",
      date: "02/04/2025",
      category: "Giày dép",
      shopId: "SHOP002",
      images: "https://via.placeholder.com/300x200",
    },
  ]);

  const columns = [
    {
      title: "Shop",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Chờ xử lý" ? "orange" : "green";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Mã khách hàng",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customers",
      key: "customers",
    },
    {
      title: "Ngày bị báo cáo",
      dataIndex: "date",
      key: "date",
    },
  ];

  const handleRowClick = (record) => {
    setSelectedProduct(record);
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
    const updatedData = dataSource.map((item) =>
      item.key === selectedProduct.key ? { ...item, status: tempStatus } : item
    );

    setDataSource(updatedData);
    setModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <Wrapper>
      <div>Biểu đồ quản lý thống kê</div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="key"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />

      <Modal
        title="Thông tin chi tiết"
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
              <strong>Tên shop:</strong> {selectedProduct.name}
            </p>

            <p>
              <strong>Trạng thái:</strong>{" "}
              <Select
                value={tempStatus}
                style={{ width: 200 }}
                options={[
                  { value: "Chờ xử lý", label: "Chờ xử lý" },
                  { value: "Hoàn tất", label: "Hoàn tất" },
                ]}
                onChange={handleStatusChange}
              />
            </p>

            <p>
              <strong>Mã khách hàng:</strong> {selectedProduct.customerId}
            </p>
            <p>
              <strong>Tên khách hàng:</strong> {selectedProduct.customers}
            </p>
            <p>
              <strong>Mã Shop:</strong> {selectedProduct.shopId}
            </p>

            <div>
              <strong>Trạng thái shop:</strong>
              <Select
                style={{ width: 200 }}
                options={[
                  { value: "Ngưng hoạt động", label: "Ngưng hoạt động" },
                  { value: "Hoạt động", label: "Hoạt động" },
                ]}
              />
            </div>

            <img
              src={selectedProduct.images}
              alt="product"
              style={{ width: "100%", borderRadius: 4, marginTop: 16 }}
            />

            <div style={{ marginTop: 16 }}>
              <strong>Cảnh báo shop:</strong>
              <TextArea rows={4} />
            </div>
          </div>
        )}
      </Modal>
    </Wrapper>
  );
};

export default ProductReportPage;
