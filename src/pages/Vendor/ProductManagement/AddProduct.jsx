import { useState } from "react";
import { WrapperVendor } from "../VendorMain/styleVendorMain";
import { Col, Form, Input, Button, Upload, Space, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as AuthServices from "../../../services/shared/AuthServices";
import * as ProductServices from "../../../services/vendor/ProductService";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";

const AddProduct = () => {
  const [form] = Form.useForm();

  const [newProduct, setNewProduct] = useState({
    product_name: "",
    category: "",
    description: "",
    size: "",
    color: "",
    price: "",
    quantity: "",
  });

  const [images, setImages] = useState([]);

  const fieldLabels = {
    product_name: "Tên sản phẩm",
    category: "Danh mục",
    description: "Mô tả",
    size: "Kích cỡ",
    color: "Màu sắc",
    price: "Giá",
    quantity: "Số lượng",
  };

  const handleFileChange = ({ fileList }) => {
    if (fileList.length > 5) {
      message.warning("Chỉ được chọn tối đa 5 ảnh.");
      return;
    }

    const validFiles = fileList.filter((file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error(`File ${file.name} không phải hình ảnh.`);
        return false;
      }

      if (file.size / 1024 / 1024 > 1) {
        message.error(`File ${file.name} vượt quá kích thước 1MB.`);
        return false;
      }

      return true;
    });

    setImages(validFiles);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleDecoded = async () => {
    let storageData = localStorage.getItem("access_token");
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      const decoded = jwtDecode(storageData);
      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        const accessToken = res?.access_token;
        localStorage.setItem("access_token", JSON.stringify(accessToken));
        return accessToken;
      }
      return storageData;
    }
    return null;
  };

  const fetchCreateProduct = async () => {
    const formData = new FormData();
    images.forEach((file) =>
      formData.append("productImages", file.originFileObj)
    );

    Object.keys(newProduct).forEach((key) => {
      formData.append(key, newProduct[key]);
    });

    try {
      const accessToken = await handleDecoded();
      const res = await ProductServices.createProduct(accessToken, formData);

      if (res.status === 200) {
        message.success("Tạo sản phẩm thành công!");
        form.resetFields();
        setNewProduct({
          product_name: "",
          category: "",
          description: "",
          size: "",
          color: "",
          price: "",
          quantity: "",
        });
        setImages([]);
      } else {
        message.error("Tạo sản phẩm thất bại!");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo sản phẩm.");
    }
  };

  return (
    <WrapperVendor>
      <Col span={24} style={{ padding: "24px" }}>
        <h2>Thêm sản phẩm mới</h2>
        <Form form={form} layout="vertical" onFinish={fetchCreateProduct}>
          {Object.keys(newProduct).map((field) => (
            <Form.Item
              label={fieldLabels[field]}
              name={field}
              key={field}
              rules={[{ required: true, message: `Vui lòng nhập ${fieldLabels[field]}!` }]}
            >
              <Input
                name={field}
                onChange={handleInputChange}
                value={newProduct[field]}
              />
            </Form.Item>
          ))}

          <Form.Item
            label="Hình ảnh"
            name="images"
            rules={[
              {
                validator: (_, value) =>
                  value && value.length > 0
                    ? Promise.resolve()
                    : Promise.reject(new Error("Vui lòng chọn ít nhất 1 hình ảnh")),
              },
            ]}
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false} // Không upload ngay
              multiple
              fileList={images}
              onChange={handleFileChange}
            >
              {images.length >= 5 ? null : (
                <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
              )}
            </Upload>
          </Form.Item>

          <Space>
            <Button type="primary" htmlType="submit">
              Lưu sản phẩm
            </Button>
            <Button
              htmlType="button"
              onClick={() => {
                form.resetFields();
                setNewProduct({
                  product_name: "",
                  category: "",
                  description: "",
                  size: "",
                  color: "",
                  price: "",
                  quantity: "",
                });
                setImages([]);
              }}
            >
              Xóa hết
            </Button>
          </Space>
        </Form>
      </Col>
    </WrapperVendor>
  );
};

export default AddProduct;
