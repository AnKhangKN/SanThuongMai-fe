import React, { useEffect, useState } from "react";
import { Table, Select, Modal, Button, message, Input } from "antd";
import { Wrapper } from "./style";
import * as CategoryServices from "../../../services/admin/CategoryServices";
import * as ValidateToken from "../../../utils/tokenUtils";

const CategoryManagementPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [modalAddCategories, setModalAddCategories] = useState(false);

  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    description: "",
    vat: "",
    platformFee: "",
    typeFees: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const accessToken = await ValidateToken.getValidAccessToken();
      const res = await CategoryServices.getAllCategory(accessToken);
      setCategories(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
      message.error("Không thể lấy danh mục");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCategory = async () => {
    const { categoryName, description, vat, platformFee, typeFees } =
      newCategory;
    if (!categoryName || !vat || !platformFee || !typeFees) {
      return message.warning("Vui lòng nhập đầy đủ thông tin bắt buộc");
    }

    try {
      const accessToken = await ValidateToken.getValidAccessToken();
      await CategoryServices.createCategory(accessToken, {
        ...newCategory,
        vat: Number(vat),
        platformFee: Number(platformFee),
      });
      message.success("Thêm danh mục thành công");
      setModalAddCategories(false);
      setNewCategory({
        categoryName: "",
        description: "",
        vat: "",
        platformFee: "",
        typeFees: "",
      });
      fetchCategories();
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
      message.error("Không thể thêm danh mục");
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const accessToken = await ValidateToken.getValidAccessToken();
      const res = await CategoryServices.updateCategory(accessToken, {
        categoryId: selectedCategory._id,
        ...selectedCategory,
      });

      if (res.status === 200) {
        message.success("Cập nhật danh mục thành công");
        setModalVisible(false);
        fetchCategories();
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
      message.error("Không thể cập nhật danh mục");
    }
  };

  const handleFilterChange = (value) => {
    setSelectedStatus(value);
  };

  const handleRowClick = (record) => {
    setSelectedCategory({ ...record }); // clone để sửa
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedCategory(null);
  };

  const convertStatus = (status) => (status ? "Hoạt động" : "Không hoạt động");

  const filteredData = categories.filter((item) => {
    if (selectedStatus === "all") return true;
    return item.isActive === selectedStatus;
  });

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
    { title: "VAT", dataIndex: "vat", key: "vat" },
    { title: "Phí nền tảng", dataIndex: "platformFee", key: "platformFee" },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (status) => convertStatus(status),
    },
  ];

  return (
    <Wrapper>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Quản lý Danh mục</h3>
        <Button type="primary" onClick={() => setModalAddCategories(true)}>
          Thêm danh mục mới
        </Button>
      </div>

      {/* Modal tạo danh mục mới */}
      <Modal
        title="Thêm danh mục mới"
        open={modalAddCategories}
        onCancel={() => setModalAddCategories(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalAddCategories(false)}>
            Đóng
          </Button>,
          <Button key="save" type="primary" onClick={handleCreateCategory}>
            Lưu thay đổi
          </Button>,
        ]}
      >
        <Input
          name="categoryName"
          placeholder="Tên danh mục"
          value={newCategory.categoryName}
          onChange={handleInputChange}
          style={{ marginBottom: 10 }}
        />
        <Input
          name="description"
          placeholder="Mô tả"
          value={newCategory.description}
          onChange={handleInputChange}
          style={{ marginBottom: 10 }}
        />
        <Input
          name="vat"
          type="number"
          placeholder="VAT (%)"
          value={newCategory.vat}
          onChange={handleInputChange}
          style={{ marginBottom: 10 }}
        />
        <Input
          name="platformFee"
          type="number"
          placeholder="Phí nền tảng (%)"
          value={newCategory.platformFee}
          onChange={handleInputChange}
          style={{ marginBottom: 10 }}
        />
        <Select
          placeholder="Loại phí"
          value={newCategory.typeFees}
          onChange={(value) =>
            setNewCategory((prev) => ({ ...prev, typeFees: value }))
          }
          style={{ width: "100%" }}
        >
          <Select.Option value="percent">Phần trăm</Select.Option>
          <Select.Option value="fixed">Cố định</Select.Option>
        </Select>
      </Modal>

      {/* Bộ lọc và bảng */}
      <div
        style={{
          marginTop: 20,
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 5,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <h5>Danh sách danh mục</h5>
          <Select
            value={selectedStatus}
            style={{ width: 200 }}
            onChange={handleFilterChange}
            options={[
              { value: "all", label: "Tất cả" },
              { value: true, label: "Hoạt động" },
              { value: false, label: "Không hoạt động" },
            ]}
          />
        </div>

        <Table
          rowKey={(record) => record._id}
          bordered
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </div>

      {/* Modal cập nhật danh mục */}
      <Modal
        title="Chỉnh sửa danh mục"
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Đóng
          </Button>,
          <Button key="save" type="primary" onClick={handleUpdateCategory}>
            Lưu thay đổi
          </Button>,
        ]}
      >
        {selectedCategory && (
          <>
            <Input
              name="categoryName"
              value={selectedCategory.categoryName}
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  categoryName: e.target.value,
                })
              }
              style={{ marginBottom: 10 }}
            />
            <Input
              name="description"
              value={selectedCategory.description}
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  description: e.target.value,
                })
              }
              style={{ marginBottom: 10 }}
            />
            <Input
              name="vat"
              type="number"
              value={selectedCategory.vat}
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  vat: e.target.value,
                })
              }
              style={{ marginBottom: 10 }}
            />
            <Input
              name="platformFee"
              type="number"
              value={selectedCategory.platformFee}
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  platformFee: e.target.value,
                })
              }
              style={{ marginBottom: 10 }}
            />
            <Select
              value={selectedCategory.typeFees}
              onChange={(value) =>
                setSelectedCategory({ ...selectedCategory, typeFees: value })
              }
              style={{ width: "100%", marginBottom: 10 }}
            >
              <Select.Option value="percent">Phần trăm</Select.Option>
              <Select.Option value="fixed">Cố định</Select.Option>
            </Select>
            <Select
              value={selectedCategory.isActive}
              onChange={(value) =>
                setSelectedCategory({ ...selectedCategory, isActive: value })
              }
              style={{ width: "100%" }}
            >
              <Select.Option value={true}>Hoạt động</Select.Option>
              <Select.Option value={false}>Không hoạt động</Select.Option>
            </Select>
          </>
        )}
      </Modal>
    </Wrapper>
  );
};

export default CategoryManagementPage;
