import React, { useState } from "react";
import { WrapperVendor } from '../VendorMain/styleVendorMain';
import { Card, Col, Form, List, Typography, Input, Button, Upload, Space, message } from 'antd';
import {
  CheckCircleFilled,
  UploadOutlined 
} from '@ant-design/icons';
import * as AuthServices from '../../../services/shared/AuthServices';
import * as ProductServices from '../../../services/vendor/ProductService';
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

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
  const user = useSelector((state) => state.user);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      const parsed = JSON.parse(storageData);
      decoded = jwtDecode(parsed);
      return { decoded, storageData: parsed };
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

      console.log('res',res)
      if (res?.status === 200) {
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
      user_id: user?.id, // đúng với model
      product_name: values.productName,
      description: values.description,
      category: values.category,
      images: values.images?.map(file => file.originFileObj?.name) || [],
  
      details: [
        {
          size: values.size,
          color: values.colors?.trim(), // vì model yêu cầu String, không phải mảng
          price: Number(values.costPrice),
          quantity: Number(values.quantity),
        },
      ],
  
      // sale: {
      //   price: Number(values.salePrice),
      //   // Bạn có thể thêm start_date và end_date nếu muốn
      // },
    };
  
    console.log('Dữ liệu gửi lên:', productData);
    fetchCreateProduct(productData);
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
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                rules={[{ required: true, message: 'Vui lòng chọn hình ảnh sản phẩm!' }]}
              >
                <Upload
                  name="productImages"
                  beforeUpload={() => false}
                  multiple
                  listType="picture"
                >
                  <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                name="productName"
                label="Tên sản phẩm"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                  { min: 10, message: 'Tên sản phẩm phải có ít nhất 10 kí tự' },
                ]}
              >
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Mô tả sản phẩm"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
              >
                <TextArea rows={5} placeholder="Nhập mô tả sản phẩm" />
              </Form.Item>

              {/* THÔNG TIN CHI TIẾT */}
              <h2>Thông tin chi tiết</h2>

              <Form.Item
                label="Kích thước"
                name="size"
                rules={[{ required: true, message: 'Vui lòng nhập kích thước!' }]}
              >
                <Input placeholder="Nhập kích thước" />
              </Form.Item>

              <Form.Item
                label="Màu sắc"
                name="colors"
              >
                <Input placeholder="Nhập màu sắc" />
              </Form.Item>

              <Form.Item
                label="Loại sản phẩm"
                name="category"
              >
                <Input placeholder="Nhập loại sản phẩm" />
              </Form.Item>

              <Form.Item
                label="Số lượng"
                name="quantity"
              >
                <Input placeholder="Nhập số lượng" />
              </Form.Item>

              {/* GIÁ SẢN PHẨM */}
              <h2>Giá sản phẩm</h2>

              <Form.Item
                name="costPrice"
                label="Giá nhập"
                rules={[{ required: true, message: 'Vui lòng nhập giá nhập!' }]}
              >
                <Input type="number" placeholder="Nhập giá nhập" />
              </Form.Item>

              <Form.Item
                name="salePrice"
                label="Giá bán"
                rules={[{ required: true, message: 'Vui lòng nhập giá bán!' }]}
              >
                <Input type="number" placeholder="Nhập giá bán" />
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
