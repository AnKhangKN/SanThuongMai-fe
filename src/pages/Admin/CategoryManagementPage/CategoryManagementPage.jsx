import React, { useEffect, useState } from "react";
import { Table, Select, Modal, Button, message } from "antd";
import { Wrapper } from "./style";
import * as CategoryServices from "../../../services/admin/CategoryServices";
import * as ValidateToken from "../../../utils/tokenUtils";

const CategoryManagementPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [tempStatus, setTempStatus] = useState("");
  const [categories, setCategories] = useState([]);
  const [modalAddCategories, setModalAddCategories] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const accessToken = await ValidateToken.getValidAccessToken();
      const res = await CategoryServices.getAllCategory(accessToken);

      const formatted = res.data.map((cat) => ({
        ...cat,
        key: cat._id,
        vat: `${cat.vat}%`,
        platformFee: `${cat.platformFee}%`,
        otherFees:
          (cat.otherFees || [])
            .filter((fee) => fee.isActiveOtherFee)
            .map((fee) => `${fee.feeName}: ${fee.value}đ`)
            .join(", ") || "Không có",
        isActive: convertStatus(cat.isActive),
      }));

      setCategories(formatted);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
      message.error("Không thể lấy danh mục");
    }
  };

  const handleCreateCategories = async () => {
    try {
      const accessToken = await ValidateToken.getValidAccessToken();

      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const convertStatus = (status) => {
    if (status === true || status === "active") return "Hoạt động";
    if (status === false || status === "inactive") return "Không hoạt động";
    if (status === "pending") return "Chờ duyệt";
    return status;
  };

  const getStatusValue = (statusText) => {
    if (statusText === "Hoạt động") return "active";
    if (statusText === "Không hoạt động") return "inactive";
    if (statusText === "Chờ duyệt") return "pending";
    return "";
  };

  const filteredData = categories.filter((item) => {
    if (selectedStatus === "all") return true;
    return item.isActive === convertStatus(selectedStatus);
  });

  const handleFilterChange = (value) => {
    setSelectedStatus(value);
  };

  const handleRowClick = (record) => {
    setSelectedProduct(record);
    setTempStatus(getStatusValue(record.isActive));
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleStatusChange = (value) => {
    setTempStatus(value);
  };

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
      ellipsis: true,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "VAT",
      dataIndex: "vat",
      key: "vat",
    },
    {
      title: "Phí nền tảng",
      dataIndex: "platformFee",
      key: "platformFee",
    },
    {
      title: "Phí khác",
      dataIndex: "otherFees",
      key: "otherFees",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
    },
  ];

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>Quản lý Danh mục</h3>
        <button onClick={() => setModalAddCategories(true)}>
          Thêm danh mục mới
        </button>

        <Modal
          title="Thêm danh mục mới"
          open={modalAddCategories}
          onCancel={() => setModalAddCategories(false)}
          footer={[
            <Button key="cancel" onClick={() => setModalAddCategories(false)}>
              Đóng
            </Button>,
            <Button key="save" type="primary">
              Lưu thay đổi
            </Button>,
          ]}
        >
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </Modal>
      </div>

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
          <h5>Danh sách danh mục</h5>
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
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </div>

      <Modal
        title="Thông tin danh mục"
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Đóng
          </Button>,
          <Button key="save" type="primary">
            Lưu thay đổi
          </Button>,
        ]}
      >
        {selectedProduct && (
          <div>
            <p>
              <strong>Tên danh mục:</strong> {selectedProduct.categoryName}
            </p>
            <p>
              <strong>Trạng thái hiện tại:</strong> {selectedProduct.isActive}
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

export default CategoryManagementPage;
