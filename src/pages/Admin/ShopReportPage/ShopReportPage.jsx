import React, { useCallback, useEffect, useState } from "react";
import { Wrapper } from "./style";
import { Modal, Select, Table, Tag, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { jwtDecode } from "jwt-decode";
import { isJsonString } from "../../../utils";
import * as AuthServices from "../../../services/shared/AuthServices";
import * as ShopServices from "../../../services/admin/ShopServices";

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

const ShopReportPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [tempStatus, setTempStatus] = useState("");
  const [dataSource, setDataSource] = useState([]); // thêm state này

  // const handleDecoded = () => {
  //   let storageData = localStorage.getItem("access_token");
  //   let decoded = {};
  //   if (storageData && isJsonString(storageData)) {
  //     storageData = JSON.parse(storageData);
  //     decoded = jwtDecode(storageData);
  //   }
  //   return { decoded, storageData };
  // };

  // const fetchReportedShops = useCallback(async () => {
  //   try {
  //     let { storageData, decoded } = handleDecoded();

  //     let accessToken = storageData;

  //     if (decoded?.exp < Date.now() / 1000) {
  //       const res = await AuthServices.refreshToken();
  //       accessToken = res?.access_token;
  //       localStorage.setItem("access_token", JSON.stringify(accessToken));
  //     }

  //     // const res = await ShopServices.getAllReportedShops(accessToken);

  //     const shopsWithKeys = res.data.map((shop) => ({
  //       ...shop,
  //       key: shop._id || shop.id,
  //     }));

  //     setDataSource(shopsWithKeys); // sửa lại hàm này
  //   } catch (error) {
  //     console.error("Lỗi khi lấy sản phẩm:", error);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchReportedShops();
  // }, [fetchReportedShops]);

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
      <h3>Quản lý vi phạm</h3>
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
          <h5>Danh sách cửa hàng vi phạm</h5>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="key"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </div>

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
              <strong>Trạng thái shop:</strong>{" "}
              <Select
                value="Ngưng hoạt động"
                style={{ width: 200 }}
                options={[
                  { value: "Ngưng hoạt động", label: "Ngưng hoạt động" },
                ]}
              />
            </div>

            <img
              src={selectedProduct.images}
              alt="product"
              style={{ width: "100%", borderRadius: 4 }}
            />
            <div>
              <strong>Cảnh báo shop:</strong>
              <TextArea rows={4} />
            </div>
          </div>
        )}
      </Modal>
    </Wrapper>
  );
};

export default ShopReportPage;
