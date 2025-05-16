import React, { useEffect, useState } from "react";
import { Col, Form, Input, Button, message } from "antd";
import { WrapperVendor } from "../VendorMain/styleVendorMain";
import MenuVendorComponent from "../../../components/VendorComponents/MenuVendorComponent/MenuVendorComponent";
import * as AuthServices from "../../../services/shared/AuthServices";
import * as ProductServices from "../../../services/vendor/ProductService";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const [form] = Form.useForm();
  const [productData, setProductData] = useState({
    product_name: "",
    category: "",
    description: "",
    size: "",
    color: "",
    price: "",
    quantity: "",
  });

  const { id } = useParams(); // ID sản phẩm từ URL

  const fieldLabels = {
    product_name: "Tên sản phẩm",
    category: "Danh mục",
    description: "Mô tả",
    size: "Kích cỡ",
    color: "Màu sắc",
    price: "Giá",
    quantity: "Số lượng",
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

  const fetchProductDetail = async () => {
    try {
      const accessToken = await handleDecoded();
      const res = await ProductServices.getProductById(accessToken, id);
      if (res?.data) {
        setProductData(res.data);
        form.setFieldsValue(res.data);
      }
    } catch (error) {
      message.error("Không thể tải thông tin sản phẩm");
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const handleUpdateProduct = async (values) => {
    try {
      const accessToken = await handleDecoded();
      const res = await ProductServices.updateProduct(accessToken, id, values);

      if (res.status === 200) {
        message.success("Cập nhật sản phẩm thành công!");
      } else {
        message.error("Cập nhật thất bại!");
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật sản phẩm.");
    }
  };

  return (
    <WrapperVendor>
      <Col span={5} style={{ border: "1px solid red" }}>
        <MenuVendorComponent />
      </Col>
      <Col span={19} style={{ border: "1px solid blue", padding: 24 }}>
        <h2>Chỉnh sửa sản phẩm</h2>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleUpdateProduct}
          initialValues={productData}
        >
          {Object.keys(productData).map((field) => (
            <Form.Item
              key={field}
              name={field}
              label={fieldLabels[field]}
              rules={[
                { required: true, message: `Vui lòng nhập ${fieldLabels[field]}!` },
              ]}
            >
              <Input />
            </Form.Item>
          ))}

          <Button type="primary" htmlType="submit">
            Cập nhật sản phẩm
          </Button>
        </Form>
      </Col>
    </WrapperVendor>
  );
};

export default EditProduct;
