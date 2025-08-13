import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Tabs,
  Tag,
  Typography,
  Upload,
} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React, { useEffect, useState } from "react";
import * as ProductService from "../../../services/vendor/ProductService";
import * as AuthServices from "../../../services/shared/AuthServices";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";
import { PlusOutlined } from "@ant-design/icons";

const imageURL = `${process.env.REACT_APP_API_URL}/products-img/`;

const ProductDetailModal = ({
  open,
  onCancel,
  product,
  onUpdateSuccess,
  category,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);

  const [vat, setVat] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const { Paragraph, Text } = Typography;

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        productName: product.productName,
        categoryId: product.categoryId,
        description: product.description,
        status: product.status,
        priceOptions: product.priceOptions,
      });
      getTaxInfo(product.categoryId);

      // Gán ảnh hiện tại vào fileList
      const mappedImages =
        product.images?.map((img, index) => ({
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
      const res = await ProductService.updateProduct(
        product._id,
        values,
        token
      );
      message.success("Cập nhật thành công");
      onUpdateSuccess();
      onCancel(); // Đóng modal sau khi cập nhật
    } catch (err) {
      message.error("❌ Cập nhật thất bại");
    }
  };

  // Hàm tìm tên danh mục từ ID
  const getCategoryName = (id) => {
    const found = category.find((c) => c._id === id);
    return found?.categoryName || "Không rõ";
  };

  const getTaxInfo = (categoryId) => {
    const selectedCategory = category.find((c) => c._id === categoryId);
    if (selectedCategory) {
      setVat(selectedCategory.vat || 0);
      setPlatformFee(selectedCategory.platformFee || 0);
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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {/* Cột trái */}
              <div>
                <h3 style={{ marginBottom: 12 }}>{product.productName}</h3>
                <p>
                  <strong>Danh mục:</strong>{" "}
                  {getCategoryName(product.categoryId)}
                </p>
                <p>
                  <strong>Thuế VAT:</strong> {vat}%
                </p>
                <p>
                  <strong>Phí nền tảng:</strong> {platformFee}%
                </p>
                <p>
                  <strong>Trạng thái:</strong> {renderStatusTag(product.status)}
                </p>
              </div>

              {/* Cột phải */}
              <div>
                <p>
                  <strong>Đã bán:</strong> {product.soldCount}
                </p>
                <p>
                  <strong>Điểm đánh giá:</strong> {product.numRating}
                </p>
                <p>
                  <strong>Lượt theo dõi:</strong> {product.followers}
                </p>
                <Paragraph
                  ellipsis={{ rows: 3, expandable: true, symbol: "Xem thêm" }}
                >
                  <Text strong>Mô tả: </Text>
                  {product.description || (
                    <Text type="secondary">Không có</Text>
                  )}
                </Paragraph>
              </div>
            </div>

            {/* Hình ảnh */}
            <div style={{ marginTop: 16 }}>
              <strong>Hình ảnh:</strong>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginTop: 8,
                }}
              >
                {product.images && product.images.length > 0 ? (
                  product.images.map((img, index) => (
                    <img
                      key={index}
                      src={`${imageURL}${img}`}
                      alt="product"
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 4,
                        border: "1px solid #ddd",
                      }}
                    />
                  ))
                ) : (
                  <p>Không có hình ảnh</p>
                )}
              </div>
            </div>

            {/* Biến thể giá */}
            <div style={{ marginTop: 16 }}>
              <strong>Biến thể giá:</strong>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 12,
                  marginTop: 8,
                }}
              >
                {product.priceOptions.map((option, index) => (
                  <div
                    key={index}
                    style={{
                      background: "#f5f5f5",
                      padding: 8,
                      borderRadius: 6,
                    }}
                  >
                    <p>Giá: {option.price.toLocaleString()}đ</p>
                    {option.salePrice && (
                      <p>Giá KM: {option.salePrice.toLocaleString()}đ</p>
                    )}
                    <p>Tồn kho: {option.stock}</p>
                    <ul style={{ paddingLeft: 16 }}>
                      {option.attributes.map((attr, idx) => (
                        <li key={idx}>
                          {attr.name}: {attr.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </TabPane>

          {/* <TabPane tab="Sửa sản phẩm" key="2">
            <Form
              layout="vertical"
              form={form}
              onFinish={(values) => handleUpdate(values)}
            >
              <Form.Item
                name="productName"
                label="Tên sản phẩm"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="categoryId"
                label="Danh mục"
                rules={[{ required: true }]}
              >
                <Select>
                  {category.map((cat) => (
                    <Select.Option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="description" label="Mô tả">
                <Input.TextArea rows={3} />
              </Form.Item>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="active">Hoạt động</Select.Option>
                  <Select.Option value="inactive">
                    Không hoạt động
                  </Select.Option>
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
                          {(
                            attrFields,
                            { add: addAttr, remove: removeAttr }
                          ) => (
                            <>
                              <div>
                                <strong>Thuộc tính:</strong>
                              </div>
                              {attrFields.map((attr, index) => (
                                <div
                                  key={attr.key}
                                  style={{
                                    display: "flex",
                                    gap: 8,
                                    marginBottom: 8,
                                  }}
                                >
                                  <Form.Item
                                    {...attr}
                                    name={[attr.name, "name"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Tên thuộc tính",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Tên" />
                                  </Form.Item>
                                  <Form.Item
                                    {...attr}
                                    name={[attr.name, "value"]}
                                    rules={[
                                      { required: true, message: "Giá trị" },
                                    ]}
                                  >
                                    <Input placeholder="Giá trị" />
                                  </Form.Item>
                                  <Button
                                    danger
                                    onClick={() => removeAttr(attr.name)}
                                  >
                                    Xóa
                                  </Button>
                                </div>
                              ))}
                              <Button
                                type="dashed"
                                onClick={() => addAttr()}
                                icon={<PlusOutlined />}
                              >
                                Thêm thuộc tính
                              </Button>
                            </>
                          )}
                        </Form.List>

                        <Button
                          danger
                          onClick={() => remove(name)}
                          style={{ marginTop: 12 }}
                        >
                          Xóa biến thể
                        </Button>
                      </div>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Thêm biến thể
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Button type="primary" htmlType="submit">
                Lưu thay đổi
              </Button>
            </Form>
          </TabPane> */}
          <TabPane tab="Sửa thông tin sản phẩm" key="2">
            <Form
              layout="vertical"
              form={form}
              onFinish={(values) => handleUpdate(values)}
            >
              {/* Thông tin cơ bản */}
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="productName"
                    label="Tên sản phẩm"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="categoryId"
                    label="Danh mục"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Chọn danh mục">
                      {category.map((cat) => (
                        <Select.Option key={cat._id} value={cat._id}>
                          {cat.categoryName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="description" label="Mô tả">
                    <Input.TextArea rows={3} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="status"
                    label="Trạng thái"
                    rules={[{ required: true }]}
                  >
                    <Select>
                      <Select.Option value="active">Hoạt động</Select.Option>
                      <Select.Option value="inactive">
                        Không hoạt động
                      </Select.Option>
                      <Select.Option value="banned">Bị cấm</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {/* Biến thể sản phẩm */}
              <Form.List name="priceOptions">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div
                        key={key}
                        style={{
                          marginBottom: 16,
                          padding: 16,
                          border: "1px solid #ddd",
                          borderRadius: 8,
                          background: "#fafafa",
                        }}
                      >
                        <Row gutter={16}>
                          <Col span={8}>
                            <Form.Item
                              {...restField}
                              name={[name, "price"]}
                              label="Giá"
                              rules={[{ required: true, message: "Nhập giá" }]}
                            >
                              <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              {...restField}
                              name={[name, "salePrice"]}
                              label="Giá khuyến mãi"
                            >
                              <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              {...restField}
                              name={[name, "stock"]}
                              label="Tồn kho"
                              rules={[
                                { required: true, message: "Nhập tồn kho" },
                              ]}
                            >
                              <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                          </Col>
                        </Row>

                        {/* Thuộc tính */}
                        <Form.List name={[name, "attributes"]}>
                          {(
                            attrFields,
                            { add: addAttr, remove: removeAttr }
                          ) => (
                            <>
                              <div
                                style={{ fontWeight: "bold", marginBottom: 8 }}
                              >
                                Thuộc tính:
                              </div>
                              {attrFields.map((attr) => (
                                <Row
                                  gutter={8}
                                  key={attr.key}
                                  style={{ marginBottom: 8 }}
                                >
                                  <Col span={10}>
                                    <Form.Item
                                      {...attr}
                                      name={[attr.name, "name"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Tên thuộc tính",
                                        },
                                      ]}
                                    >
                                      <Input placeholder="Tên" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={10}>
                                    <Form.Item
                                      {...attr}
                                      name={[attr.name, "value"]}
                                      rules={[
                                        { required: true, message: "Giá trị" },
                                      ]}
                                    >
                                      <Input placeholder="Giá trị" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={4}>
                                    <Button
                                      danger
                                      block
                                      onClick={() => removeAttr(attr.name)}
                                    >
                                      Xóa
                                    </Button>
                                  </Col>
                                </Row>
                              ))}
                              <Button
                                type="dashed"
                                onClick={() => addAttr()}
                                icon={<PlusOutlined />}
                                style={{ marginBottom: 12 }}
                              >
                                Thêm thuộc tính
                              </Button>
                            </>
                          )}
                        </Form.List>

                        <Button danger onClick={() => remove(name)}>
                          Xóa biến thể
                        </Button>
                      </div>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Thêm biến thể
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Button type="primary" htmlType="submit">
                Lưu thay đổi
              </Button>
            </Form>
          </TabPane>

          <TabPane tab="Sửa hình ảnh" key="3">
            <Upload
              action={null}
              listType="picture-card"
              fileList={fileList}
              onPreview={(file) => {
                // Xem trước ảnh
                window.open(
                  file.url || URL.createObjectURL(file.originFileObj)
                );
              }}
              onChange={({ fileList: newFileList }) => {
                setFileList(newFileList);
              }}
              onRemove={(file) => {
                // Nếu là ảnh cũ, lưu vào danh sách xóa
                if (!file.originFileObj) {
                  setRemovedImages((prev) => [...prev, file.name]);
                }
              }}
              beforeUpload={(file) => {
                // Thêm file vào state, không upload ngay
                setFileList((prev) => [...prev, file]);
                return false;
              }}
            >
              {fileList.length >= 8 ? null : "+ Thêm ảnh"}
            </Upload>

            <Button
              type="primary"
              onClick={async () => {
                try {
                  const token = await handleDecoded();

                  const formData = new FormData();

                  fileList.forEach((file) => {
                    if (file.originFileObj) {
                      formData.append("productImages", file.originFileObj);
                    }
                  });
                  formData.append(
                    "removedImages",
                    JSON.stringify(removedImages)
                  );

                  await ProductService.updateProductImages(
                    product._id,
                    formData,
                    token
                  );
                  message.success("Cập nhật hình ảnh thành công");
                  onUpdateSuccess();
                } catch (err) {
                  message.error("Lỗi cập nhật hình ảnh");
                }
              }}
            >
              Lưu thay đổi
            </Button>
          </TabPane>
        </Tabs>
      )}
    </Modal>
  );
};

export default ProductDetailModal;
