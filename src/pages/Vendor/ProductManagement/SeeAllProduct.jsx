import React, { useEffect, useState, useCallback } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
  Table,
  Tag,
  Tooltip,
  Select,
  Tabs,
} from "antd";
import { PlusOutlined, SearchOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import ButtonComponents from "../../../components/VendorComponents/ButtonComponents/ButtonComponents";
import InputComponent from "../../../components/VendorComponents/InputComponent/InputComponent";
import ComboboxComponent from "../../../components/VendorComponents/ComboboxComponent/ComboboxComponent";
import {
  WrapperHeaderSeeAllProduct,
  WrapperTabs,
  WrapperUnderHeaderSeeAllProduct,
} from "./StyleSeeAllProduct";
import * as ProductService from "../../../services/vendor/ProductService";
import * as AuthServices from "../../../services/shared/AuthServices";
import { isJsonString } from "../../../utils";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const SeeAllProduct = () => {
  const navigate = useNavigate();
  const { TabPane } = Tabs;
  const [productList, setProductList] = useState([]);

  const handleClickToAddProduct = () => {
    navigate("/vendor/add-product");
  };

  const handleDecoded = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded?.exp < Date.now() / 1000) {
      console.log("⚠️ Token hết hạn → gọi refreshToken");
      const res = await AuthServices.refreshToken();
      const newToken = res?.access_token;

      if (!newToken) {
        console.error("❌ Refresh thất bại");
        return null;
      }

      localStorage.setItem("access_token", newToken); // không cần stringify
      return newToken;
    }

    return token;
  } catch (err) {
    console.error("❌ Token decode lỗi:", err);
    return null;
  }
};

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const tokenHandle = await handleDecoded();

      if (!tokenHandle) {
        message.error("Không có token hợp lệ");
        return;
      }

      const response = await ProductService.getAllProducts(tokenHandle);
      console.log("📦 Product data:", response.data);
      setProductList(response.data.data);
    } catch (error) {
      message.error("❌ Không lấy được sản phẩm");
      console.error("Lỗi khi fetch:", error);
    }
  };

  fetchProducts();
}, []);

  const PriceProduct = [
    { label: "Tất cả", value: "all" },
    { label: "0 -> 100.000", value: "0-100000" },
    { label: "100.000 -> 200.000", value: "100000-200000" },
    { label: "200.000 -> 300.000", value: "200000-300000" },
    { label: "300.000 -> 400.000", value: "300000-400000" },
    { label: "400.000 -> 500.000", value: "400000-500000" },
    { label: "500.000 -> 600.000", value: "500000-600000" },
  ];

  // Cột
const columns = [
  {
    title: "Tên sản phẩm",
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: "Danh mục",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Đã bán",
    dataIndex: "soldCount",
    key: "soldCount",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      let color = "green";
      if (status === "inactive") color = "orange";
      if (status === "banned") color = "red";
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
  {
    title: "Biến thể",
    dataIndex: "priceOptions",
    key: "priceOptions",
    render: (priceOptions) => priceOptions?.length ?? 0,
  },
  // {
  //   title: "Thao tác",
  //   render: (_, record) => (
  //     <Tooltip title="Chỉnh sửa">
  //       <EditOutlined
  //         style={{ color: "blue", cursor: "pointer" }}
  //         onClick={() => navigate(`/vendor/edit-product/${record._id}`)}
  //       />
  //     </Tooltip>
  //   ),
  // },
];
  const filterProductsByStatus = (status) => {
  if (status === "all") {
    return productList;
  }
  return productList.filter((product) => product.status === status);
};

  return (
    <div>
      <WrapperHeaderSeeAllProduct>
        <h3>Sản phẩm</h3>
        <ButtonComponents
          onClick={handleClickToAddProduct}
          icon={<PlusOutlined />}
          textButton="Thêm sản phẩm"
        />
      </WrapperHeaderSeeAllProduct>

      <WrapperUnderHeaderSeeAllProduct>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <div style={{ flex: 1 }}>
          <InputComponent
            name="searchProduct"
            placeholder="Nhập tên sản phẩm"
            icon={<SearchOutlined />}
            // onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <ButtonComponents icon={<SearchOutlined />} textButton="Tìm kiếm"  />
        {/* onClick={handleSearchProduct} */}
      </div>

        <ComboboxComponent
          name="searchPriceProduct"
          label="Giá sản phẩm"
          placeholder="Chọn giá sản phẩm"
          options={PriceProduct}
          // onChange={handlePriceChange}
        />
      </WrapperUnderHeaderSeeAllProduct>

      <WrapperUnderHeaderSeeAllProduct>
        <WrapperTabs defaultActiveKey="1">
        <TabPane tab="Tất cả" key="all">
          <Table columns={columns} dataSource={filterProductsByStatus("all")} rowKey={"_id"} pagination={{ pageSize: 5 }} />
        </TabPane>
        <TabPane tab="Đang hoạt động" key="active">
          <Table columns={columns} dataSource={filterProductsByStatus("active")} rowKey={"_id"} pagination={{ pageSize: 5 }} />
        </TabPane>
        <TabPane tab="Không hoạt động" key="inactive">
          <Table columns={columns} dataSource={filterProductsByStatus("inactive")} rowKey={"_id"} pagination={{ pageSize: 5 }}/>
        </TabPane>
        <TabPane tab="Bị cấm" key="banned">
          <Table columns={columns} dataSource={filterProductsByStatus("banned")} rowKey={"_id"} pagination={{ pageSize: 5 }}/>
        </TabPane>
      </WrapperTabs>
      </WrapperUnderHeaderSeeAllProduct>

      {/* <Table
        columns={columns}
        dataSource={allData}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      /> */}

      {/* <Modal
        title="Chỉnh sửa sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="editProductForm"
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="product_name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Hình ảnh sản phẩm">
            <div style={{ marginBottom: 8 }}>
              {previewImages.map((img, index) => (
                <img
                  key={index}
                  src={img.startsWith("data:")
                    ? img
                    : `${imageURL}${img}`
                  }
                  alt="preview"
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    marginRight: 8,
                  }}
                />
              ))}
            </div>
          </Form.Item>

          <Form.Item
            name="category"
            label="Danh mục sản phẩm"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả sản phẩm">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá bán"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="color" label="Màu sắc">
            <Input />
          </Form.Item>
          <Form.Item name="size" label="Kích thước">
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Số lượng"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái sản phẩm"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select>
              <Select.Option value="active">Hoạt động</Select.Option>
              <Select.Option value="inactive">Không hoạt động</Select.Option>
              <Select.Option value="banned">Bị cấm</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  );
};

export default SeeAllProduct;