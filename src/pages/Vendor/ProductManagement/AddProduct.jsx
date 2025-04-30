import React, { useState, useEffect } from "react";
import { WrapperVendor } from '../VendorMain/styleVendorMain';
import { Card, Col, Form, List, Typography, Input, Button, Upload, Space, message } from 'antd';
import {
  CheckCircleFilled,
  UploadOutlined 
} from '@ant-design/icons';
import ColorTableComponent from '../../../components/VendorComponents/ColorTableComponent/ColorTableComponent';
import * as AuthServices from '../../../services/shared/AuthServices';
import * as ProductServices from '../../../services/vendor/ProductService';
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";

const { Text } = Typography;
const { TextArea } = Input;

const checklist = [
  { text: 'Thêm ít nhất 3 hình ảnh', done: false },
  { text: 'Tên sản phẩm có ít nhất 25~100 kí tự', done: false },
  { text: 'Thêm ít nhất 100 kí tự trong mô tả sản phẩm', done: false },
  { text: 'Thêm thương hiệu', done: false },
];

const AddProduct = () => {
  const [form] = Form.useForm();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productPriceInput, setProductPriceInput] = useState("");
  const [productPriceSale, setProductPriceSale] = useState("");

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  const fetchCreateProduct = async (productData) => {
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

      const res = await ProductServices.createProduct(accessToken, productData);
      if (res?.status === 'success') {
        message.success("Tạo sản phẩm thành công!");
        form.resetFields();
      } else {
        message.error("Tạo sản phẩm thất bại!");
      }

    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      message.error("Có lỗi xảy ra khi tạo sản phẩm.");
    }
  };

  const onFinish = (values) => {
    const productData = {
      productName: values.productName,
      description: values.description,
      size: values.size,
      costPrice: values.costPrice,
      salePrice: values.salePrice,
      colors: values.colors || [],
      images: values.images?.map(file => file.originFileObj?.name) || [],
    };
    console.log('Dữ liệu gửi lên:', productData);
    fetchCreateProduct(productData);
  };

  useEffect(() => {
    // Không gọi fetchCreateProduct ở đây nếu không cần tạo sản phẩm mặc định
  }, []);

  const handleChangeNameProduct = (e) => {
    setProductName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setProductDescription(e.target.value);
  };

  const handleChangeSize = (e) => {
    setProductSize(e.target.value);
  };

  const handleChangePriceInput = (e) => {
    setProductPriceInput(e.target.value);
  };

  const handleChangePriceSale = (e) => {
    setProductPriceSale(e.target.value);
    console.log("Giá bán sản phẩm:", e.target.value);
  };

  return (
    <div>
      <WrapperVendor>
        <Card
          title="Gợi ý điền Thông tin"
          headStyle={{ backgroundColor: '#e6f4ff' }}
          style={{ width: '100%', borderTop: '5px solid blue' }}
        >
          <List
            dataSource={checklist}
            renderItem={(item) => (
              <List.Item>
                <CheckCircleFilled style={{ color: item.done ? '#52c41a' : '#d9d9d9', marginRight: 8 }} />
                <Text type={item.done ? 'default' : 'secondary'}>{item.text}</Text>
              </List.Item>
            )}
          />
        </Card>

        <Col span={24}>
          <div style={{ padding: '24px' }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              style={{ maxWidth: 800, margin: '0 auto' }}
            >
              {/* THÔNG TIN CƠ BẢN */}
              <h2>Thông tin cơ bản</h2>

              <Form.Item
                name="images"
                label="Hình ảnh sản phẩm"
                valuePropName="fileList"
                getValueFromEvent={e => e?.fileList || []}
                rules={[{ required: true, message: 'Vui lòng chọn hình ảnh sản phẩm!' }]}
              >
                <Upload beforeUpload={() => false} multiple listType="picture">
                  <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                name="productName"
                label="Tên sản phẩm"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                  { min: 25, message: 'Tên sản phẩm phải có ít nhất 25 kí tự' },
                ]}
              >
                <Input placeholder="Nhập tên sản phẩm" onChange={handleChangeNameProduct} />
              </Form.Item>

              <Form.Item
                name="description"
                label="Mô tả sản phẩm"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
              >
                <TextArea rows={5} placeholder="Nhập mô tả sản phẩm" onChange={handleChangeDescription} />
              </Form.Item>

              {/* THÔNG TIN CHI TIẾT */}
              <h2>Thông tin chi tiết</h2>

              <Form.Item
                label="Kích thước"
                name="size"
                rules={[{ required: true, message: 'Vui lòng nhập kích thước!' }]}
              >
                <Input placeholder="Nhập kích thước" onChange={handleChangeSize} />
              </Form.Item>

              <Form.Item label="Danh sách màu sắc" name="colors">
                <ColorTableComponent name="colors" />
              </Form.Item>

              {/* GIÁ SẢN PHẨM */}
              <h2>Giá sản phẩm</h2>

              <Form.Item
                name="costPrice"
                label="Giá nhập"
                rules={[{ required: true, message: 'Vui lòng nhập giá nhập!' }]}
              >
                <Input type="number" placeholder="Nhập giá nhập" onChange={handleChangePriceInput} />
              </Form.Item>

              <Form.Item
                name="salePrice"
                label="Giá bán"
                rules={[{ required: true, message: 'Vui lòng nhập giá bán!' }]}
              >
                <Input type="number" placeholder="Nhập giá bán" onChange={handleChangePriceSale} />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" style={{ backgroundColor: "#333", color: "#fff" }}>
                    Lưu sản phẩm
                  </Button>
                  <Button htmlType="button" onClick={() => form.resetFields()}>
                    Xóa hết
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </WrapperVendor>
    </div>
  );
};

export default AddProduct;
