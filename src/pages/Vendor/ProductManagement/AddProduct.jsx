import React, { useState, useCallback, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  InputNumber,
  Select,
  Space,
  message,
  Row,
} from "antd";
import {
  UploadOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { PlusOutlined } from "@ant-design/icons";
import * as AuthServices from "../../../services/shared/AuthServices";
import * as ProductServices from "../../../services/vendor/ProductService";
import { isJsonString } from "../../../utils";
import { jwtDecode } from "jwt-decode";

const { TextArea } = Input;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [labels, setLabels] = useState({});
  const [applyToAll, setApplyToAll] = useState({
  price: null,
  salePrice: null,
  stock: null,
});

  const handleDecoded = () => {
  const token = localStorage.getItem("access_token");

  let decoded = {};
  try {
    if (token) {
      decoded = jwtDecode(token);
    }
  } catch (err) {
    console.error("❌ Lỗi khi decode token:", err.message || err);
  }

  return { decoded, storageData: token };
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
    } catch (error) {
      console.error("Lỗi khi decode user_id:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserId();
  }, [fetchUserId]);

  const beforeUpload = (file) => {
      const isImage = file.type.startsWith("image/");
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        message.error("Chỉ được upload file ảnh!");
        return Upload.LIST_IGNORE;
      }
      if (!isLt2M) {
        message.error("Ảnh phải nhỏ hơn 2MB!");
        return Upload.LIST_IGNORE;
      }
      return true;
    
  }

  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  
  const handleChange = async ({ fileList: newFileList }) => {
  // Thêm preview cho ảnh mới
  const updatedList = await Promise.all(
    newFileList.map(async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      return file;
    })
  );

  setFileList(updatedList);
  form.setFieldsValue({ images: updatedList });
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
      decoded = jwtDecode(accessToken);
    }

    // ✅ Lấy dữ liệu từ form
    const classifications = form.getFieldValue("classifications") || [];
    const priceOptions = form.getFieldValue("priceOptions") || [];

    // ✅ Kiểm tra biến thể
    if (!priceOptions.length) {
      message.error("Phải có ít nhất 1 biến thể sản phẩm");
      return;
    }

    // ✅ Chuyển đổi dữ liệu thành đúng format backend yêu cầu
    const transformedPriceOptions = priceOptions.map((opt) => ({
      attributes: opt.attributes || [],
      price: opt.price,
      salePrice: opt.salePrice,
      stock: opt.stock,
    }));

    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("description", values.description || "");
    formData.append("category", values.category);
    formData.append("status", values.status || "active");
    formData.append("priceOptions", JSON.stringify(transformedPriceOptions));

    // ✅ Thêm ảnh
    fileList.forEach((file) => {
      formData.append("productImages", file.originFileObj);
    });

    // ✅ Gọi API
    const response = await ProductServices.createProduct(accessToken, formData);
    message.success("Thêm sản phẩm thành công!");
    form.resetFields();
    setFileList([]);
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    message.error("Thêm sản phẩm thất bại!");
  }
};

//   const onFinish = async (values) => {
//   try {
//     let { storageData, decoded } = handleDecoded();
//     let accessToken = storageData;

//     // Kiểm tra token hết hạn
//     if (decoded?.exp < Date.now() / 1000) {
//       const res = await AuthServices.refreshToken();
//       accessToken = res?.access_token;
//       localStorage.setItem("access_token", JSON.stringify(accessToken));
//     }

//     const transformedPriceOptions = priceOptions.map((opt) => {
//   const attributes = [];

//     // Duyệt từng classification để lấy tên phân loại
//     classifications.forEach((cls, index) => {
//       const attrName = cls.name || `attr${index+1}`;
//       const attrValue = opt[attrName] || opt[index]; // Tùy theo bạn lưu giá trị ở đâu trong priceOptions

//       attributes.push({
//         name: attrName,
//         value: attrValue,
//       });
//     });

//     return {
//       attributes,
//       price: opt.price,
//       salePrice: opt.salePrice,
//       stock: opt.stock,
//     };
//   });

//     // Kiểm tra
//     if (!transformedPriceOptions.length) {
//       message.error("Phải có ít nhất 1 biến thể sản phẩm");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("productName", values.productName);
//     formData.append("description", values.description || "");
//     formData.append("category", values.category);
//     formData.append("status", values.status || "active");
//     // console.log("shopId:", shopId);
//     formData.append("priceOptions", JSON.stringify(transformedPriceOptions));

//     fileList.forEach((file) => {
//       formData.append("productImages", file.originFileObj); // ảnh thực tế
//     });

//     const response = await ProductServices.createProduct(accessToken, formData);
//     message.success("Thêm sản phẩm thành công!");
//     form.resetFields();
//     setFileList([]);
//   } catch (error) {
//     console.error("Lỗi khi thêm sản phẩm:", error);
//     message.error("Thêm sản phẩm thất bại!");
//   }
// };

const handleChangeLabel = (index, value) => {
    setLabels((prev) => ({
      ...prev,
      [index]: value,
    }));
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
        <h4>Thông tin cơ bản</h4>

        <Form.Item
          label="Tên sản phẩm"
          name="productName"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
        >
          <Input />
        </Form.Item>

        {/* thêm hình ảnh */}
        <Form.Item
          label="Hình ảnh sản phẩm"
          name="images"
          rules={[{ required: true, message: "Vui lòng thêm hình ảnh sản phẩm" }]}
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
        <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={beforeUpload}
            multiple
            onPreview={async (file) => {
              let src = file.url || file.preview;
              if (!src && file.originFileObj) {
                src = await getBase64(file.originFileObj);
              }
              const imgWindow = window.open(src);
              if (imgWindow) {
                const image = new Image();
                image.src = src;
                imgWindow.document.write(image.outerHTML);
              }
            }}
          >
          {fileList.length < 5 && (
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Thêm ảnh</div>
            </div>
          )}
        </Upload>
      </Form.Item>

        <Form.Item
          label="Loại sản phẩm"
          name="category"
          rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm" }]}
        >
          <Select placeholder="Chọn loại sản phẩm">
            <Select.Option value="Thời trang">Thời trang</Select.Option>
            <Select.Option value="Điện tử">Điện tử</Select.Option>
            <Select.Option value="Sách">Sách</Select.Option>
            <Select.Option value="Giày dép">Giày dép</Select.Option>
            <Select.Option value="Đồ chơi">Đồ chơi</Select.Option>
            <Select.Option value="Thể thao">Thể thao</Select.Option>
            <Select.Option value="Sức khỏe">Sức khỏe</Select.Option>
            <Select.Option value="Nhà cửa">Nhà cửa</Select.Option>
            <Select.Option value="Xe máy">Xe máy</Select.Option>
            <Select.Option value="Ô tô">Ô tô</Select.Option>
            <Select.Option value="Điện thoại">Điện thoại</Select.Option>
            <Select.Option value="Laptop">Laptop</Select.Option>
            <Select.Option value="Máy tính bảng">Máy tính bảng</Select.Option>
            <Select.Option value="Thiết bị gia dụng">Thiết bị gia dụng</Select.Option>
            <Select.Option value="Thiết bị y tế">Thiết bị y tế</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <h4>Thông tin bán hàng</h4>
        <Form.List name="classifications">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  style={{
                    border: "1px solid #ccc",
                    padding: 16,
                    marginBottom: 16,
                  }}
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "name"]}
                    label={`Tên phân loại ${index + 1}`}
                    rules={[{ required: true, message: "Nhập tên phân loại" }]}
                  >
                    <Input
                      placeholder="VD: Màu sắc, Kích thước"
                      onChange={(e) => handleChangeLabel(index, e.target.value)}
                    />
                  </Form.Item>

                  <Form.List name={[field.name, "options"]}>
                    {(optionFields, { add: addOption, remove: removeOption }) => (
                      <>
                        {optionFields.map((opt, idx) => (
                          <Space key={opt.key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                            <Form.Item
                              name={opt.name}
                              rules={[{ required: true, message: "Nhập tùy chọn" }]}
                            >
                              <Input placeholder="VD: Đỏ, Xanh, S, M" />
                            </Form.Item>

                            {/* Nút xóa */}
                            <Button
                              type="link"
                              danger
                              onClick={() => removeOption(opt.name)}
                            >
                              Xóa
                            </Button>
                          </Space>
                        ))}

                        <Button type="dashed" onClick={() => addOption()} block icon={<PlusOutlined />}>
                          + Thêm tùy chọn
                        </Button>
                      </>
                    )}
                  </Form.List>

                  <Button
                    type="link"
                    danger
                    onClick={() => {
                      remove(field.name);
                      const updated = { ...labels };
                      delete updated[index];
                      setLabels(updated);
                    }}
                  >
                    Xóa phân loại
                  </Button>
                </div>
              ))}
              {fields.length < 2 && (
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    + Thêm phân loại
                  </Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>

        <h5 style={{ textAlign: 'start' }}>Thông tin chung cho tất cả phân loại</h5>
        <Space style={{ display: 'flex', marginBottom: 16 }} align="start">
          <InputNumber
            placeholder="Giá"
            min={0}
            value={applyToAll.price}
            onChange={(value) => setApplyToAll(prev => ({ ...prev, price: value }))}
          />
          <InputNumber
            placeholder="Giá khuyến mãi"
            min={0}
            value={applyToAll.salePrice}
            onChange={(value) => setApplyToAll(prev => ({ ...prev, salePrice: value }))}
          />
          <InputNumber
            placeholder="Tồn kho"
            min={0}
            value={applyToAll.stock}
            onChange={(value) => setApplyToAll(prev => ({ ...prev, stock: value }))}
          />
          <Button
            onClick={() => {
              const values = form.getFieldValue("classifications") || [];
              const priceOptions = form.getFieldValue("priceOptions") || [];
              const [first, second] = values;
              const options1 = first?.options || [];
              const options2 = second?.options || [];

              const combinations = options1.flatMap((opt1) =>
                (options2.length ? options2 : [null]).map((opt2) => {
                  const attrs = [{ name: first?.name || "", value: opt1 }];
                  if (opt2) attrs.push({ name: second?.name || "", value: opt2 });
                  return { attributes: attrs };
                })
              );

              const newValues = combinations.map(({ attributes }) => ({
                attributes,
                price: applyToAll.price,
                salePrice: applyToAll.salePrice,
                stock: applyToAll.stock,
              }));

              form.setFieldsValue({ priceOptions: newValues });
              message.success("Đã áp dụng cho tất cả phân loại!");
            }}
          >
            Áp dụng cho tất cả
          </Button>
        </Space>

        <Form.Item shouldUpdate>
          {() => {
            const classifications = form.getFieldValue("classifications") || [];
            const [first, second] = classifications;
            const options1 = first?.options || [];
            const options2 = second?.options || [];

            const combinations = options1.flatMap((opt1) =>
              (options2.length ? options2 : [null]).map((opt2) => {
                const attrs = [{ name: first?.name || "", value: opt1 }];
                if (opt2) attrs.push({ name: second?.name || "", value: opt2 });
                return { key: `${opt1}-${opt2 || ""}`, attributes: attrs };
              })
            );

            return combinations.length ? (
              <>
                <h5 style={{ textAlign: "start" }}>Bảng phân loại chi tiết</h5>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        {combinations[0].attributes.map((attr, i) => (
                          <th key={i} style={{ border: '1px solid #ccc', padding: 8 }}>{attr.name}</th>
                        ))}
                        <th style={{ border: '1px solid #ccc', padding: 8 }}>Giá</th>
                        <th style={{ border: '1px solid #ccc', padding: 8 }}>Giá khuyến mãi</th>
                        <th style={{ border: '1px solid #ccc', padding: 8 }}>Tồn kho</th>
                      </tr>
                    </thead>
                    <tbody>
                      {combinations.map(({ key, attributes }, index) => (
                        <tr key={key}>
                          {attributes.map((attr, i) => (
                            <td key={i} style={{ border: '1px solid #ccc', padding: 8 }}>{attr.value}</td>
                          ))}
                          <td style={{ border: '1px solid #ccc', padding: 8 }}>
                            <Form.Item
                              name={["priceOptions", index, "price"]}
                              rules={[{ required: true, message: "Nhập giá" }]}
                            >
                              <InputNumber placeholder="Giá" min={0} />
                            </Form.Item>
                          </td>
                          <td style={{ border: '1px solid #ccc', padding: 8 }}>
                            <Form.Item
                              name={["priceOptions", index, "salePrice"]}
                              rules={[{ type: "number", min: 0 }]}
                            >
                              <InputNumber placeholder="Khuyến mãi" min={0} />
                            </Form.Item>
                          </td>
                          <td style={{ border: '1px solid #ccc', padding: 8 }}>
                            <Form.Item
                              name={["priceOptions", index, "stock"]}
                              rules={[{ required: true, message: "Nhập tồn kho" }]}
                            >
                              <InputNumber placeholder="Tồn kho" min={0} />
                            </Form.Item>
                            <Form.Item name={["priceOptions", index, "attributes"]} hidden initialValue={attributes}>
                              <Input type="hidden" />
                            </Form.Item>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : null;
          }}
        </Form.Item>

        

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm sản phẩm mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;