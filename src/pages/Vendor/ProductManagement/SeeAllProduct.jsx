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
} from "antd";
import { PlusOutlined, SearchOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import ButtonComponents from "../../../components/VendorComponents/ButtonComponents/ButtonComponents";
import InputComponent from "../../../components/VendorComponents/InputComponent/InputComponent";
import ComboboxComponent from "../../../components/VendorComponents/ComboboxComponent/ComboboxComponent";
import {
  WrapperHeaderSeeAllProduct,
  WrapperUnderHeaderSeeAllProduct,
} from "./StyleSeeAllProduct";
import * as ProductService from "../../../services/vendor/ProductService";
import * as AuthServices from "../../../services/shared/AuthServices";
import { isJsonString } from "../../../utils";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const SeeAllProduct = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [allData, setAllData] = useState([]);

  const handleClickToAddProduct = () => {
    navigate("/vendor/add-product");
  };

  const handleDecoded = () => {
    const storageData = localStorage.getItem("access_token");
    let decoded = {};

    if (storageData && isJsonString(storageData)) {
      const parsed = JSON.parse(storageData);
      decoded = jwtDecode(parsed);
      return { decoded, storageData: parsed };
    }

    return { decoded, storageData };
  };

  const fetchProducts = useCallback(async () => {
    try {
      let { storageData, decoded } = handleDecoded();

      let accessToken = storageData;

      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        accessToken = res?.access_token;
        localStorage.setItem("access_token", JSON.stringify(accessToken));
      }

      const res = await ProductService.getAllProducts(accessToken);

      // Kiểm tra kiểu dữ liệu của res.data trước khi map
      const productsWithKeys = res.data.data.map((product) => ({
        ...product,
        key: product._id,
        product_name: product.product_name,
        description: product.description,
        category: product.category,
        status: product.status,
      }));

      setAllData(productsWithKeys);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const fetchUpdateProduct = async (productData) => {
    try {
      let { storageData, decoded } = handleDecoded();
      let accessToken = storageData;

      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        if (res?.access_token) {
          accessToken = res.access_token;
          localStorage.setItem("access_token", JSON.stringify(accessToken));
        }
      }

      const res = await ProductService.updatedProduct(accessToken, productData);

      if (res?.status === 200) {
        message.success("Sửa sản phẩm thành công!");
        form.resetFields();
        setIsModalOpen(false);
        fetchProducts();
      } else {
        message.error("Sửa sản phẩm thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi sửa sản phẩm:", error);
      message.error("Có lỗi xảy ra khi sửa sản phẩm.");
    }
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    form.setFieldsValue({
      product_name: record.product_name,
      price: record.details?.[0]?.price,
      import_price: record.details?.[0]?.import_price,
      color: record.details?.[0]?.color,
      size: record.details?.[0]?.size,
      quantity: record.details?.[0]?.quantity,
      description: record.description,
      category: record.category,
      status: record.status || "active",
    });
    setPreviewImages(record.images || []);
    setFileList([]);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(() => form.submit())
      .catch((errorInfo) => {
        console.log("Lỗi form:", errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    const updatedData = {
      _id: editingProduct?._id,
      user_id: editingProduct?.user_id,
      product_name: values.product_name,
      description: values.description,
      category: values.category,
      status: values.status || "active",
      images: previewImages.length > 0 ? previewImages : editingProduct.images,
      details: [
        {
          price: values.price,
          import_price: values.import_price || 0,
          color: values.color,
          size: values.size,
          quantity: values.quantity,
        },
      ],
    };

    await fetchUpdateProduct(updatedData);
  };

  const PriceProduct = [
    { label: "Tất cả", value: "all" },
    { label: "0 -> 100.000", value: "0-100000" },
    { label: "100.000 -> 200.000", value: "100000-200000" },
    { label: "200.000 -> 300.000", value: "200000-300000" },
    { label: "300.000 -> 400.000", value: "300000-400000" },
    { label: "400.000 -> 500.000", value: "400000-500000" },
    { label: "500.000 -> 600.000", value: "500000-600000" },
  ];

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <img
          src={`${imageURL}${images?.[0]}` || "https://via.placeholder.com/100"}
          alt="product"
          style={{ width: 60, height: 60, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Giá bán",
      dataIndex: "details",
      key: "price",
      render: (details) => {
        const price = details?.[0]?.price;
        return price ? `${price.toLocaleString()}₫` : "Chưa có giá";
      },
    },
    {
      title: "Số lượng",
      dataIndex: "details",
      key: "quantity",
      render: (details) => details?.[0]?.quantity ?? 0,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "volcano"}>
          {status === "active" ? "Đang bán" : "Ngừng bán"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Tooltip title="Chỉnh sửa">
          <EditOutlined
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => handleEdit(record)}
          />
        </Tooltip>
      ),
    },
  ];

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
        <InputComponent
          name="searchProduct"
          label="Tìm kiếm sản phẩm"
          placeholder="Nhập tên sản phẩm"
          icon={<SearchOutlined />}
        />
        <ComboboxComponent
          name="searchPriceProduct"
          label="Giá sản phẩm"
          placeholder="Chọn giá sản phẩm"
          options={PriceProduct}
        />
      </WrapperUnderHeaderSeeAllProduct>

      <WrapperUnderHeaderSeeAllProduct>
        <h4>Danh sách sản phẩm</h4>
        <div>{allData?.length} sản phẩm</div>
      </WrapperUnderHeaderSeeAllProduct>

      <Table
        columns={columns}
        dataSource={allData}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
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
                  src={`${imageURL}${img}`}
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
            <Upload
              multiple
              beforeUpload={(file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  setPreviewImages((prev) => [...prev, e.target.result]);
                };
                reader.readAsDataURL(file);
                return false;
              }}
              onRemove={(file) => {
                setPreviewImages((prev) =>
                  prev.filter((img) => img !== file.thumbUrl)
                );
              }}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              listType="picture-card"
            >
              {fileList.length + previewImages.length < 5 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Thay đổi</div>
                </div>
              )}
            </Upload>
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
              <Select.Option value="pending">Chờ duyệt</Select.Option>
              <Select.Option value="banned">Bị cấm</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SeeAllProduct;
