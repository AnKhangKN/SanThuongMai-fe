import React, { useState, useCallback, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  InputNumber,
  Select,
  Space,
  DatePicker,
  message,
  Row,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import * as AuthServices from "../../../services/shared/AuthServices";
import * as ProductServices from "../../../services/vendor/ProductService";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";

const { TextArea } = Input;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [details, setDetails] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [userId, setUserId] = useState(null); // lưu user_id từ token

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  const fetchUserId = useCallback(async () => {
    try {
      let { storageData, decoded } = handleDecoded();
      let accessToken = storageData;

      if (decoded?.exp < Date.now() / 1000) {
        const res = await AuthServices.refreshToken();
        accessToken = res?.access_token;
        localStorage.setItem("access_token", JSON.stringify(accessToken));
        decoded = jwtDecode(accessToken);
      }

      setUserId(decoded?.id); // Lưu user_id
    } catch (error) {
      console.error("Lỗi khi decode user_id:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserId();
  }, [fetchUserId]);

  const handleAddDetail = () => {
    setDetails([...details, { size: "", color: "", price: 0, quantity: 0 }]);
  };

  const handleDetailChange = (index, field, value) => {
    const updated = [...details];
    updated[index][field] = value;
    setDetails(updated);
  };

  const handleImageUpload = ({ fileList }) => {
    setImageList(fileList.map((file) => file.name)); // hoặc file.url nếu có backend
  };

  const onFinish = async (values) => {
  try {
    let { storageData, decoded } = handleDecoded();
    let accessToken = storageData;

    // Kiểm tra token hết hạn
    if (decoded?.exp < Date.now() / 1000) {
      const res = await AuthServices.refreshToken();
      accessToken = res?.access_token;
      localStorage.setItem("access_token", JSON.stringify(accessToken));
    }

    const payload = {
      product_name: values.product_name,
      description: values.description || "",
      category: values.category,
      images: imageList,
      details: details,
      status: values.status || "active",
      rating: 0,
      user_id: userId, // đã gán trước từ token
      sale: {
        price: values.sale_price || 0,
        start_date: values.sale_start
          ? values.sale_start.toISOString()
          : null,
        end_date: values.sale_end ? values.sale_end.toISOString() : null,
      },
      banned_until: null,
      reports: [],
      sold_count: 0,
    };

    const response = await ProductServices.createProduct(accessToken, payload);
    message.success("Thêm sản phẩm thành công!");
    form.resetFields();
    setDetails([]);
    setImageList([]);
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    message.error("Thêm sản phẩm thất bại!");
  }
};

  return (
    <div>
      <Row>
        <h3>Thêm sản phẩm mới</h3>
      </Row>
      <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      style={{ maxWidth: 800, margin: "0 auto" }}
    >
      <Form.Item
        label="Tên sản phẩm"
        name="product_name"
        rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Mô tả" name="description">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Danh mục"
        name="category"
        rules={[{ required: true, message: "Chọn danh mục" }]}
      >
        <Select placeholder="Chọn danh mục">
          <Select.Option value="Thể thao">Thể thao</Select.Option>
          <Select.Option value="Yoga">Yoga</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Hình ảnh"
        name="images"
        rules={[{ required: true, message: "Vui lòng tải ít nhất 1 ảnh" }]}
      >
        <Upload
          listType="picture"
          multiple
          beforeUpload={() => false}
          onChange={handleImageUpload}
        >
          <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
        </Upload>
      </Form.Item>

      <h4>Biến thể sản phẩm (tùy chọn)</h4>
      {details.map((item, index) => (
        <Space key={index} style={{ marginBottom: 8 }} align="baseline">
          <Input
            placeholder="Màu"
            style={{ width: 100 }}
            onChange={(e) =>
              handleDetailChange(index, "color", e.target.value)
            }
          />
          <Input
            placeholder="Size"
            style={{ width: 100 }}
            onChange={(e) =>
              handleDetailChange(index, "size", e.target.value)
            }
          />
          <InputNumber
            placeholder="Giá"
            min={0}
            onChange={(val) => handleDetailChange(index, "price", val)}
          />
          <InputNumber
            placeholder="Số lượng"
            min={0}
            onChange={(val) => handleDetailChange(index, "quantity", val)}
          />
        </Space>
      ))}
      <Button onClick={handleAddDetail}>+ Thêm biến thể</Button>

      <h4>Khuyến mãi (tùy chọn)</h4>
      <Form.Item label="Giá khuyến mãi" name="sale_price">
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item label="Thời gian khuyến mãi">
        <Space>
          <Form.Item name="sale_start" noStyle>
            <DatePicker placeholder="Ngày bắt đầu" />
          </Form.Item>
          <Form.Item name="sale_end" noStyle>
            <DatePicker placeholder="Ngày kết thúc" />
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm sản phẩm
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default AddProduct;
