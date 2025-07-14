import { Button, Form, Input, InputNumber, message, Modal, Select, Tabs, Tag } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useState } from 'react'
import * as ProductService from "../../../services/vendor/ProductService";
import * as AuthServices from "../../../services/shared/AuthServices";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import { PlusOutlined} from "@ant-design/icons";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const ProductDetailModal = ({ open, onCancel, product, onUpdateSuccess }) => {
    // if (!product) return null;
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);

  useEffect(() => {
  if (product) {
    form.setFieldsValue({
      productName: product.productName,
      category: product.category,
      description: product.description,
      status: product.status,
      priceOptions: product.priceOptions,
    });

    // Gán ảnh hiện tại vào fileList
    const mappedImages = product.images?.map((img, index) => ({
      uid: `${index}`,
      name: img,
      status: "done",
      url: `${imageURL}${img}`,
    })) || [];
    setFileList(mappedImages);
    setRemovedImages([]);
  }
}, [product, form]);

    const renderStatusTag = (status) => {
    let color = "green";
    if (status === "inactive") color = "orange";
    if (status === "banned") color = "red";
    return <Tag color={color}>{status.toUpperCase()}</Tag>;
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

  const handleUpdate = async (values) => {
  try {
    const token = await handleDecoded();
    const res = await ProductService.updateProduct(product._id, values, token);
    message.success("Cập nhật thành công");
    onUpdateSuccess();
    onCancel(); // Đóng modal sau khi cập nhật
  } catch (err) {
    message.error("❌ Cập nhật thất bại");
  }
};

  return (
    <Modal
      title="Chi tiết sản phẩm và sửa sản phẩm"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={700}
    >
        {!product ? (
    <p>Đang tải dữ liệu sản phẩm...</p>
  ) : (
        <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Chi tiết sản phẩm" key="1">
            <div>
                <h3>{product.productName}</h3>
                <p><strong>Danh mục:</strong> {product.category}</p>
                <p><strong>Mô tả:</strong> {product.description || "Không có"}</p>
                <p><strong>Đã bán:</strong> {product.soldCount}</p>
                <p><strong>Trạng thái:</strong> {renderStatusTag(product.status)}</p>
                <p><strong>Điểm đánh giá:</strong> {product.numRating}</p>
                <p><strong>Lượt theo dõi:</strong> {product.followers}</p>

                <div>
                <strong>Hình ảnh:</strong>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    {product.images && product.images.length > 0 ? (
                    product.images.map((img, index) => (
                        <img
                        key={index}
                        src={`${imageURL}${img}`}
                        alt="product"
                        style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
                        />
                    ))
                    ) : (
                    <p>Không có hình ảnh</p>
                    )}
                </div>
                </div>

                <div style={{ marginTop: 16 }}>
                <strong>Biến thể giá:</strong>
                {product.priceOptions.map((option, index) => (
                    <div key={index} style={{ marginBottom: 8, padding: 8, background: "#f5f5f5", borderRadius: 6 }}>
                    <p>Giá: {option.price.toLocaleString()}đ</p>
                    {option.salePrice && <p>Giá khuyến mãi: {option.salePrice.toLocaleString()}đ</p>}
                    <p>Tồn kho: {option.stock}</p>
                    <p>Thuộc tính:</p>
                    <ul>
                        {option.attributes.map((attr, idx) => (
                        <li key={idx}>{attr.name}: {attr.value}</li>
                        ))}
                    </ul>
                    </div>
                ))}
                </div>
            </div>
        </TabPane>

        <TabPane tab="Sửa sản phẩm" key="2">
            <Form
            layout="vertical"
            form={form}
            onFinish={(values) => handleUpdate(values)}
        >
            <Form.Item name="productName" label="Tên sản phẩm" rules={[{ required: true }]}>
            <Input />
            </Form.Item>
            <Form.Item name="category" label="Danh mục" rules={[{ required: true }]}>
            <Input />
            </Form.Item>
            <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
            <Select>
                <Select.Option value="active">Hoạt động</Select.Option>
                <Select.Option value="inactive">Không hoạt động</Select.Option>
                <Select.Option value="banned">Bị cấm</Select.Option>
            </Select>
            </Form.Item>

            <Form.List name="priceOptions">
            {(fields, { add, remove }) => (
                <>
                {fields.map(({ key, name, ...restField }) => (
                    <div
                    key={key}
                    style={{
                        marginBottom: 12,
                        padding: 12,
                        border: "1px solid #ddd",
                        borderRadius: 6,
                    }}
                    >
                    <Form.Item
                        {...restField}
                        name={[name, "price"]}
                        label="Giá"
                        rules={[{ required: true, message: "Nhập giá" }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        {...restField}
                        name={[name, "salePrice"]}
                        label="Giá khuyến mãi"
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        {...restField}
                        name={[name, "stock"]}
                        label="Tồn kho"
                        rules={[{ required: true, message: "Nhập tồn kho" }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.List name={[name, "attributes"]}>
                        {(attrFields, { add: addAttr, remove: removeAttr }) => (
                        <>
                            <div><strong>Thuộc tính:</strong></div>
                            {attrFields.map((attr, index) => (
                            <div key={attr.key} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                                <Form.Item
                                {...attr}
                                name={[attr.name, "name"]}
                                rules={[{ required: true, message: "Tên thuộc tính" }]}
                                >
                                <Input placeholder="Tên" />
                                </Form.Item>
                                <Form.Item
                                {...attr}
                                name={[attr.name, "value"]}
                                rules={[{ required: true, message: "Giá trị" }]}
                                >
                                <Input placeholder="Giá trị" />
                                </Form.Item>
                                <Button danger onClick={() => removeAttr(attr.name)}>Xóa</Button>
                            </div>
                            ))}
                            <Button type="dashed" onClick={() => addAttr()} icon={<PlusOutlined />}>
                            Thêm thuộc tính
                            </Button>
                        </>
                        )}
                    </Form.List>

                    <Button danger onClick={() => remove(name)} style={{ marginTop: 12 }}>
                        Xóa biến thể
                    </Button>
                    </div>
                ))}
                <Form.Item>
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                    Thêm biến thể
                    </Button>
                </Form.Item>
                </>
            )}
            </Form.List>

            <Button type="primary" htmlType="submit">Lưu thay đổi</Button>
        </Form>
        </TabPane>

        <TabPane tab="Sửa hình ảnh" key="3">
            
        </TabPane>
        </Tabs>

  )}
    </Modal>
  )
}

export default ProductDetailModal