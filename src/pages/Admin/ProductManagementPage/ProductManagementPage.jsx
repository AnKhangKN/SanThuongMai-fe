import React, { useCallback, useEffect, useState } from "react";
import { Wrapper } from "./style";
import { Select, Table, Tag, Tooltip, Modal, Button, message } from "antd";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import * as AuthServices from "../../../services/shared/AuthServices";
import * as ProductServices from "../../../services/admin/ProductServices";

const columns = [
  {
    title: "Mã sản phẩm",
    dataIndex: "_id",
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
          {text?.toString().slice(0, 10)}...
        </div>
      </Tooltip>
    ),
    ellipsis: true,
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "product_name",
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
    ellipsis: true,
  },
  {
    title: "Danh mục",
    dataIndex: "category",
    key: "category",
    ellipsis: true,
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
    title: "Chủ shop",
    dataIndex: "user_id",
    key: "user_name",
    render: (user_id) => {
      return user_id ? user_id.user_name : "Chưa có thông tin";
    },
    ellipsis: true,
  },
];

const ProductManagementPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [tempStatus, setTempStatus] = useState("");

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  const fetchShops = useCallback(async () => {
    try {
      let { storageData, decoded } = handleDecoded();

      let accessToken = storageData;

      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        accessToken = res?.access_token;
        localStorage.setItem("access_token", JSON.stringify(accessToken));
      }

      const res = await ProductServices.getAllProducts(accessToken);


      const productsWithKeys = res.data.map((product) => ({
        ...product,
        key: product._id || product.id,
      }));


      setAllData(productsWithKeys);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  }, []); // Dùng useCallback để ghi nhớ hàm fetchShops

  useEffect(() => {
    fetchShops(); // Gọi fetchShops khi component mount
  }, [fetchShops]);

  useEffect(() => {
    if (selectedStatus === "all") {
      setFilteredData(allData);
    } else {
      setFilteredData(allData.filter((item) => item.status === selectedStatus));
    }
  }, [allData, selectedStatus]);

  const handleFilterChange = (value) => {
    setSelectedStatus(value);
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

  const handleSave = async () => {
    try {
      let { storageData, decoded } = handleDecoded();
      let accessToken = storageData;

      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        accessToken = res?.access_token;
        localStorage.setItem("access_token", JSON.stringify(accessToken));
      }

      // Sử dụng tempStatus để cập nhật
      await ProductServices.partialUpdateProduct(
        selectedProduct.key, // ID sản phẩm được chọn
        tempStatus, // Trạng thái mới
        accessToken // Token hợp lệ
      );

      const updateProductStatus = allData.map((product) =>
        product.key === selectedProduct.key
          ? {
              ...product,
              status: tempStatus, // Cập nhật trạng thái mới
            }
          : product
      );

      setAllData(updateProductStatus); // Cập nhật danh sách trong state
      setModalVisible(false); // Ẩn modal
      message.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      message.error("Đã có lỗi xảy ra khi cập nhật trạng thái.");
    }
  };

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
          rowKey="key"
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
            Lưu thay đổi
          </Button>,
        ]}
      >
        {selectedProduct && (
          <div>
            <p>
              <strong>Tên sản phẩm:</strong> {selectedProduct.product_name}
            </p>
            <p>
              <strong>Trạng thái hiện tại:</strong> {selectedProduct.status}
            </p>
            <Select
              value={tempStatus}
              onChange={handleStatusChange}
              style={{ width: "100%" }}
            >
              <Select.Option value="active">Hoạt động</Select.Option>
              <Select.Option value="inactive">Không hoạt động</Select.Option>
              <Select.Option value="pending">Chờ duyệt</Select.Option>
            </Select>
          </div>
        )}
      </Modal>
    </Wrapper>
  );
};

export default ProductManagementPage;
